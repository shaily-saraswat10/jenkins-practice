import React, { useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { makeStyles } from 'tss-react/mui';

import { signUp, unloadAuthPage } from '../../store/actions';
import { getError, getProcessing } from '../../store/selectors';
import { email, minLength, required } from '../../utils/formValidator';

const useStyles = makeStyles()((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const SignUp = ({
  signUp,
  errorMessage,
  history,
  unloadAuthPage,
  handleSubmit,
  pristine,
  submitting,
  valid,
  error,
}) => {
  const { classes } = useStyles();
  useEffect(() => {
    return () => {
      unloadAuthPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (formValues) => {
    return signUp(formValues).then(() => {
      if (errorMessage) {
        throw new SubmissionError({ _error: errorMessage });
      }
      history.push('/signin');
    });
  };

  const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      error={touched && !!error}
      helperText={touched && error}
      variant="outlined"
      margin="none"
      autoComplete="off"
      required
      fullWidth
      {...input}
      {...custom}
    />
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          alt="Logo"
          src="/logo-circle512.png"
        />
        <Typography component="h1" variant="h5" color="primary">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Field
                id="username"
                label="Username"
                name="username"
                component={renderTextField}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <Field
                autoComplete="fname"
                id="firstName"
                label="First Name"
                name="firstName"
                component={renderTextField}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <Field
                autoComplete="lname"
                id="lastName"
                label="Last Name"
                name="lastName"
                component={renderTextField}
              />
            </Grid>
            <Grid size={12}>
              <Field
                id="email"
                label="Email Address"
                name="email"
                component={renderTextField}
              />
            </Grid>
            <Grid size={12}>
              <Field
                name="password"
                label="Password"
                type="password"
                id="password"
                component={renderTextField}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            disabled={pristine || submitting || !valid}
            fullWidth
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/signin" variant="body2">
                {'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

const maptStateToProps = (state) => {
  return {
    isProcessing: getProcessing(state),
    errorMessage: getError(state),
  };
};

const validate = (values) => {
  const errors = {};
  errors.username = required(values.username) || minLength(4)(values.username);
  errors.firstName = required(values.firstName);
  errors.lastName = required(values.lastName);
  errors.email = required(values.email) || email(values.email);
  errors.password = required(values.password) || minLength(8)(values.password);
  return errors;
};

export default compose(
  connect(maptStateToProps, { signUp, unloadAuthPage }),
  reduxForm({ form: 'signUp', validate })
)(SignUp);
