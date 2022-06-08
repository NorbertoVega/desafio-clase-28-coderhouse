import ContenedorMongoDB from '../contenedores/ContenedorMongoDB.js';
import UsuarioModel from '../contenedores/mongooseModels/UsuarioModel.js';

class UsariosDaoMongoDB extends ContenedorMongoDB {

    constructor(isInitialized) {
        super(UsuarioModel, isInitialized);
    }
}

export default UsariosDaoMongoDB;