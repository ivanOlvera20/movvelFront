import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';
import {
  Home as HomeIcon,
  FilterNone as UIElementsIcon,
  ArrowBack as ArrowBackIcon,
  CreateNewFolder,
  AccountCircle,
  PeopleAltOutlined,
  BuildOutlined,
  ViewModule,
  ArrowRight,
} from '@material-ui/icons';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
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
    id: 0,
    label: 'Dashboard',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 1,
    label: 'Catalogos',
    icon: <CreateNewFolder />,
    children: [
      {
        label: 'Clientes',
        icon: <PeopleAltOutlined />,
        children: [
          {
            label: 'Agregar Cliente',
            link: '/app/clientes',
            icon: <PlaylistAddIcon />,
          },
        ],
      },

      {
        id: 2,
        label: 'Vendedores',
        icon: <AccountCircle />,
        children: [
          {
            label: 'Agregar Vendedor',
            link: '/app/vendedores',
            icon: <PlaylistAddIcon />,
          },
        ],
      },

      {
        id: 3,
        label: 'Productos',
        icon: <AccountTreeIcon />,
        children: [
          {
            label: 'Agregar Producto',
            link: '/app/productos',
            icon: <PlaylistAddIcon />,
          },
          { label: 'Modelo', link: '/app/modelos', icon: <ViewModule /> },
          { label: 'Familia', link: '/app/familia', icon: <ViewModule /> },
          { label: 'Linea', link: '/app/linea', icon: <ViewModule /> },
        ],
      },
      {
        id: 4,
        label: 'Materias Prima',
        icon: <BuildOutlined />,
        children: [
          {
            label: 'Agregar MP',
            link: '/app/mat_prima',
            icon: <PlaylistAddIcon />,
          },
          { label: 'Tipo', link: '/app/mat_consumo', icon: <ViewModule /> },
        ],
      },
      {
        id: 5,
        label: 'Otros',
        icon: <UIElementsIcon />,
        children: [
          { label: 'Identificador', link: '/app/iden', icon: <ArrowRight /> },
          { label: 'Bancos', link: '/app/banco', icon: <ArrowRight /> },
          { label: 'Usos de CFDI', link: '/app/cfdi', icon: <ArrowRight /> },
        ],
      },
    ],
  },
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
