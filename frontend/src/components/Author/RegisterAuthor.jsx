import React, { useState } from "react";
import axios from "axios";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export default function RegisterAuthor({ onNavigate, notify }) {
  const [formData, setFormData] = useState({
    authorId: "",
    firstName: "",
    lastName: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/authors/register", {
        authorId: formData.authorId,
        lastName: formData.lastName,
        firstName: formData.firstName,
        // bio is just UI-only here, JL_AUTHOR likely has only 3 columns
      });

      notify("Author registered successfully!", "success");

      setFormData({
        authorId: "",
        firstName: "",
        lastName: "",
        bio: "",
      });
    } catch (err) {
      console.error("Error registering author:", err);
      notify("Failed to register author", "error");
    }
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
        <h1 className="page-title">Register New Author</h1>
        <p className="page-subtitle">
          Capture author details to use when assigning books.
        </p>
      </header>

      <Card className="form-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="authorId">Author ID</Label>
              <Input
                id="authorId"
                name="authorId"
                value={formData.authorId}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="bio">Author Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Optional note about the author"
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate("author-menu")}
            >
              Cancel
            </Button>
            <Button type="submit">Register Author</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
