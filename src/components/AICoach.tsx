import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Flame, Brain, HelpCircle, Dumbbell } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "coach";
  content: string;
}

// Simple custom Markdown formatter to handle **bold**, lists, and links without third-party dependencies.
function formatCoachResponse(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  
  return lines.map((line, idx) => {
    // Check if header
    if (line.startsWith("### ")) {
      return <h4 key={idx} className="text-sm font-extrabold text-[#6E1B1D] tracking-wide mt-3 mb-1 uppercase font-mono">{line.replace("### ", "")}</h4>;
    }
    if (line.startsWith("## ")) {
      return <h3 key={idx} className="text-base font-extrabold text-[#6E1B1D] tracking-wider mt-4 mb-2 uppercase">{line.replace("## ", "")}</h3>;
    }
    
    // Check if list item
    let treatedLine = line;
    const isListItem = line.startsWith("- ") || line.startsWith("* ") || /^\d+\.\s/.test(line);
    if (isListItem) {
      treatedLine = line.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, "");
    }

    // Replace bold formatting **text**
    const parts = treatedLine.split(/\*\*([\s\S]*?)\*\*/g);
    const content = parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-extrabold text-[#6E1B1D]">{part}</strong>;
      }
      return part;
    });

    if (isListItem) {
      return (
        <li key={idx} className="ml-4 list-disc text-xs text-[#5C5246] leading-relaxed my-1 pl-1">
          {content}
        </li>
      );
    }

    if (line.trim() === "") {
      return <div key={idx} className="h-2"></div>;
    }

    return (
      <p key={idx} className="text-xs text-[#5C5246] leading-relaxed my-1">
        {content}
      </p>
    );
  });
}

export default function AICoach() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "coach",
      content: "Welcome to **RepByRep Coaching**! ⚡ I am your virtual training assistant.\n\nAsk me anytime about:\n- Form corrections and setup tips\n- Muscle hypertrophy biomechanics\n- Personalized workout plans to match your RepByRep routine.\n\nType in your targets or click a quick command below!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string, mode: "general" | "adjust-workout" = "general") => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map previous messages to prompt payload context
      const historyContext = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        content: m.content
      }));

      const res = await fetch("/api/workout-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          history: historyContext,
          mode: mode
        })
      });

      if (!res.ok) {
        throw new Error("Coach response failed");
      }

      const data = await res.json();
      
      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        role: "coach",
        content: data.text
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err) {
      console.error("AI Coach Fetch Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "coach",
          content: "**Server Sabbatical** ⚡\n\nI couldn't reach the coaching terminal. Please check that your server dev environment is fully started! You can continue logging your reps locally in the meantime."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCommand = (command: string, type: "general" | "adjust-workout") => {
    sendMessage(command, type);
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-2xl flex flex-col h-[520px] overflow-hidden shadow-xs">
      {/* Panel Header */}
      <div className="bg-[#FAF7F2] border-b border-[#EBE5DB] p-4.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 px-2.5 bg-[#6E1B1D]/10 rounded text-[#6E1B1D] font-mono text-[10px] font-bold flex items-center gap-1 uppercase">
            <Flame className="w-3.5 h-3.5 animate-pulse" /> LIVE
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#3A2F28] uppercase tracking-wide leading-none">
              Coach Terminal AI
            </h3>
            <span className="text-[10px] text-[#8C7A68] font-medium font-mono leading-none">
              Powered by RepByRep Physiology Engine
            </span>
          </div>
        </div>
        <Brain className="w-5 h-5 text-[#8A7968]" />
      </div>

      {/* Message History Scroller */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F1E7]/50 scrollbar-thin">
        {messages.map((m) => {
          const isCoach = m.role === "coach";
          return (
            <div
              key={m.id}
              className={`flex ${isCoach ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 border text-xs leading-relaxed transition-all ${
                  isCoach
                    ? "bg-[#FAF8F5] border-[#E8E2D5] text-[#5C5246]"
                    : "bg-[#6E1B1D] text-[#FAF7F2] border-[#591617]"
                }`}
              >
                {/* Custom Markdown formatting */}
                {isCoach ? (
                  <div className="space-y-1.5">{formatCoachResponse(m.content)}</div>
                ) : (
                  <p className="font-medium whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-4.5 py-3 text-xs text-[#8A7968] flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6E1B1D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6E1B1D]"></span>
              </span>
              Coach is mapping muscle biology...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Option Prompts */}
      <div className="p-2.5 bg-[#F3EFE6] border-t border-[#EBE5DB] flex gap-2 overflow-x-auto scrollbar-none items-center flex-wrap">
        <span className="text-[9px] font-mono font-bold text-[#8A7968] uppercase shrink-0">Quick Commands:</span>
        <button
          onClick={() => handleQuickCommand("Design a 3-day strength-focused athletic plan", "adjust-workout")}
          className="text-[9px] font-mono bg-[#FAF8F5] border border-[#DDD4C4] text-[#6E1B1D] font-bold px-2 py-1 rounded hover:bg-[#6E1B1D] hover:text-white transition-all cursor-pointer whitespace-nowrap"
        >
          ⚡ Custom Strength Day
        </button>
        <button
          onClick={() => handleQuickCommand("What is the difference between chest pressing with EZ-Bar vs straight bar barbell?", "general")}
          className="text-[9px] font-mono bg-[#FAF8F5] border border-[#DDD4C4] text-[#6E1B1D] font-bold px-2 py-1 rounded hover:bg-[#6E1B1D] hover:text-white transition-all cursor-pointer whitespace-nowrap"
        >
          ❔ EZ-Bar vs Barbell
        </button>
        <button
          onClick={() => handleQuickCommand("Suggest alternative exercises to Lat Pulldown if machine is occupied", "general")}
          className="text-[9px] font-mono bg-[#FAF8F5] border border-[#DDD4C4] text-[#6E1B1D] font-bold px-2 py-1 rounded hover:bg-[#6E1B1D] hover:text-white transition-all cursor-pointer whitespace-nowrap"
        >
          🔄 Lat Pulldown Alternates
        </button>
      </div>

      {/* Chat Form Footer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(inputValue);
        }}
        className="p-3 bg-[#FAF7F2] border-t border-[#EBE5DB] flex gap-2"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Coach about your current routine target..."
          className="flex-1 bg-[#F5F1E7] border border-[#DDD4C4] rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#6E1B1D] font-medium text-[#3A2F28]"
        />
        <button
          type="submit"
          className="bg-[#6E1B1D] hover:bg-[#9B2527] text-white p-2 px-3.5 rounded-lg transition-all flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
