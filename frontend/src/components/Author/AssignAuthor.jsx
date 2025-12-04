import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Select } from "../../ui/select";

export default function AssignAuthor({ onNavigate, notify }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedIsbn, setSelectedIsbn] = useState("");
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksRes, authorsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/books/all"),
          axios.get("http://localhost:5000/api/authors/all"),
        ]);

        setBooks(booksRes.data || []);
        setAuthors(authorsRes.data || []);
      } catch (err) {
        console.error("Error loading books/authors:", err);
        notify("Failed to load books or authors.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [notify]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIsbn || !selectedAuthorId) {
      notify("Please select both a book and an author.", "error");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/authors/assign", {
        isbn: selectedIsbn,
        authorId: selectedAuthorId,
      });

      notify("Author assigned to book successfully!", "success");
      setSelectedIsbn("");
      setSelectedAuthorId("");
    } catch (err) {
      console.error("Error assigning author:", err);
      notify("Failed to assign author to book.", "error");
    }
  };

  if (loading) {
    return <p>Loading books and authors...</p>;
  }

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
                <option key={a.authorId} value={a.authorId}>
                  {a.authorId} - {a.firstName} {a.lastName}
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
