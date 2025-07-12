import React from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { getCurrentUser, getSignedInWith } from '../../store/selectors';

const useStyles = makeStyles()(() => ({
  image: {
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
}));

const Profile = ({ me, authProvider }) => {
  const { classes } = useStyles();
  let picture = '/logo-circle512.png';
  if (me?.provider?.[authProvider]?.picture) {
    picture = me.provider[authProvider].picture;
  }

  return (
    <Grid container justifyContent="center">
      <Grid
        size={{
          xs: 12,
          sm: 5,
          md: 3,
        }}
      >
        <Card>
          <CardActionArea>
            <CardMedia
              component={() => (
                <div>
                  <img alt="avatar" src={picture} className={classes.image} />
                </div>
              )}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {`${me.firstName} ${me.lastName}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Joined in {new Date(me.createdAt).getFullYear()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                You are logged in as <b>{me.username}</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    me: getCurrentUser(state),
    authProvider: getSignedInWith(state),
  };
};

export default connect(mapStateToProps)(Profile);
