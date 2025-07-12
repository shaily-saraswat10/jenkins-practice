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

import { resetPassword, unloadAuthPage } from '../../store/actions';
import { getError, getProcessed } from '../../store/selectors';
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

const ResetPassword = ({
  match,
  resetPassword,
  errorMessage,
  isProcessed,
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
    const resetToken = match.params.token;
    return resetPassword(formValues, resetToken).then(() => {
      if (errorMessage) {
        throw new SubmissionError({ _error: errorMessage });
      }
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
          Reset Your Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Field
                component={renderTextField}
                disabled={isProcessed && !errorMessage}
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid size={12}>
              <Field
                component={renderTextField}
                disabled={isProcessed && !errorMessage}
                id="password"
                label="New Password"
                name="password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            disabled={
              pristine || submitting || !valid || (isProcessed && !errorMessage)
            }
            fullWidth
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <Grid container>
            <Grid size="grow">
              <Link href="/signin" variant="body2">
                Sign In
              </Link>
            </Grid>
            <Grid>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={isProcessed && !errorMessage}>
        <Alert severity="success">
          Your password has been reset successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

const maptStateToProps = (state) => {
  return {
    isProcessed: getProcessed(state),
    errorMessage: getError(state),
  };
};

const validate = (values) => {
  const errors = {};
  errors.email = required(values.email) || email(values.email);
  errors.password = required(values.password) || minLength(8)(values.password);
  return errors;
};

export default compose(
  connect(maptStateToProps, { resetPassword, unloadAuthPage }),
  reduxForm({ form: 'reset-password', validate })
)(ResetPassword);
