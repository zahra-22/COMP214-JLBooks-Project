import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export default function BookList({ onNavigate, notify }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books/all")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading books:", err);
        notify("Failed to load books", "error");
      });
  }, []);

  const handleChange = (index, field, value) => {
    const parsed = field === "category" ? value : parseFloat(value);

    setBooks((prev) =>
      prev.map((b, i) =>
        i === index
          ? {
              ...b,
              [field]:
                field === "category" || isNaN(parsed)
                  ? value
                  : parsed,
            }
          : b
      )
    );
  };

  const handleUpdate = async () => {
    try {
      for (const book of books) {
        await axios.post("http://localhost:5000/api/books/update", {
          isbn: book.isbn,
          cost: book.cost,
          retail: book.retail,
          category: book.category,
        });
      }

      notify("Books updated successfully!", "success");
    } catch (error) {
      console.error("Update failed:", error);
      notify("Failed to update books", "error");
    }
  };

  if (loading) return <p>Loading books...</p>;

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
        <h1 className="page-title">Book List / Update Form</h1>
        <p className="page-subtitle">
          Only Cost, Retail Price and Category fields can be updated.
        </p>
      </header>

      <Card>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Pubdate</th>
                <th>PubID</th>
                <th>Cost</th>
                <th>Retail Price</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>
              {books.map((b, i) => (
                <tr key={b.isbn}>
                  <td>{b.isbn}</td>
                  <td>{b.title}</td>
                  <td>{b.pubdate}</td>
                  <td>{b.pubid}</td>

                  <td>
                    <Input
                      type="number"
                      step="0.01"
                      value={b.cost}
                      onChange={(e) =>
                        handleChange(i, "cost", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <Input
                      type="number"
                      step="0.01"
                      value={b.retail}
                      onChange={(e) =>
                        handleChange(i, "retail", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <Input
                      value={b.category}
                      onChange={(e) =>
                        handleChange(i, "category", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <Button type="button" onClick={handleUpdate}>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
