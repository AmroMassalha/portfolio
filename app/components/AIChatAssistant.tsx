import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  playSound?: (type: string) => void;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ playSound }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Amro's AI assistant. Ask me about his experience, skills, or even his farming hobby! 🚜",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses = {
    experience: [
      "Amro has 8+ years in DevOps, starting from QA and growing into a Head of DevOps role at Beamr.",
      "He's transformed from finding bugs to preventing them at scale!",
      "His journey: QA Engineer → Automation Engineer → Senior DevOps → Head of DevOps"
    ],
    skills: [
      "His top skills include Kubernetes, AWS, Python, and saving companies tons of money!",
      "He's a master of Terraform, Crossplane, Docker, and all things cloud-native.",
      "Fun fact: He convinced management that Crossplane > Terraform and was proven right!"
    ],
    achievements: [
      "Saved 70% on compute costs with GPU spot instances at Beamr",
      "Got SOC2 certified on the first try - auditors were impressed!",
      "Saved Minute Media ~$10k/week by fixing their CI system"
    ],
    farming: [
      "Yes, he really does farm avocados and olives on weekends! 🥑🫒",
      "He maintains his tractor like production servers - regular patches included!",
      "He says avocado trees have better uptime than most production servers 😄"
    ],
    family: [
      "Married to Noura, a fashion designer and salon manager",
      "Father to Zeina (7) and Lina (5) - future engineers in training!",
      "His work-life balance is 100% - DevOps by day, FarmOps by weekend"
    ],
    contact: [
      "Email: amr.massalha@gmail.com",
      "LinkedIn: linkedin.com/in/amro-massalha",
      "He's open to interesting challenges that break the status quo!"
    ],
    hiring: [
      "Amro is open to Head of DevOps and Cloud Architect roles",
      "He's looking for challenges that make a real impact",
      "Companies that value both technical excellence and work-life balance are his jam"
    ],
    joke: [
      "Why do DevOps engineers make great farmers? Because they're experts at growing scalable systems! 🌱",
      "Amro's deployment philosophy: 'If it works in the avocado field, it'll work in production!'",
      "His tractor runs Kubernetes... just kidding! But he does treat it like a production server."
    ]
  };

  const findBestResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords and return appropriate response
    for (const [key, possibleResponses] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
      }
    }
    
    // Special cases
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to tell you all about Amro. What would you like to know?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know about Amro?";
    }
    
    // Default response with suggestions
    const suggestions = Object.keys(responses).slice(0, 4).join(', ');
    return `That's a great question! Try asking about: ${suggestions}. What interests you most?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    playSound?.('click');
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = findBestResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      playSound?.('success');
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-20 z-40">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            playSound?.('click');
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110 relative"
          title="Chat with AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[500px] bg-black/90 backdrop-blur-md rounded-lg border border-blue-500/30 shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Amro's AI Assistant</h3>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                playSound?.('click');
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-3">
                  <Loader className="w-4 h-4 text-blue-400 animate-spin" />
                  <span className="text-sm text-gray-400">AI is thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Amro's experience..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            
            {/* Quick Actions */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {['Experience', 'Skills', 'Farming', 'Contact'].map(topic => (
                <button
                  key={topic}
                  onClick={() => {
                    setInput(`Tell me about ${topic.toLowerCase()}`);
                    handleSend();
                  }}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-2 py-1 rounded transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;