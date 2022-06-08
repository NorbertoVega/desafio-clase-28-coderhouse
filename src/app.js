import express from 'express';
import moment from 'moment';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import ProductosDaoMariaDB from './daos/ProductosDaoMariaDB.js';
import MensajesDaoMongoDB from './daos/MensajesDaoMongoDB.js';
import router from './router/productos.js';
import routerUsers from './router/usuarios.js';
import routerRandom from './router/randoms.js';
import routerInfo from './router/info.js';

const app = express();
const contenedorMensajes = new MensajesDaoMongoDB(true);
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'))

const renderAllMessages = async () => {
    try {
        const messages = await contenedorMensajes.getAll();
        io.sockets.emit("render-all-messages", messages);
    }
    catch (error) {
        console.log('Error: ', error);
    }
}

io.on("connection", (socket) => {

    socket.on('add-new-product', async data => {
        const contenedorProductos = new ProductosDaoMariaDB();
        const id = await contenedorProductos.save(data);
        if (id !== -1) {
            const newProduct = await contenedorProductos.getById(id);
            io.sockets.emit('render-new-product', JSON.parse(JSON.stringify(newProduct))[0]);
            contenedorProductos.closeConnection();
        }
    });

    socket.on('user-logged-in', data => {
        if (data)
            renderAllMessages();
    })

    socket.on('add-new-message', data => {
        const now = moment();
        data = { ...data, time: now.format("D/MM/YYYY h:mm:ss") }
        contenedorMensajes.save(data)
            .then(() => {
                renderAllMessages();
            })
            .catch((error) => {
                console.log(`Error al cargar mensajes: ${error}`)
            });
    });
});

app.use('/api', router);
app.use('/api', routerUsers);
app.use('/api', routerRandom);
app.use('/api', routerInfo);

export default httpServer;

