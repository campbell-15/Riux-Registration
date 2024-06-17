// src/components/RegisterForm.js
import React, { useState } from 'react';
import GoogleOAuthButton from './GoogleOAuthButton';
import FeedbackMessage from './FeedbackMessage';
import '../styles.css';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement registration logic
    };

    return (
        <div className="register-container">
            <h1>Sign Up</h1>
            <GoogleOAuthButton setFeedback={setFeedback} />
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit">Register</button>
            </form>
            {feedback && <FeedbackMessage message={feedback} />}
        </div>
    );
};

export default RegisterForm;
