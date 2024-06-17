// src/components/GoogleOAuthButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleOAuthButton = ({ setFeedback }) => {
    const onSuccess = (response) => {
        console.log(response);
        // Handle the response and set feedback
    };

    const onError = () => {
        setFeedback('Google sign-in was unsuccessful. Please try again later.');
    };

    return (
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
        />
    );
};

export default GoogleOAuthButton;
