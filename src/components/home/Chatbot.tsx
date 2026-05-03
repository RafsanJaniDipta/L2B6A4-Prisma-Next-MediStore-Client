"use client";

import { useState, useRef, useEffect } from "react";
import { Pill, X, Send, Bot, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm MediBot 💊 Ask me about medicines, categories, ordering, or anything about MediStore!",
};

const SUGGESTED_QUESTIONS = [
  "What pain relievers do you have?",
  "How do I place an order?",
  "What are your medicine categories?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setHasNewMessage(false);
    }
  }, [open]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      const reply: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I couldn't process that.",
      };

      setMessages((prev) => [...prev, reply]);
      if (!open) setHasNewMessage(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([GREETING]);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl transition-all duration-300 sm:w-96",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-primary px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/20">
              <Pill className="size-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-foreground">
                MediBot
              </p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-300 animate-pulse" />
                <p className="text-xs text-primary-foreground/80">
                  Online — AI Assistant
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              onClick={clearChat}
              title="Clear chat"
            >
              <ChevronDown className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              onClick={() => setOpen(false)}
              title="Close"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" style={{ minHeight: 0, maxHeight: "340px" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Bot className="size-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-muted text-foreground"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Bot className="size-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested questions — only shown at start */}
        {messages.length === 1 && (
          <div className="border-t px-4 py-2 flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t bg-background px-3 py-3">
          <div className="flex items-center gap-2 rounded-xl border bg-muted/50 px-3 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about medicines..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              disabled={loading}
            />
            <Button
              size="icon"
              className="size-7 shrink-0 rounded-lg"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              <Send className="size-3.5" />
            </Button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            MediBot can make mistakes. Always consult a pharmacist.
          </p>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
          open
            ? "bg-muted text-foreground border"
            : "bg-primary text-primary-foreground"
        )}
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <>
            <Pill className="size-5" />
            <span className="text-sm font-semibold">Ask MediBot</span>
            {hasNewMessage && (
              <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            )}
          </>
        )}
      </button>
    </>
  );
}
