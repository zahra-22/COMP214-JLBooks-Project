import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

const mockCustomers = [
  {
    customerId: "CUST001",
    firstName: "John",
    lastName: "Smith",
    address: "123 Maple Street",
    region: "Northeast",
    state: "NY",
    email: "john.smith@email.com",
  },
  {
    customerId: "CUST002",
    firstName: "Sarah",
    lastName: "Johnson",
    address: "456 Oak Avenue",
    region: "Southeast",
    state: "FL",
    email: "sarah@email.com",
  },
];

export default function UpdateCustomer({ onNavigate, notify }) {
  const [searchId, setSearchId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearch = () => {
    const found = mockCustomers.find(
      (c) => c.customerId.toLowerCase() === searchId.toLowerCase()
    );
    if (!found) {
      notify("Customer not found.", "error");
    }
    setSelectedCustomer(found || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    console.log("Updated customer:", selectedCustomer);
    notify("Customer updated successfully!", "success");
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
        <h1 className="page-title">Update Customer</h1>
        <p className="page-subtitle">
          Search for a customer by ID, then update their contact details.
        </p>
      </header>

      <Card className="form-card">
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <Label htmlFor="searchId">Customer ID</Label>
            <Input
              id="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. CUST001"
            />
          </div>
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Card>

      {selectedCustomer && (
        <Card className="form-card">
          <form onSubmit={handleUpdate}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <Label>Customer ID</Label>
                <Input value={selectedCustomer.customerId} disabled />
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={selectedCustomer.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={selectedCustomer.firstName}
                  onChange={handleChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={selectedCustomer.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={selectedCustomer.address}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  name="region"
                  value={selectedCustomer.region}
                  onChange={handleChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={selectedCustomer.state}
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
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
