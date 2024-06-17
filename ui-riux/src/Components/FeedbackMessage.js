// src/components/FeedbackMessage.js
import React from 'react';

const FeedbackMessage = ({ message }) => {
    return (
        <div className="feedback-message">
            {message}
        </div>
    );
};

export default FeedbackMessage;
