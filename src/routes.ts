import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListFinishedOrdersController } from './controllers/order/ListFinishedOrdersController';
import { FinalizeOrderController } from './controllers/order/FinalizeOrderController';
import { CloseOrderController } from './controllers/order/CloseOrderController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { ListUnfinishedOrdersController } from './controllers/order/ListUnfinishedOrdersController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);
router.get('/category/:id_categoria/products', isAuthenticated, new ListByCategoryController().handle);
router.post('/product', isAuthenticated, upload.single('banner'), new CreateProductController().handle);
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/deleteorder', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.delete('/order/:orderId/item/:itemId', isAuthenticated, new RemoveItemController().handle);
router.get('/orders/finished', isAuthenticated, new ListFinishedOrdersController().handle);
router.get('/orders/unfinished', isAuthenticated, new ListUnfinishedOrdersController().handle);
router.put('/order/:orderId/finalize', isAuthenticated, new FinalizeOrderController().handle);
router.put('/order/:orderId/close', isAuthenticated, new CloseOrderController().handle);

export { router };
