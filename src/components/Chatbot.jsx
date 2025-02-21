import { useState } from 'react';
import arrowUp from '../assets/arrow-up.svg';
import Message from './Message';

export default function Chatbot() {
    const [message, setMessage] = useState('');
    // const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        //Put API call here
        setMessage('');
    };

    const isInputEmpty = message.trim() === '';

    const buttonStyle = {
        backgroundColor: isInputEmpty ? '#A892C5' : '#52268C',
        cursor: isInputEmpty ? 'not-allowed' : 'pointer'
    };

    return (
        <section className='chatbot'>
            <div className="chatbot-header">
                <h5>Support</h5>
            </div>
            <div className="chatbot-body">
                {/* <div className="message">
                    <p>Welcome! Ask me anything about our products</p>
                </div> */}
                <Message 
                    role='agent'
                    content='Welcome! Ask me anything'
                    timestamp='12:49pm'
                />
                <Message 
                    role='user'
                    content='I need help'
                    timestamp='12:55pm'
                />
            </div>
            <form 
                className="chatbot-form"
                onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Send a message"
                    name="message"
                    id="user-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chatbot-input_field"
                />
                <button 
                    type="submit"
                    className="send-btn"
                    style={buttonStyle}
                    disabled={isInputEmpty}>
                    <img src={arrowUp} />
                </button>
            </form>

        </section>
    )
}