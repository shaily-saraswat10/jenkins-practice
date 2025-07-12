import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { requestVerificationEmail, unloadAuthPage } from '../../store/actions';
import RequestTokenForm from '../../components/RequestTokenForm';

const RequestVerificationEmail = ({
  requestVerificationEmail,
  unloadAuthPage,
}) => {
  useEffect(() => {
    return () => {
      unloadAuthPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequestTokenForm
      tokenPurpose="verify-email"
      title="Resend Verification Email"
      onSubmit={requestVerificationEmail}
    />
  );
};

export default connect(null, { requestVerificationEmail, unloadAuthPage })(
  RequestVerificationEmail
);
