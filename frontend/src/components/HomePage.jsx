import React from "react";
import { BookOpen, Users, UserCircle } from "lucide-react";
import { Card } from "../ui/card";

export default function HomePage({ onNavigate }) {
  const tiles = [
    {
      label: "Book Inventory Main Menu",
      icon: <BookOpen />,
      circleClass: "tile-icon-circle tile-books",
      target: "book-inventory-menu",
    },
    {
      label: "Author Main Menu",
      icon: <Users />,
      circleClass: "tile-icon-circle tile-authors",
      target: "author-menu",
    },
    {
      label: "Client Main Menu",
      icon: <UserCircle />,
      circleClass: "tile-icon-circle tile-clients",
      target: "client-menu",
    },
  ];

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Welcome to JL Book Sales</h1>
        <p className="page-subtitle">
          Choose a module below to manage books, authors, or client information.
        </p>
      </header>

      <div className="tiles-grid">
        {tiles.map((t) => (
          <button
            key={t.label}
            onClick={() => onNavigate(t.target)}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <Card className="tile-card">
              <div className={t.circleClass}>{t.icon}</div>
              <div className="tile-label">{t.label}</div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
