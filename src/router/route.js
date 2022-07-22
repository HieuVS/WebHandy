import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { StringUtil } from "../utils";
import { PathConstant } from "../constants";

export function AuthorizedRoute(props) {
  const { routes, switchProps } = props;

  const renderRoute = (route, routerProps) => {
    const isChecked = !route.isProtected || window.isChecked;

    const componentRender = isChecked ? (
      <route.component {...routerProps} route={route} />
    ) : (
      <Redirect
        to={{
          pathname: PathConstant.LOGIN,
          state: {
            from: routerProps.location,
          },
        }}
      />
    );
    return componentRender;
  };

  return (
    <Switch {...switchProps}>
      {routes.map((route, index) => (
        <Route
          key={route.key || index}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => renderRoute(route, props)}
        />
      ))}
    </Switch>
  );
}

const createRootRouters = (routes, switchProps = {}) => {
  return routes && <AuthorizedRoute switchProps={switchProps} routes={routes} />;
};

const createRoute = (route, extraProps) => (
  <Route
    key={route.key || StringUtil.uuid()}
    path={route.path}
    exact={route.exact}
    strict={route.strict}
    render={props => <route.component {...props} {...extraProps} />}
  />
);

const createRoutes = (routes, extraProps = {}) => (
  <Switch>{routes.map(route => createRoute(route, extraProps))}</Switch>
);

export { createRootRouters, createRoute, createRoutes };
