import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { makeStyles } from 'tss-react/mui';

import Header from '../components/Header';
import Navigator from '../components/Navigator';
import ProtectedRoute from '../components/accessControl/ProtectedRoute';
import { getRouteCategories } from '../store/selectors';

const drawerWidth = 256;

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(2),
  },
}));

class Dashboard extends React.Component {
  state = { mobileOpen: false };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderSwitchRoutes = (routeCategories) => (
    <Switch>
      {routeCategories.map(({ routes }) =>
        routes.map(
          ({
            path,
            requiresRole,
            permissions,
            requiresAnyPermissions,
            component,
          }) => (
            <ProtectedRoute
              path={path}
              requiresRole={requiresRole}
              permissions={permissions}
              requiresAnyPermissions={requiresAnyPermissions}
              component={component}
            />
          )
        )
      )}
      <Route path="/">
        <Redirect to="/dashboard/profile" />
      </Route>
    </Switch>
  );

  render() {
    const { routeCategories, classes } = this.props;
    const { mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Paper sx={{ display: { lg: 'none', xs: 'block' } }}>
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Paper>
          <Paper sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Paper>
        </nav>
        <div className={classes.app}>
          <Header
            onDrawerToggle={this.handleDrawerToggle}
            routes={routeCategories}
          />
          <main className={classes.main}>
            {this.renderSwitchRoutes(routeCategories)}
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  routeCategories: getRouteCategories(state),
});

const StyledDashboard = (props) => {
  const { classes } = useStyles();
  return <Dashboard {...props} classes={classes} />;
};

export default compose(connect(mapStateToProps, {}))(StyledDashboard);
