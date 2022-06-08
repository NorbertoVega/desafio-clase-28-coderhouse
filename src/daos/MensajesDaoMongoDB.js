import ContenedorMongoDB from '../contenedores/ContenedorMongoDB.js';
import MensajeModel from '../contenedores/mongooseModels/MensajeModel.js';

class MensajesDaoMongoDB extends ContenedorMongoDB {

    constructor(isInitialized) {
        super(MensajeModel, isInitialized);
    }
}

export default MensajesDaoMongoDB;