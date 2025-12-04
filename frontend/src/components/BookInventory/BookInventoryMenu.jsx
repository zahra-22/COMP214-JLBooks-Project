import React from "react";
import { PlusCircle, List } from "lucide-react";
import { Card } from "../../ui/card";

export default function BookInventoryMenu({ onNavigate }) {
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
        <h1 className="page-title">Book Inventory Main Menu</h1>
        <p className="page-subtitle">
          Register new books or update existing inventory records.
        </p>
      </header>

      <div className="tiles-grid">
        <button
          type="button"
          onClick={() => onNavigate("book-registration")}
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <Card className="tile-card">
            <div className="tile-icon-circle tile-books">
              <PlusCircle />
            </div>
            <div className="tile-label">Book Registration</div>
          </Card>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("book-list")}
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <Card className="tile-card">
            <div className="tile-icon-circle tile-books">
              <List />
            </div>
            <div className="tile-label">Book List / Update</div>
          </Card>
        </button>
      </div>
    </div>
  );
}
