import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleIcon, XIcon, SendIcon } from './Icons';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AiWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Γεια σας! Είμαι ο ψηφιακός βοηθός του AEIR. Πώς μπορώ να σας βοηθήσω με τις υπηρεσίες drone σήμερα;',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up h-[500px]">
          {/* Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
              <h3 className="text-white font-semibold">AEIR Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <XIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white ml-auto rounded-br-none'
                    : 'bg-slate-700 text-slate-200 mr-auto rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-slate-700 text-slate-200 mr-auto rounded-2xl rounded-bl-none p-3 max-w-[85%] flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ρωτήστε για τιμές, υπηρεσίες..."
                className="flex-1 bg-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-slate-700 text-white' : 'bg-cyan-500 text-black'
        }`}
      >
        {isOpen ? <XIcon /> : <MessageCircleIcon />}
      </button>
    </div>
  );
};