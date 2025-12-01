import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const initialBooks = [
  {
    isbn: "9780140283297",
    title: "The Great Gatsby",
    pubDate: "1925-04-10",
    pubId: "PUB001",
    cost: 8.99,
    retail: 15.99,
    category: "Classic",
  },
  {
    isbn: "9780061120084",
    title: "To Kill a Mockingbird",
    pubDate: "1960-07-11",
    pubId: "PUB002",
    cost: 9.5,
    retail: 16.99,
    category: "Fiction",
  },
];

export default function BookList({ onNavigate, notify }) {
  const [books, setBooks] = useState(initialBooks);

  const handleChange = (index, field, value) => {
    const parsed =
      field === "category" ? value : parseFloat(value);

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

  const handleUpdate = () => {
    console.log("Updated books:", books);
    notify("Book list updated successfully.", "success");
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
        <h1 className="page-title">Book List / Update Form</h1>
        <p className="page-subtitle">
          Only Cost, Retail Price and Category fields can be updated. All other
          fields are read-only.
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
                  <td>{b.pubDate}</td>
                  <td>{b.pubId}</td>
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
