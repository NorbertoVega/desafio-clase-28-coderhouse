import httpServer from './src/app.js';
import config from "./config.js";

const PORT = config.PORT;

httpServer.listen(PORT, () =>
    console.log(`Servidor corriendo en puerto ${PORT}`)
);


