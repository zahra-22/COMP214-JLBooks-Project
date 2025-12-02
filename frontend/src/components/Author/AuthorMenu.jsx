import React from "react";
import { ArrowLeft, UserPlus, Link as LinkIcon } from "lucide-react";
import { Card } from "../../ui/card";

export default function AuthorMenu({ onNavigate }) {
  return (
    <div>
      <button
        type="button"
        className="page-back-link"
        onClick={() => onNavigate("home")}
      >
        <span>←</span>
        <span>Back to Main Menu</span>
      </button>

      <header className="page-header">
        <h1 className="page-title">Author Main Menu</h1>
        <p className="page-subtitle">
          Register authors and assign them to books in the inventory.
        </p>
      </header>

      <div className="tiles-grid">
        <button
          type="button"
          onClick={() => onNavigate("register-author")}
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <Card className="tile-card">
            <div className="tile-icon-circle tile-authors">
              <UserPlus />
            </div>
            <div className="tile-label">Register New Author</div>
          </Card>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("assign-author")}
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <Card className="tile-card">
            <div className="tile-icon-circle tile-authors">
              <LinkIcon />
            </div>
            <div className="tile-label">Assign Author to Book</div>
          </Card>
        </button>
      </div>
    </div>
  );
}
