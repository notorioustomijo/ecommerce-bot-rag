import { useState } from 'react';
import ekaite24 from '/assets/ekaite24.png';
import gmailLink from '/assets/gmailLink.svg';
import whatsappLink from '/assets/whatsappLink.svg';
import ekaiteLogo from '/assets/ekaite-logo.svg';
import chevronDown from '/assets/chevron-down.svg';
import connectLoader from '/assets/connecting.gif';
import Chatbot from './Chatbot';
export default function PageContent() {
    const [showChatbot, setShowChatbot] = useState(false);

    const btnImage = showChatbot ? chevronDown : ekaiteLogo;

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    }

    return (
        <main>
            <header>
                <h1>Ekaite: An eCommerce AI Chatbot</h1>
            </header>
            <section className='project-details'>
                <p>
                    This AI-powered chatbot handles product questions and
                    support queries with precision. Built to fetch details
                    like prices, variants and shipping info, it's designed
                    to save time and keep customers happy — no more endless 
                    support backlog.
                </p>
                <div>
                    <h2>What It Does:</h2>
                    <ul>
                        <li>
                            <strong>Product Info: </strong> 
                            "What's the price of Nike Airforce Ones?" or
                            "What colours of sneakers do you have?"
                        </li>
                        <li>
                            <strong>Support Answers: </strong> 
                            Handle FAQs e.g. "Do you ship to Lagos?", "What's your return policy?"
                        </li>
                        <li>
                            <strong>Smart Retrieval: </strong> 
                            Uses RAG to pull accurate responses from a MongoDB store — fast
                             and reliable.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Try It Out:</h3>
                    <ol>
                        <li>
                            Click the Chat button (floating, bottom-right).
                        </li>
                        <li>
                            Type a question like "What's the price of Nike Airforce Ones?"
                        </li>
                        <li>
                            Check the reply — see if it's spot-on or needs tweaking (let me know 
                            if it's off).
                        </li>
                        <li>
                            Throw in a random one — "What's this about?" — to test its limits.
                        </li>
                    </ol>
                </div>
            </section>
            <footer>
                <h4>Want One? Hit Me Up</h4>
                <div>
                    <a href="mailto:joshua.tomi1@gmail.com">
                        <img src={gmailLink} />
                    </a>
                    <a href="https://wa.me/2348147018718">
                        <img src={whatsappLink} />
                    </a>
                </div>
            </footer>
            <button 
                className="fab"
                onClick={toggleChatbot}>
                    <img src={btnImage}/>
            </button>
            {showChatbot && <Chatbot />}
        </main>
    )
}