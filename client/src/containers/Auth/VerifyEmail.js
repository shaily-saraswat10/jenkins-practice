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

import { unloadAuthPage, verifyEmail } from '../../store/actions';
import { getError, getProcessed } from '../../store/selectors';
import { required } from '../../utils/formValidator';

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

const VerifyEmail = ({
  match,
  verifyEmail,
  unloadAuthPage,
  handleSubmit,
  pristine,
  submitting,
  valid,
  errorMessage,
  error,
  isProcessed,
}) => {
  const { classes } = useStyles();
  useEffect(() => {
    return () => {
      unloadAuthPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (formValues) => {
    return verifyEmail(formValues, match.params.token).then(() => {
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
          Verify Email
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Field
                component={renderTextField}
                disabled={isProcessed && !errorMessage}
                id="password"
                label="Password"
                placeholder="Please enter your password"
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
              <Link href="/request-password-reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={isProcessed && !errorMessage}>
        <Alert
          severity="success"
          action={
            <Link href="/signin" variant="body2">
              Sign In
            </Link>
          }
        >
          Email has been verified successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

const maptStateToProps = (state) => {
  return {
    errorMessage: getError(state),
    isProcessed: getProcessed(state),
  };
};

const validate = (values) => {
  return { password: required(values.password) };
};

export default compose(
  connect(maptStateToProps, { verifyEmail, unloadAuthPage }),
  reduxForm({ form: 'verify-email', validate })
)(VerifyEmail);
