import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export default function BookRegistration({ onNavigate, notify }) {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    pubDate: "",
    pubId: "",
    cost: "",
    retail: "",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book registered:", formData);
    notify("Book registered successfully!", "success");

    setFormData({
      isbn: "",
      title: "",
      pubDate: "",
      pubId: "",
      cost: "",
      retail: "",
      category: "",
      notes: "",
    });
  };

  return (
    <div>
      <button
        type="button"
        className="page-back-link"
        onClick={() => onNavigate("book-inventory-menu")}
      >
        <span>←</span>
        <span>Back to Book Inventory Menu</span>
      </button>

      <header className="page-header">
        <h1 className="page-title">Book Registration Form</h1>
        <p className="page-subtitle">
          Enter details for a new book to add it to the inventory.
        </p>
      </header>

      <Card className="form-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="pubId">Publisher ID</Label>
              <Input
                id="pubId"
                name="pubId"
                value={formData.pubId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="pubDate">Publication Date</Label>
              <Input
                id="pubDate"
                name="pubDate"
                type="date"
                value={formData.pubDate}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="retail">Retail Price</Label>
              <Input
                id="retail"
                name="retail"
                type="number"
                step="0.01"
                value={formData.retail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate("book-inventory-menu")}
            >
              Cancel
            </Button>
            <Button type="submit">Register Book</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
