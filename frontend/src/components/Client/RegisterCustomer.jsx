import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export default function RegisterCustomer({ onNavigate, notify }) {
  const [formData, setFormData] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    address: "",
    region: "",
    state: "",
    email: "",
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
    console.log("Customer registered:", formData);
    notify("Customer registered successfully!", "success");
    setFormData({
      customerId: "",
      firstName: "",
      lastName: "",
      address: "",
      region: "",
      state: "",
      email: "",
    });
  };

  return (
    <div>
      <button
        type="button"
        className="page-back-link"
        onClick={() => onNavigate("client-menu")}
      >
        <span>←</span>
        <span>Back to Client Menu</span>
      </button>

      <header className="page-header">
        <h1 className="page-title">Register New Customer</h1>
        <p className="page-subtitle">
          Enter details for a new client to add them to the system.
        </p>
      </header>

      <Card className="form-card">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="customerId">Customer ID</Label>
            <Input
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
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
            <div style={{ flex: 1 }}>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate("client-menu")}
            >
              Cancel
            </Button>
            <Button type="submit">Register Customer</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
