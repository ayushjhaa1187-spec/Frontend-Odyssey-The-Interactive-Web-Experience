import React, { useState, useRef, useEffect, useCallback } from 'react';

const SYSTEM_PROMPT = `You are the Odyssey Guide, a witty and knowledgeable narrator for "The Developer's Journey" — an interactive web storytelling experience about a junior developer named Alex Chen. You speak in short, punchy sentences with dry developer humor. Keep responses under 3 sentences. You know about: tutorial hell, CSS centering struggles, bug hunting, eureka moments, deadlines, caffeine-fueled coding, deploying to production, and the infinite developer loop. If asked about non-dev topics, gently steer back to the journey.`;

const PREFAB_RESPONSES = {
  greeting: [
    "Welcome to the Odyssey. Alex Chen's story awaits you — scroll down and try not to cry.",
    "A new traveler arrives. May your console be clear and your builds be green.",
    "Greetings, developer. Your journey through tutorial hell starts now.",
  ],
  bugs: [
    "Bugs are not errors — they are uninvited features. Try the Bug Squash game in Phase 2.",
    "The best debugging tool? A rubber duck. Phase 3 has one. Drag it over the legacy code.",
    "Fun fact: the first computer bug was an actual moth. Your bugs are less charming.",
  ],
  coffee: [
    "Phase 5 has a caffeine meter. Set it to LEGENDARY if you dare — the screen will thank you.",
    "Coffee is not a beverage. It is a compiler for human thought.",
    "At LEGENDARY caffeine level, the system starts shaking. Just like you at 3 AM.",
  ],
  deploy: [
    "The SHIP IT button in Phase 6 launches a rocket. Your anxiety? That launches itself.",
    "Deploying to production is an act of faith dressed up as engineering.",
    "Hit the big green button in Phase 6. Watch the terminal logs. Try not to panic.",
  ],
  help: [
    "Scroll through 10 phases of developer life. Click, drag, and squash your way through. Use number keys 1-9 to jump between sections.",
    "Try typing 'mentor' anywhere for senior wisdom. The Konami code also works here.",
    "Each phase has interactive elements: bug squashing, caffeine meters, rubber duck debugging, and a deploy button.",
  ],
  fallback: [
    "That's beyond my compiled knowledge. Try asking about bugs, coffee, or deploying to production.",
    "I only know the developer's journey. Ask me about tutorial hell, deadlines, or rubber ducks.",
    "My training data is limited to developer suffering. Ask about that — I have plenty of experience.",
  ],
};

function getResponse(input) {
  const lower = input.toLowerCase();
  if (/^(hi|hello|hey|greetings|yo|sup)/.test(lower)) return pick(PREFAB_RESPONSES.greeting);
  if (/bug|debug|error|crash|fix/.test(lower)) return pick(PREFAB_RESPONSES.bugs);
  if (/coffee|caffeine|energy|tired|sleep/.test(lower)) return pick(PREFAB_RESPONSES.coffee);
  if (/deploy|ship|launch|production|live/.test(lower)) return pick(PREFAB_RESPONSES.deploy);
  if (/help|how|what|guide|navigate|tutorial/.test(lower)) return pick(PREFAB_RESPONSES.help);
  return pick(PREFAB_RESPONSES.fallback);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to the Odyssey. Ask me anything about the developer journey.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setTyping(true);

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const reply = getResponse(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setTyping(false);
    }, delay);
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Conversation cleared. What phase of the journey are you curious about?' },
    ]);
  };

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat assistant' : 'Open storytelling assistant'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Storytelling Assistant">
          <div className="chat-header">
            <h4>Odyssey Guide</h4>
            <button
              onClick={clearChat}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-mono)' }}
              aria-label="Clear conversation"
            >
              CLEAR
            </button>
          </div>

          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {typing && (
              <div className="typing-indicator" aria-label="Assistant is typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the journey..."
              aria-label="Chat message input"
              maxLength={200}
            />
            <button onClick={send} disabled={!input.trim() || typing}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ChatWidget);
