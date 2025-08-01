import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, Send, Paperclip, Mic, User, Bot, MessageCircle } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  // We'll no longer use a static API_KEY.
  // Instead, the JWT is retrieved from localStorage, where it
  // should be stored after a user successfully logs in.

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your personal AI Insurance Guide. I'm here to help you understand insurance and find the best plans for you. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const sidebarRef = useRef(null);

  const languages = ['English', 'Pidgin', 'Yoruba', 'Hausa', 'Igbo'];

  const quickQuestions = [
    "What is insurance?",
    "How does health insurance work?",
    "What's the best car insurance for me?",
    "How much should I pay for insurance?",
    "What does life insurance cover?",
    "Show me personalized insurance recommendations",
    "Explain insurance terms in simple language",
    "What insurance do I need based on my age and budget?"
  ];

  const predefinedResponses = {
    "What is insurance?": "Insurance is a contract between you and an insurance company where you pay regular premiums in exchange for financial protection against unexpected events like accidents, illness, or damage to your property. It's essentially a way to transfer risk from yourself to the insurance company.",

    "How does health insurance work?": "Health insurance helps cover medical costs. You pay a monthly premium, and in return, the insurance company helps pay for doctor visits, hospital stays, medications, and other healthcare services. You may have a deductible (amount you pay before insurance kicks in) and copays for certain services.",

    "What's the best car insurance for me?": "The best car insurance depends on your needs, budget, and driving habits. Consider factors like your car's value, your driving record, coverage needs (liability, comprehensive, collision), and budget. I'd recommend getting quotes from multiple providers and comparing coverage options.",

    "How much should I pay for insurance?": "Insurance costs vary based on coverage type, your risk profile, and coverage amount. A general rule is that insurance shouldn't exceed 10-15% of your income. For specific types: auto insurance typically costs ₦50,000-₦200,000 annually, while health insurance varies widely based on coverage and provider.",

    "What does life insurance cover?": "Life insurance provides financial protection for your beneficiaries when you pass away. It can cover funeral expenses, outstanding debts, mortgage payments, income replacement for your family, and children's education costs. There are two main types: term life (temporary coverage) and whole life (permanent coverage with savings component).",

    "Show me personalized insurance recommendations": "To provide personalized recommendations, I'd need to know more about you: your age, family situation, income, assets, health status, and current insurance coverage. Based on this information, I can suggest the right mix of health, auto, life, and property insurance that fits your needs and budget.",

    "Explain insurance terms in simple language": "Here are key insurance terms explained simply:\n• Premium: Monthly payment to keep your insurance active\n• Deductible: Amount you pay before insurance helps\n• Coverage limit: Maximum amount insurance will pay\n• Claim: Request for payment when something happens\n• Beneficiary: Person who gets money from your policy\n• Policy: Your insurance contract",

    "What insurance do I need based on my age and budget?": "Insurance needs change with age and circumstances:\n• Young adults (20s-30s): Health insurance, auto insurance, basic life insurance\n• Middle-aged (30s-50s): Increase life insurance, add disability insurance, consider property insurance\n• Seniors (50s+): Focus on health insurance, long-term care insurance, maintain life insurance\nStart with essential coverage and expand as your income and responsibilities grow."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputMessage]);

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const scrollTop = sidebarRef.current.scrollTop;
        setIsHeaderVisible(scrollTop < 50);
      }
    };

    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener('scroll', handleScroll);
      return () => sidebarElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;
    
    // Get the JWT from localStorage. This assumes your login page
    // saves the token with the key 'userToken'.
    const token = localStorage.getItem('userToken');

    // Check if the user is authenticated with a JWT
    if (!token) {
      const errorResponse = {
        id: messages.length + 1,
        type: 'bot',
        content: "I can't send your message. You need to be logged in to use this service. Please log in and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorResponse]);
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const isMockQuestion = predefinedResponses[messageText];
    if (isMockQuestion) {
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: predefinedResponses[messageText],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, Math.random() * 500 + 1000);
      return;
    }

    try {
      const response = await axios.post('https://insurelink.onrender.com/chat/app', {
        message: messageText
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Use the dynamic JWT for authorization
          'Authorization': `Bearer ${token}`
        }
      });
      setIsTyping(false);

      const botResponseContent = response.data;

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      setIsTyping(false);

      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I'm sorry, I couldn't process your request. Please ensure you are logged in and try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        content: `📎 Uploaded file: ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: "I've received your document. Once our backend integration is complete, I'll be able to analyze and provide insights about your uploaded file.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 2000);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const userMessage = {
          id: messages.length + 1,
          type: 'user',
          content: "🎤 Voice message recorded",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
          const botResponse = {
            id: messages.length + 2,
            type: 'bot',
            content: "I've received your voice message. Voice recognition will be available once our backend integration is complete.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botResponse]);
        }, 2000);
      }, 2000);
    }
  };

  const TypingIndicator = () => (
    <div className="flex justify-start mb-6">
      <div className="flex items-start gap-3.5 max-w-md lg:max-w-2xl">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ring-1 ring-[#FF7043]/20 bg-[#FF7043]">
          <Bot className="w-5 h-5" />
        </div>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm ring-1 ring-[#E2E8F0]">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 bg-[#FF7043]/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#FF7043]/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 bg-[#FF7043]/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-['Poppins','Inter','SF Pro Display','system-ui',sans-serif] selection:bg-[#FF7043]/20 selection:text-[#FF7043]">
      <div className="bg-white shadow-sm border-b border-[#E2E8F0] p-5 sticky top-0 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2.5 hover:bg-[#E2E8F0]/50 rounded-xl transition-all duration-100 group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-[#FF7043] transition-colors duration-100" />
            </button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-[#FF7043] rounded-full flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 tracking-tight">AI Insurance Guide</h1>
                <p className="text-sm text-gray-500 font-medium">Always ready to help • Online</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#E2E8F0]/40 rounded-xl px-5 py-2.5 border border-[#E2E8F0] cursor-pointer">
            <Globe className="w-4 h-4 text-[#FF7043]" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)] max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50/30 to-white/50">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-start gap-3.5 max-w-md lg:max-w-2xl">
                  {message.type === 'bot' && (
                    <div className="w-10 h-10 bg-[#FF7043] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}
                  <div className={`rounded-2xl px-5 py-4 shadow-sm max-w-full transition-all duration-100 ${
                    message.type === 'user'
                      ? 'bg-[#E2E8F0]/60 text-gray-900 ml-auto border border-[#E2E8F0]'
                      : 'bg-white text-gray-900 border border-[#E2E8F0]/50'
                    }`}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-line font-medium">{message.content}</p>
                    <p className={`text-xs mt-2.5 font-medium ${message.type === 'user' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-gray-600 flex-shrink-0 shadow-sm">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
            {messages.length === 1 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <MessageCircle size={64} className="text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Start a conversation with InsureBot!</h2>
                <p className="text-gray-500 max-w-sm">Ask any question or pick from the quick questions on the right to get started.</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-[#E2E8F0]">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-3 bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0]
                    focus-within:ring-2 focus-within:ring-[#FF7043]/30 focus-within:border-[#FF7043] transition-all duration-200">
                <button
                  onClick={handleFileUpload}
                  className="p-2.5 text-gray-500 hover:text-white hover:bg-[#FF7043] rounded-xl transition-all duration-100 flex-shrink-0 group cursor-pointer border border-transparent hover:border-[#FF7043]"
                  title="Upload file"
                >
                  <Paperclip className="w-5 h-5 group-hover:rotate-12 transition-transform duration-100" />
                </button>

                <div className="flex-1 min-w-0">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about insurance..."
                    className="w-full resize-none border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 text-[15px] leading-relaxed max-h-32 min-h-[24px] font-medium"
                    rows={1}
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>

                <button
                  onClick={toggleRecording}
                  className={`p-2.5 transition-all duration-100 flex-shrink-0 rounded-xl cursor-pointer border ${
                    isRecording
                      ? 'animate-pulse bg-red-100 text-red-500 border-red-200'
                      : 'hover:bg-[#FF7043] text-gray-500 hover:text-white border-transparent hover:border-[#FF7043]'
                    }`}
                  title="Voice message"
                >
                  <Mic className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="p-2.5 text-white bg-[#FF7043] rounded-xl hover:bg-[#FF7043]/90 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={sidebarRef} className="w-80 bg-gray-50/50 border-l border-[#E2E8F0] overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <div className={`bg-white rounded-2xl p-5 mb-6 shadow-sm border border-[#E2E8F0]/50 transition-all duration-300 ease-out ${
              isHeaderVisible
                ? 'opacity-100 transform translate-y-0 sticky top-0 z-10'
                : 'opacity-0 transform -translate-y-4 absolute -top-20 pointer-events-none'
              }`}>
              <h3 className="text-gray-900 font-semibold mb-2 text-lg flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-[#FF7043]" />
                Quick Questions
              </h3>
              <p className="text-[15px] text-gray-600 font-medium leading-relaxed">Click any question to get started</p>
            </div>

            <div className={`space-y-3 pb-6 ${!isHeaderVisible ? 'mt-0' : ''}`}>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-4 text-[15px] text-gray-800 bg-white hover:bg-white rounded-2xl transition-all duration-200 border border-[#E2E8F0]/60
                  hover:border-[#FF7043] hover:border-2 hover:shadow-lg hover:-translate-y-0.5 transform-gpu cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF7043]/60 rounded-full mt-2.5 group-hover:bg-[#FF7043] group-hover:scale-125 transition-all duration-200 flex-shrink-0"></div>
                    <span className="group-hover:text-gray-900 transition-colors duration-200 leading-relaxed font-medium">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
      />
    </div>
  );
};

export default Chatbot;