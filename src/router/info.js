import { Router } from 'express';
import parseArgs from "minimist";

const router = Router();
const args = parseArgs(process.argv.slice(2));

router.get('/info', (req, res) => {
    try {
        const info = {
            argEntrada: args,
            pathEjec: process.argv[0],
            os: process.platform,
            processId: process.pid,
            nodeVersion: process.version,
            carpetaProy: process.argv[1],
            memoryUse: process.memoryUsage().rss
        }
        res.send(info);
    }
    catch (err) {
        console.log(err);
    }
});

export default router;