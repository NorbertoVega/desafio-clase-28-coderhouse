import { Router } from 'express';
import { fork } from 'child_process';

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const route = path.resolve(__dirname, 'child.js');

const router = Router();
const forked = fork(route.replace("router", "utils"));

router.get('/randoms', (req, res) => {
    try {
        let cant = 100000000;
        if (req.query.cant)
            cant = Number(req.query.cant);

        forked.send({cant: cant});
        forked.on('message', data => {
            if (data) {
                console.log(`Se generaron ${cant} números entre 1 y 1000`);
                res.send(data);
                return;
            }
            else {
                res.send("Hubo un problema al calcular los números aleatorios");
                return;
            }
        })
    }
    catch (err) {
        console.log("Error al calcular los números aleatorios:",err);
    }
    finally {
        forked.send('finish');
    }
});

export default router;