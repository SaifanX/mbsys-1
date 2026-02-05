
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, X, Bot, User, Loader2, Sparkles, Terminal } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiAssistant: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Sync established. I am SyncAI, your technical infrastructure consultant. How can I assist with your Bengaluru facility today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are SyncAI, the expert technical consultant for MBSYS. MBSYS provides IT infrastructure, CCTV surveillance, Networking (Wi-Fi/LAN), Firewall/Security, Home Automation, and Office Renovation services specifically in Bengaluru, India. Your tone is professional, technical, efficient, and innovative. Focus on providing high-level technical advice. If asked about pricing, explain that it requires a site audit. Refer users to 'Book a Technical Audit' via the website. Keep responses concise and use technical terminology where appropriate (e.g., structured cabling, IP vision, zero-trust).",
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I've encountered a logic error. Please try reconnecting the terminal.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection interrupted. Terminal link failure. Please check your network and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="relative w-full max-w-lg h-[600px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col pointer-events-auto overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="text-primary w-5 h-5" />
            </div>
            <div>
              <h3 className="font-tech font-bold uppercase tracking-widest text-sm text-slate-900 dark:text-white">SyncAI Assistant</h3>
              <p className="text-[10px] text-green-500 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Terminal Active
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Chat Feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-2 rounded-lg h-fit ${msg.role === 'user' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                  {msg.role === 'user' ? <User size={16} className="text-secondary" /> : <Bot size={16} className="text-primary" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-secondary text-white shadow-lg' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="p-2 rounded-lg h-fit bg-primary/10">
                  <Bot size={16} className="text-primary" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs font-tech font-bold uppercase tracking-widest opacity-50">Analyzing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for technical specs, services, or advice..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-4 pl-5 pr-12 text-sm outline-none focus:ring-2 focus:ring-secondary/50 dark:text-white transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2.5 bg-secondary text-white rounded-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-secondary/20"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="mt-3 text-[9px] text-center text-slate-400 font-tech font-bold uppercase tracking-[0.2em]">
            Powered by Gemini 3 Infrastructure Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
