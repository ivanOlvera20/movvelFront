import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Productos from "../../pages/productos/productos";

// context
import { useLayoutState } from "../../context/LayoutContext";
import Clientes from "../../pages/clientes/clientes";
import Empleados from "../../pages/empleados/empleados";
import Remision from "../../pages/remision/remision";
import Proveedor from "../../pages/proveedor/proveedor";
import Bodega from "../../pages/bodega/bodega";
import Contrato from "../../pages/contrato/contrato";

function Layout(props) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/productos" component={Productos} />
            <Route path="/app/clientes" component={Clientes} />
            <Route path="/app/empleados" component={Empleados} />
            <Route path="/app/remision" component={Remision} />
            <Route path="/app/proveedor" component={Proveedor} />
            <Route path="/app/bodega" component={Bodega} />
            <Route path="/app/contrato" component={Contrato} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
