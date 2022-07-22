import { PathConstant } from "../constants";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import App from "../pages/App";
import { StringUtil } from "../utils";

const routes = [
  {
    path: PathConstant.LOGIN,
    component: LoginPage,
    key: StringUtil.uuid(),
  },
  {
    path: PathConstant.ROOT,
    component: App,
    isProtected: true,
    key: StringUtil.uuid(),
    routes: [
      {
        exact: true,
        path: PathConstant.ROOT,
        component: HomePage,
        key: StringUtil.uuid(),
      },
    ],
  },
];
export default routes;
