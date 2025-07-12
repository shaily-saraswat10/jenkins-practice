import React, { useMemo, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { push } from 'connected-react-router';
import {
  Account,
  Bell,
  Github,
  Logout,
  Menu as MenuIcon,
} from 'mdi-material-ui';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from 'tss-react/mui';

import { signOut } from '../store/actions';
import {
  getCurrentUser,
  getIsSignedIn,
  getSignedInWith,
} from '../store/selectors';

const useStyles = makeStyles()((theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
    color: theme.palette.common.white,
  },
  iconButtonAvatar: {
    padding: 4,
  },
}));

const ShowOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ threshold: 48, disableHysteresis: true });
  return (
    <Slide in={trigger} direction="up">
      <span>{children}</span>
    </Slide>
  );
};

const Header = ({
  onDrawerToggle,
  me,
  authProvider,
  signOut,
  push,
  routes,
  pathname,
}) => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onProfileClick = () => {
    setAnchorEl(null);
    push('/dashboard/profile');
  };

  const brand = useMemo(() => {
    if (!routes) return '';

    let brand = '';
    routes?.forEach(({ routes }) => {
      routes?.forEach(({ name, path }) => {
        if (pathname?.indexOf(path) > -1) {
          brand = name;
        }
      });
    });
    return brand;
  }, [routes, pathname]);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar variant="dense">
          <Paper
            elevation={0}
            sx={{ display: { lg: 'none', xs: 'block' } }}
            style={{ backgroundColor: 'transparent' }}
          >
            <IconButton
              aria-label="open drawer"
              onClick={onDrawerToggle}
              className={classes.menuButton}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Paper>
          <Typography sx={{ flexGrow: 1 }} color="inherit" variant="h6">
            <ShowOnScroll>{brand}</ShowOnScroll>
          </Typography>
          <Tooltip title="Alerts • No alerts">
            <IconButton color="inherit" size="large">
              <Bell />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${me?.firstName || ''} ${me?.lastName || ''}`}>
            <IconButton
              color="inherit"
              className={classes.iconButtonAvatar}
              aria-controls="avatar-menu"
              aria-haspopup="true"
              onClick={onMenuOpen}
              size="large"
            >
              <Avatar
                src={me?.provider?.[authProvider]?.picture}
                alt="My Avatar"
                className={classes.avatar}
              />
            </IconButton>
          </Tooltip>
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
            keepMounted
          >
            <MenuItem onClick={onProfileClick}>
              <ListItemIcon>
                <Account />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar variant="dense">
          <Typography color="inherit" variant="h6" sx={{ flexGrow: 1 }}>
            {brand}
          </Typography>
          <Tooltip title="Demo on Expo">
            <Button
              className={classes.button}
              variant="outlined"
              color="inherit"
              size="small"
              target="_blank"
              href="https://expo.io/@t-ho/mern-stack"
            >
              Mobile
            </Button>
          </Tooltip>
          <Tooltip title="Fork me on Github">
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/t-ho/mern-stack"
              size="large"
            >
              <Github />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: getIsSignedIn(state),
    me: getCurrentUser(state),
    authProvider: getSignedInWith(state),
    pathname: state.router.location.pathname,
  };
};

export default compose(connect(mapStateToProps, { signOut, push }))(Header);
