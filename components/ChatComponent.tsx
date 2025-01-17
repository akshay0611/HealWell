'use client'

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatComponent = () => {
  const [chat, setChat] = useState("");
  const [response, setResponse] = useState("Namaste! How can I assist you today?");
  const [isChatBoxVisible, setChatBoxVisible] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleChat = async () => {
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: chat }),
    });
    const data = await res.json();
    setResponse(data.text || "Thank you for your question!"); // Default message if no response
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
  }, [response]);

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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold mb-1">Wellness Whisper</h2>
              <p className="text-sm opacity-90">I&apos;m here to help you with your health questions!</p>
            </div>
            <div className="p-6">
              <div ref={chatBoxRef} className="bg-gray-50 rounded-xl p-4 mb-4 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-700 leading-relaxed"
                >
                  {response}
                </motion.p>
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

