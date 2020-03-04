import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard';
import Tables from '../../pages/tables';
import Productos from '../../pages/productos/productos';

// context
import { useLayoutState } from '../../context/LayoutContext';
import Vendedores from '../../pages/vendedores/Vendedores';
import Modelo from '../../pages/modelo/modelo';
import Familia from '../../pages/familia/familia';
import Linea from '../../pages/linea/linea';
import MatPrima from '../../pages/mat_prima/mat_prima';
import MatConsumo from '../../pages/mat_consumo/mat_consumo';
import Unidad_medida from '../../pages/unidad_medida/unidad_medida';
import Clientes from '../../pages/clientes/clientes';
import Banco from '../../pages/banco/banco';
import Cfdi from '../../pages/cfdi/cfdi';


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
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/productos" component={Productos} />
            <Route path="/app/vendedores" component={Vendedores} />
            <Route path="app/clientes" component={null} />
            <Route path="/app/modelos" component={Modelo} />
            <Route path="/app/familia" component={Familia} />
            <Route path="/app/linea" component={Linea} />
            <Route path="/app/mat_prima" component={MatPrima} />
            <Route path="/app/mat_consumo" component={MatConsumo} />
            <Route path="/app/iden" component={Unidad_medida} />
            <Route path="/app/clientes" component={Clientes} />
            <Route path="/app/banco" component={Banco} />
            <Route path="/app/cfdi" component={Cfdi} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
