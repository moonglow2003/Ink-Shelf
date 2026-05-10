'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hey there! Need a comic or manga recommendation? Ask away!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (response.ok && data.result) {
        setMessages([...newMessages, { role: 'assistant', content: data.result }]);
      } else {
        const errorMsg = data.error || 'Sorry, my ink dried up. Try again later!';
        setMessages([...newMessages, { role: 'assistant', content: `Error: ${errorMsg}` }]);
      }
    } catch (error: any) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${error.message || 'Something went wrong on our end.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-gutter md:bottom-gutter md:right-gutter w-14 h-14 bg-primary text-on-primary rounded-full comic-border halftone-shadow flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 z-50"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          {isOpen ? 'close' : 'auto_awesome'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[130px] md:bottom-[90px] right-gutter md:right-gutter w-[calc(100vw-48px)] md:w-[400px] h-[500px] max-h-[70vh] bg-surface comic-border comic-shadow-lg z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-primary text-on-primary p-md flex items-center justify-between border-b-4 border-black">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <h3 className="font-headline-md text-headline-md font-bold uppercase tracking-wider">InkShelf AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-md flex flex-col gap-sm bg-surface-variant/20">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] p-sm comic-border ${
                  msg.role === 'user' 
                    ? 'bg-surface-variant text-on-surface self-end rounded-tl-xl rounded-tr-xl rounded-bl-xl border-b-[4px] border-r-[4px]' 
                    : 'bg-white text-black self-start rounded-tl-xl rounded-tr-xl rounded-br-xl border-b-[4px] border-r-[4px]'
                }`}
              >
                <p className="font-body-md text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            
            {isLoading && (
              <div className="max-w-[85%] p-sm comic-border bg-white text-black self-start rounded-tl-xl rounded-tr-xl rounded-br-xl border-b-[4px] border-r-[4px]">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-sm bg-surface border-t-2 border-primary flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 input-minimal font-body-md py-xs px-sm border-2 border-primary focus:outline-none"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-primary text-on-primary px-sm py-xs comic-border halftone-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
