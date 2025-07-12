import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import RequestTokenForm from '../../components/RequestTokenForm';
import { requestPasswordReset, unloadAuthPage } from '../../store/actions';

const RequestPasswordReset = ({ requestPasswordReset, unloadAuthPage }) => {
  useEffect(() => {
    return () => {
      unloadAuthPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequestTokenForm
      tokenPurpose="reset-password"
      title="Send Password Reset Email"
      onSubmit={requestPasswordReset}
    />
  );
};

export default connect(null, { requestPasswordReset, unloadAuthPage })(
  RequestPasswordReset
);
