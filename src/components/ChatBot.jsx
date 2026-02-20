import React, { useEffect, useState, useRef } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hello! 👋 I'm Sok Lim Houn's assistant. Ask me about my skills, projects, or just say hello!", sender: 'bot' }
    ]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e, text = null) => {
        if (e) e.preventDefault();
        const msgText = text || inputValue;
        if (!msgText.trim()) return;

        setMessages(prev => [...prev, { text: msgText, sender: 'user' }]);
        setInputValue('');

        setTimeout(() => {
            let response = "I'm still learning! You can ask about skills, projects, or contact info.";
            const lowerText = msgText.toLowerCase();

            if (lowerText.match(/hello|hi|hey/)) {
                response = "Hello there! 👋 How can I help you explore Sok Lim's portfolio today?";
            } else if (lowerText.match(/skill|tech|stack/)) {
                response = "Sok Lim is skilled in React, Tailwind CSS, Node.js, and Java Spring Boot! 🚀";
            } else if (lowerText.match(/project|work|app/)) {
                response = "He has built a Finance System, Social Media UI, and more. Check the 'Projects' section! 📂";
            } else if (lowerText.match(/contact|hire|email/)) {
                response = "Feel free to reach out via the 'Contact Me' button in the Hero section! 📩";
            } else if (lowerText.includes("blog")) {
                response = "He writes about web development tips in the Blog section. Check it out! 📝";
            }

            setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        }, 1000);
    };

    return (
        /* pointer-events-none on wrapper prevents blocking the background on mobile */
        <div className="fixed bottom-6 right-6 flex flex-col items-end z-[9999] pointer-events-none">

            {/* --- Chat Panel --- */}
            <div className={`bg-gray-950 border border-white/10 w-[85vw] sm:w-80 h-[500px] rounded-3xl shadow-2xl mb-4 transition-all duration-300 flex flex-col overflow-hidden pointer-events-auto
                ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-10'}`}>

                {/* Header */}
                <div className="bg-gradient-to-r from-purple-700 via-pink-700 to-red-600 p-5 text-white font-bold flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Sok Lim Bot</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-2xl hover:text-gray-300">&times;</button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900 scrollbar-none">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${m.sender === 'user'
                                ? 'bg-pink-600 text-white rounded-br-none shadow-lg'
                                : 'bg-gray-800 text-gray-100 rounded-bl-none border border-white/10'
                                }`}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* --- QUICK SUGGESTIONS --- */}
                <div className="p-3 bg-gray-900 border-t border-white/10 flex gap-2 overflow-x-auto scrollbar-none">
                    {['👋 Hello', '🛠 Skills', '📂 Projects', '📝 Blog'].map(btn => (
                        <button
                            key={btn}
                            onClick={() => handleSendMessage(null, btn.split(' ')[1])}
                            className="text-xs bg-white/5 hover:bg-white/10 border border-white/20 text-gray-200 px-4 py-1.5 rounded-full whitespace-nowrap transition-colors"
                        >
                            {btn}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-gray-950 border-t border-white/10 flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me something..."
                        className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button type="submit" className="bg-pink-600 p-2.5 rounded-full text-white hover:opacity-90 transition-opacity">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-45">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* --- Floating Button & Greeting --- */}
            {showMessage && !isOpen && (
                <div className="bg-white text-gray-900 px-4 py-2 rounded-2xl rounded-br-none shadow-xl mb-4 animate-bounce text-xs font-bold border-2 border-pink-500 pointer-events-auto">
                    Hi! 👋 Questions?
                </div>
            )}

            <div className="relative pointer-events-auto">
                {/* 3D GROUND SHADOW */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-12 h-2.5 bg-black/40 rounded-[100%] blur-md animate-[shadowSync_4s_ease-in-out_infinite]"></div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white z-10 active:scale-90 transition-transform animate-[floatBot_4s_ease-in-out_infinite]"
                >
                    {isOpen ? <span className="text-3xl">&times;</span> : <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                </button>
            </div>

            <style>{`
                @keyframes floatBot {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes shadowSync {
                    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; filter: blur(4px); }
                    50% { transform: translateX(-50%) scale(1.4); opacity: 0.2; filter: blur(8px); }
                }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Chatbot;