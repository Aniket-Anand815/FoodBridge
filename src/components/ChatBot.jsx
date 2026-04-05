import { useState, useRef, useEffect } from "react"
import { sendChatMessage } from "../api/api"
import "../styles/chatbot.css"

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 👋 I'm the FoodBridge assistant.\nAsk me anything about donating food, NGO pickups, how the platform works, or anything else!",
      source: "knowledge_base",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const [location, setLocation] = useState(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const getUserLocation = async () => {
    if (location || !navigator.geolocation) return location;
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.state || "your area";
            setLocation(city);
            resolve(city);
          } catch {
            resolve(null);
          }
        },
        () => resolve(null)
      );
    });
  };

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { from: "user", text }])
    setInput("")
    setLoading(true)

    try {
      const userLoc = await getUserLocation();
      const data = await sendChatMessage(text, userLoc);
      
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data.reply, source: data.source },
        ])
      } else {
        throw new Error("Invalid response")
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Oops! Something went wrong. Please try again. 😅",
          source: "knowledge_base",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend()
  }

  const formatText = (text) => {
    if (!text) return ""
    
    // First split by links [text](url)
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return (
          <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{color: "#2563eb", textDecoration: "underline"}}>
            {linkMatch[1]}
          </a>
        );
      }
      
      // Handle bold text in non-link parts
      return part.split(/(\*\*[^*]+\*\*)/).map((p, j) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return <strong key={`${i}-${j}`}>{p.slice(2, -2)}</strong>
        }
        return p
      });
    });
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        className="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        title="Chat with FoodBridge"
        id="chatbot-toggle-btn"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window" id="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-header-text">
                <h4>FoodBridge Assistant</h4>
                <span>Online • Ask me anything</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.from}`}>
                <div>{formatText(msg.text)}</div>
                {msg.from === "bot" && msg.source && (
                  <span
                    className={`chatbot-source-badge ${
                      msg.source === "web_search" ? "web" : "kb"
                    }`}
                  >
                    {msg.source === "web_search" ? "🌐 Web" : "📚 FoodBridge"}
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="chatbot-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              id="chatbot-input"
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              id="chatbot-send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
