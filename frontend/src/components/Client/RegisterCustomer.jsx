import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

export default function RegisterCustomer({ onNavigate, notify }) {
  const [formData, setFormData] = useState({
    customerId: "",
    lastName: "",
    firstName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    referred: "",
    region: "",
    email: "",
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
      await fetch("http://localhost:5000/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      notify("Customer added successfully!", "success");

      setFormData({
        customerId: "",
        lastName: "",
        firstName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        referred: "",
        region: "",
        email: "",
      });

    } catch (err) {
      console.error(err);
      notify("Failed to add customer", "error");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="page-back-link"
        onClick={() => onNavigate("client-menu")}
      >
        ← Back to Client Menu
      </button>

      <header className="page-header">
        <h1 className="page-title">Register New Customer</h1>
        <p className="page-subtitle">Enter customer details below.</p>
      </header>

      <Card className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="customerId">Customer ID</Label>
              <Input
                id="customerId"
                name="customerId"
                type="number"
                value={formData.customerId}
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
                maxLength={10}
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
                maxLength={10}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                maxLength={20}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                maxLength={12}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength={2}
              />
            </div>

            <div style={{ flex: 1 }}>
              <Label htmlFor="zip">Zip</Label>
              <Input
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                maxLength={5}
              />
            </div>

            <div style={{ flex: 1 }}>
              <Label htmlFor="referred">Referred ID</Label>
              <Input
                id="referred"
                name="referred"
                type="number"
                value={formData.referred}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="region">Region Code</Label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                maxLength={2}
              />
            </div>

            <div style={{ flex: 2 }}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={30}
              />
            </div>
          </div>

          {/* Buttons */}
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
