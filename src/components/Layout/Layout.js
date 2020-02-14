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
            <Route patch="app/clientes" component={null} />
            <Route patch="app/modelo" component={null} />
            <Route patch="app/familia" component={null} />
            <Route patch="app/linea" component={null} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
