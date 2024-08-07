import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import About from '~/pages/About';
import Shop from '~/pages/Shop';
import Contact from '~/pages/Contact';

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
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.about,
    component: About,
  },
  {
    path: config.routes.shop,
    component: Shop,
  },
  {
    path: config.routes.contact,
    component: Contact,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
