'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatComponent = () => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([
    { text: "Namaste! How can I assist you today?", isBot: true },
  ]);
  const [isChatBoxVisible, setChatBoxVisible] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleChat = async () => {
    if (!chat.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: chat, isBot: false }]);

    // Fetch chatbot response
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: chat }),
    });

    const data = await res.json();

    // Add chatbot response
    setMessages((prev) => [
      ...prev,
      { text: data.text || "Thank you for your question!", isBot: true },
    ]);
    setChat("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatBoxVisible(!isChatBoxVisible)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Toggle chat"
      >
        {isChatBoxVisible ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      <AnimatePresence>
        {isChatBoxVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl mt-4 w-96 overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Stethoscope size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Wellness Whisper</h2>
                <p className="text-sm opacity-90">I&apos;m here to help you with your health questions!</p>
              </div>
            </div>
            <div className="p-6">
              <div ref={chatBoxRef} className="bg-gray-50 rounded-xl p-4 mb-4 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start mb-4 ${
                      msg.isBot ? "" : "flex-row-reverse"
                    }`}
                  >
                    {msg.isBot && (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <Stethoscope size={18} className="text-blue-500" />
                      </div>
                    )}
                    <p
                      className={`text-gray-700 p-3 rounded-xl shadow-sm ${
                        msg.isBot
                          ? "bg-blue-100"
                          : "bg-purple-100"
                      } max-w-xs`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <input
                  type="text"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a health question..."
                  className="flex-grow px-6 py-3 bg-transparent focus:outline-none text-gray-700"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChat}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full m-1 transition-all duration-300 hover:shadow-md"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatComponent;
