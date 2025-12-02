import React from "react";
import { ArrowLeft, UserPlus, Pencil } from "lucide-react";
import { Card } from "../../ui/card";

export default function ClientMenu({ onNavigate }) {
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
        <h1 className="page-title">Client Main Menu</h1>
        <p className="page-subtitle">
          Register new clients or update existing customer details.
        </p>
      </header>

      <div className="tiles-grid">
        <button
          type="button"
          onClick={() => onNavigate("register-customer")}
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <Card className="tile-card">
            <div className="tile-icon-circle tile-clients">
              <UserPlus />
            </div>
            <div className="tile-label">Register New Customer</div>
          </Card>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("update-customer")}
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <Card className="tile-card">
            <div className="tile-icon-circle tile-clients">
              <Pencil />
            </div>
            <div className="tile-label">Update Customer</div>
          </Card>
        </button>
      </div>
    </div>
  );
}
