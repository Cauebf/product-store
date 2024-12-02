import { Router } from 'express';
const router = Router();

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
