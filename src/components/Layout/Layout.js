import React from 'react';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
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
import Vendedores from '../../pages/vendedores/vendedores';

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
            <Route patch="app/vendedor" component={Vendedores} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
