import { useState } from "react";
import { Bell, CheckCheck, Trash2, CalendarCheck, FileText, Bookmark, Settings } from "lucide-react";
import { notifications as initialNotifications } from "../../data/mockData";

const typeConfig: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  interview: { icon: <CalendarCheck size={16} />, bg: "bg-blue-100", color: "text-blue-600" },
  application: { icon: <FileText size={16} />, bg: "bg-green-100", color: "text-green-600" },
  saved: { icon: <Bookmark size={16} />, bg: "bg-yellow-100", color: "text-yellow-600" },
  system: { icon: <Settings size={16} />, bg: "bg-muted", color: "text-muted-foreground" },
};

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const clearAll = () => setItems([]);
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  const tabs = ["all", "unread", "interview", "application"];
  const filtered =
    filter === "all" ? items :
    filter === "unread" ? items.filter((n) => !n.read) :
    items.filter((n) => n.type === filter);

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell size={18} className="text-primary" />
              Notifications
              {unreadCount > 0 && (
                <span className="text-xs font-semibold text-white bg-primary rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {items.length} notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <CheckCheck size={13} />
                Mark all read
              </button>
            )}
            {items.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Trash2 size={13} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                filter === tab
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab === "all" ? `All (${items.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-xl border border-border divide-y divide-border">
          {filtered.map((n) => {
            const cfg = typeConfig[n.type] || typeConfig.system;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-5 group transition-colors ${!n.read ? "bg-blue-50/40" : ""}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <span className={cfg.color}>{cfg.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    {!n.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                      title="Mark as read"
                    >
                      <CheckCheck size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => remove(n.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <div className="text-5xl mb-4">🔔</div>
          <h3 className="font-semibold text-foreground mb-2">All caught up!</h3>
          <p className="text-sm text-muted-foreground">
            {filter === "unread" ? "No unread notifications." : "You have no notifications."}
          </p>
        </div>
      )}
    </div>
  );
}
