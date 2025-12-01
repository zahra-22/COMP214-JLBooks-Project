import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Select } from "../../ui/select";

const books = [
  { isbn: "9780140283297", title: "The Great Gatsby" },
  { isbn: "9780061120084", title: "To Kill a Mockingbird" },
  { isbn: "9780452284234", title: "1984" },
];

const authors = [
  { id: "AUTH001", name: "F. Scott Fitzgerald" },
  { id: "AUTH002", name: "Harper Lee" },
  { id: "AUTH003", name: "George Orwell" },
];

export default function AssignAuthor({ onNavigate, notify }) {
  const [selectedIsbn, setSelectedIsbn] = useState("");
  const [selectedAuthorId, setSelectedAuthorId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIsbn || !selectedAuthorId) {
      notify("Please select both a book and an author.", "error");
      return;
    }
    console.log("Assigned:", { selectedIsbn, selectedAuthorId });
    notify("Author assigned to book successfully!", "success");
    setSelectedIsbn("");
    setSelectedAuthorId("");
  };

  return (
    <div>
      <button
        type="button"
        className="page-back-link"
        onClick={() => onNavigate("author-menu")}
      >
        <span>←</span>
        <span>Back to Author Menu</span>
      </button>

      <header className="page-header">
        <h1 className="page-title">Assign Author to Book</h1>
        <p className="page-subtitle">
          Select a book and an author to create an assignment record.
        </p>
      </header>

      <Card className="form-card">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="book">Book (ISBN - Title)</Label>
            <Select
              id="book"
              value={selectedIsbn}
              onChange={(e) => setSelectedIsbn(e.target.value)}
            >
              <option value="">-- Select Book --</option>
              {books.map((b) => (
                <option key={b.isbn} value={b.isbn}>
                  {b.isbn} - {b.title}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Select
              id="author"
              value={selectedAuthorId}
              onChange={(e) => setSelectedAuthorId(e.target.value)}
            >
              <option value="">-- Select Author --</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} - {a.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate("author-menu")}
            >
              Cancel
            </Button>
            <Button type="submit">Assign Author</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
