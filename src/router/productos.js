import { Router } from 'express';
import ProductosDaoMariaDB from '../daos/ProductosDaoMariaDB.js';
import generateProduct from '../utils/product.utils.js';

const router = Router();

router.get('/tableProd', async (req, res) => {
    try {
        const contenedorProductos = new ProductosDaoMariaDB();
        const allProducts = await contenedorProductos.getAll();
        contenedorProductos.closeConnection();
        res.render('table', { productList: allProducts, emptyList: allProducts.length === 0, faker: false });
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/productos-test', (req, res) => {
    try {
        const fakerProducts = generateProduct();
        res.render('table', { productList: fakerProducts, emptyList: fakerProducts.length === 0, faker: true});
    }
    catch (err) {
        console.log(err);
    }
});

export default router;