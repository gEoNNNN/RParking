'use client';
import { useState, useRef, useEffect } from 'react';
import { LuSend, LuX, LuMessageCircle } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Chatbot() {
  const t = useTranslations('Chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean; time: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setMessages([
        {
          text: t('welcomeMessage'),
          isBot: true,
          time: time,
        },
      ]);
    }
  }, [isOpen, messages.length, t]);

  const handleSend = () => {
    if (!message.trim()) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setMessages([...messages, { text: message, isBot: false, time }]);
    setMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: t('autoResponse'),
          isBot: true,
          time: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`,
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center group animate-float"
          aria-label={t('openChat')}
        >
          <div className="relative">
            <LuMessageCircle className="w-7 h-7 sm:w-9 sm:h-9 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full" />
          </div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-2 sm:bottom-32 right-2 sm:right-8 z-50 w-[calc(100vw-16px)] sm:w-[90vw] max-w-[380px] h-[calc(100vh-80px)] sm:h-[600px] sm:max-h-[calc(100vh-140px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex items-center gap-3 relative">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl backdrop-blur-sm">
              R
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{t('title')}</h3>
              <p className="text-sm text-white/90">{t('subtitle')}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label={t('close')}
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
                {msg.isBot && (
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2 shrink-0">
                    R
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.isBot ? 'bg-white' : 'bg-green-600 text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-400' : 'text-white/70'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-100 space-y-2 sm:space-y-3 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('placeholder')}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-11 h-11 sm:w-12 sm:h-12 bg-green-600 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shrink-0"
                aria-label={t('send')}
              >
                <LuSend className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              <a
                href="https://wa.me/37369116121"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm text-xs sm:text-sm"
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                {t('whatsapp')}
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
