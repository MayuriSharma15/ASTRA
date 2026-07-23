/**
 * ChatSidebar
 * -----------------------------------------------------------------------
 * Lists past conversations (title + relative time), a "New Chat" button,
 * and delete-on-hover — the same pattern as ChatGPT/Claude's own history
 * panel. This IS the "Persistent Career Memory" concept made concrete:
 * every past conversation is retrievable, not lost when you navigate
 * away or refresh.
 *
 * PROPS
 * @param {Array} conversations - {_id, title, updatedAt}
 * @param {string} activeId - currently open conversation's id
 * @param {(id: string) => void} onSelect
 * @param {() => void} onNewChat
 * @param {(id: string) => void} onDelete
 * ----------------------------------------------------------------------- */

import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { cn } from "../../utils/cn";

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ChatSidebar({ conversations, activeId, onSelect, onNewChat, onDelete }) {
  return (
    <div className="w-64 shrink-0 border-r border-glass-border flex flex-col h-full">
      <div className="p-3 border-b border-glass-border">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-accent-core/10 border border-accent-core/30 text-accent-core hover:bg-accent-core/20 transition-colors duration-fast text-sm font-body"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        {conversations.length === 0 && (
          <p className="text-xs text-text-tertiary font-body text-center mt-6 px-3">
            No conversations yet
          </p>
        )}

        {conversations.map((conv) => (
          <div
            key={conv._id}
            className={cn(
              "group relative flex items-center gap-2 rounded-md px-3 py-2.5 cursor-pointer transition-colors duration-fast",
              conv._id === activeId
                ? "bg-accent-core/10 text-accent-core"
                : "text-text-secondary hover:bg-glass-fill-hover hover:text-text-primary"
            )}
            onClick={() => onSelect(conv._id)}
          >
            <MessageSquare size={14} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-body truncate">{conv.title}</p>
              <p className="text-[10px] text-text-tertiary font-body">
                {timeAgo(conv.updatedAt)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conv._id);
              }}
              aria-label="Delete conversation"
              className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-accent-rare transition-all duration-fast shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}