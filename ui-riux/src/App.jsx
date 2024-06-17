// src/App.js
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RegisterForm from './Components/RegisterForm';
import './styles.css';

function App() {
    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div className="App">
                <RegisterForm />
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
