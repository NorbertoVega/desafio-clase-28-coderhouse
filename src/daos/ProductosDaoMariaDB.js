import ContenedorProductos from '../contenedores/ContenedorProductos.js';
import options from '../contenedores/options/mariaDB.js';

class ProductosDaoMariaDB extends ContenedorProductos {

    constructor() {
        super(options);
    }
}

export default ProductosDaoMariaDB;