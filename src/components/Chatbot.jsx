import { useState, useRef, useEffect } from 'react';
import arrowUp from '/assets/arrow-up.svg';
import Message from './Message';
import messageLoader from '/assets/messageLoader.gif';
import ekaite from '/assets/ekaite-logo.svg';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null); // Ref for auto-scroll
    
    //Load initial agent message with delay
    useEffect(() => {
        const timer = setTimeout(() => {
            const initialMsg = {
                    role: 'agent',
                    content: "Hi, I'm Ekaite, a customer service agent. How can I help you today?",
                    timestamp: new Date()
                };
                setMessages([initialMsg]);
        }, 500);

        return () => clearTimeout(timer); //Cleanup on unmount
    }, []); //Empty deps-runs once on mount

    // Send message to backend and update chat
    const sendMessage = async () => {
        if (!message.trim()) return; // Skip empty

        // Add user message to chat and clear input immediately
        const userMsg = { role: 'user', content: message, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setMessage('');
        setIsLoading(true);

        try {
            const res = await fetch('https://ekaite-backend.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            }); // Closed fetch call here

            const { reply } = await res.json();

            if (!reply) throw new Error('No reply from agent');

            // Add agent reply to chat
            const agentMsg = { role: 'agent', content: reply, timestamp: new Date() };
            setMessages(prev => [...prev, agentMsg]);
        } catch (err) {
            console.error('Error sending message:', err);
            const errorMsg = { role: 'agent', content: 'Oops, something broke—try again!', timestamp: new Date() };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(); // Fire API call here
    };

    const isInputEmpty = message.trim() === '';
    const buttonStyle = {
        backgroundColor: isInputEmpty ? '#A892C5' : '#52268C',
        cursor: isInputEmpty ? 'not-allowed' : 'pointer'
    };

    // Auto-scroll to latest message
    useEffect(() => {
        if (chatBodyRef.current) {
            const latestMessage = chatBodyRef.current.lastElementChild;
            if (latestMessage) latestMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <section className='chatbot'>
            <div className="chatbot-header">
                <h5>Support</h5>
            </div>
            <div className="chatbot-body" ref={chatBodyRef}>
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        role={msg.role}
                        content={msg.content}
                        timestamp={msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    />
                ))}
                {isLoading && (
                    <div className='agent-message-container'>
                                <div className='agent-message-loading-details'>
                                    <img src={ekaite} className='agent-avatar' alt="Ekaite"/>
                                    <img src={messageLoader} className='message-loader'/>
                                </div>
                            </div>
                )}
            </div>
            <form className="chatbot-form" onSubmit={handleSubmit}>
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
                    disabled={isInputEmpty}
                >
                    <img src={arrowUp} alt="Send" /> {/* Added alt */}
                </button>
            </form>
        </section>
    );
}