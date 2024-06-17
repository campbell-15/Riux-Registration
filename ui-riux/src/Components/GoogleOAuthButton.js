// src/components/GoogleOAuthButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleOAuthButton = ({ setFeedback }) => {
    const responseGoogle = (response) => {
        console.log(response);
        // TODO: Implement Google OAuth logic
    };

    return (
        <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleOAuthButton;
