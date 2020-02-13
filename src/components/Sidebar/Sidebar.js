import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';
import {
  Home as HomeIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
  AssignmentInd,
  CreateNewFolder,
} from '@material-ui/icons';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/LayoutContext';

const structure = [
  {
    id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon />,
  },
  {
    id: 1,
    label: 'Catalogos',
    link: '/app/ui/icons',
    icon: <CreateNewFolder />,
    children: [
      { label: 'Productos', link: '/app/productos', icon: <AccountTreeIcon /> },
      { label: 'Clientes', link: '/app/clientes', icon: <AssignmentInd /> },
      { label: 'Vendedores', link: '/app/vendedores', icon: <AssignmentInd /> },
      {
        label: 'Otros',
        link: '/app/ui',
        icon: <UIElementsIcon />,
        children: [
          { label: 'Modelo', link: '/app/modelo' },
          { label: 'Familia', link: '/app/familia' },
          { label: 'Linea', link: '/app/linea' },
        ],
      },
    ],
  },
  {
    id: 3, label: 'Tables', link: '/app/tables', icon: <TableIcon />,
  },

  { id: 4, type: 'divider' },
];

function Sidebar({ location }) {
  const classes = useStyles();
  const theme = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
