import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Auth/LogIn';
import Register from '~/pages/Auth/Register';
import Cart from '~/pages/Cart';
import About from '~/pages/About';
import Shop from '~/pages/Shop';
import Contact from '~/pages/Contact';
import ProductDetail from '~/pages/ProductDetail';
import MyAccount from '~/pages/MyAccount';
import Checkout from '~/pages/Checkout';
import Category from '~/pages/Category';
import Order from '~/pages/Order';

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.login,
    component: Login,
  },
  {
    path: config.routes.register,
    component: Register,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.about,
    component: About,
  },
  {
    path: config.routes.category,
    component: Category,
  },
  {
    path: config.routes.shop,
    component: Shop,
  },
  {
    path: config.routes.myOrder,
    component: Order,
  },
  {
    path: config.routes.contact,
    component: Contact,
  },
  {
    path: config.routes.detailProduct,
    component: ProductDetail,
  },
  {
    path: config.routes.myAccount,
    component: MyAccount,
  },
  {
    path: config.routes.checkout,
    component: Checkout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
