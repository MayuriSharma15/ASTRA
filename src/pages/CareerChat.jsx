/**
 * CareerChat (UPGRADED — multi-conversation history + Markdown rendering)
 * -----------------------------------------------------------------------
 * On mount: loads the list of past conversations. If none exist, creates
 * one automatically. Otherwise opens the most recently updated one —
 * matches the "pick up where you left off" behavior of ChatGPT/Claude.
 * ----------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ChatSidebar } from "../components/dashboard/ChatSidebar";
import { MarkdownMessage } from "../components/dashboard/MarkdownMessage";
import { useAuth } from "../hooks/useAuth";
import {
  listConversations,
  createConversation,
  getConversationById,
  sendMessageToConversation,
  deleteConversation,
} from "../services/chatService";
import { cn } from "../utils/cn";

export function CareerChat() {
  const { token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  // Initial load: fetch conversation list, open the most recent (or create one)
  useEffect(() => {
    if (!token) return;

    listConversations(token)
      .then(async (data) => {
        setConversations(data.conversations);

        if (data.conversations.length > 0) {
          const mostRecent = data.conversations[0];
          setActiveId(mostRecent._id);
          const convData = await getConversationById(token, mostRecent._id);
          setMessages(convData.conversation.messages);
        } else {
          const created = await createConversation(token);
          setConversations([created.conversation]);
          setActiveId(created.conversation._id);
          setMessages([]);
        }
      })
      .catch(() => setError("Couldn't load your conversations"))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSelectConversation(id) {
    if (id === activeId) return;
    setActiveId(id);
    setMessages([]);
    setLoading(true);
    try {
      const data = await getConversationById(token, id);
      setMessages(data.conversation.messages);
    } catch {
      setError("Couldn't load that conversation");
    } finally {
      setLoading(false);
    }
  }

  async function handleNewChat() {
    try {
      const data = await createConversation(token);
      setConversations((prev) => [data.conversation, ...prev]);
      setActiveId(data.conversation._id);
      setMessages([]);
    } catch {
      setError("Couldn't start a new conversation");
    }
  }

  async function handleDeleteConversation(id) {
    try {
      await deleteConversation(token, id);
      const remaining = conversations.filter((c) => c._id !== id);
      setConversations(remaining);

      if (id === activeId) {
        if (remaining.length > 0) {
          handleSelectConversation(remaining[0]._id);
        } else {
          handleNewChat();
        }
      }
    } catch {
      setError("Couldn't delete that conversation");
    }
  }

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending || !activeId) return;

    setError("");
    setSending(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed, _id: `temp-${Date.now()}` }]);

    try {
      const data = await sendMessageToConversation(token, activeId, trimmed);
      setMessages(data.conversation.messages);

      // Update this conversation's title/position in the sidebar list
      setConversations((prev) => {
        const updated = prev.map((c) =>
          c._id === activeId
            ? { ...c, title: data.conversation.title, updatedAt: data.conversation.updatedAt }
            : c
        );
        return updated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <DashboardLayout noScroll>
      <div className="flex h-full">
        <ChatSidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNewChat={handleNewChat}
          onDelete={handleDeleteConversation}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-6 md:px-8 py-6 border-b border-glass-border">
            <h1 className="font-display font-semibold text-xl text-text-primary flex items-center gap-2">
              <Sparkles size={20} className="text-accent-signal" />
              Career Chat
            </h1>
            <p className="mt-1 text-text-secondary font-body text-sm">
              Ask about resumes, interviews, learning paths, or anything career-related.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
            {loading ? (
              <div className="flex items-center justify-center h-full text-text-tertiary">
                <Loader2 size={20} className="animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles size={28} className="text-accent-signal/50 mb-3" />
                <p className="text-text-secondary font-body text-sm max-w-xs">
                  Start the conversation — ask something like "How do I prepare for a
                  frontend interview?"
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                {messages.map((msg) => (
                  <motion.div
                    key={msg._id ?? `${msg.role}-${msg.content.slice(0, 20)}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3",
                        msg.role === "user"
                          ? "bg-accent-core text-text-on-accent text-sm font-body leading-relaxed"
                          : "bg-glass-fill border border-glass-border text-text-primary"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <MarkdownMessage content={msg.content} />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </motion.div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-glass-fill border border-glass-border rounded-lg px-4 py-3">
                      <Loader2 size={16} className="animate-spin text-text-tertiary" />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            )}
          </div>

          {error && <p className="px-6 md:px-8 text-xs text-accent-rare font-body">{error}</p>}

          <form
            onSubmit={handleSend}
            className="px-6 md:px-8 py-4 border-t border-glass-border flex gap-3 max-w-3xl mx-auto w-full"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ASTRA anything about your career..."
              disabled={sending}
              className="flex-1 px-4 py-2.5 rounded-md bg-glass-fill border border-glass-border text-text-primary text-sm font-body placeholder:text-text-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="flex items-center justify-center w-11 h-11 rounded-md bg-accent-core text-text-on-accent hover:bg-accent-core-soft transition-colors duration-fast disabled:opacity-40 shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}