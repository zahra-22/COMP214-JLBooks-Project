import React, { useState } from "react";
import HomePage from "./components/HomePage";

import BookInventoryMenu from "./components/BookInventory/BookInventoryMenu";
import BookRegistration from "./components/BookInventory/BookRegistration";
import BookList from "./components/BookInventory/BookList";

import AuthorMenu from "./components/Author/AuthorMenu";
import RegisterAuthor from "./components/Author/RegisterAuthor";
import AssignAuthor from "./components/Author/AssignAuthor";

import ClientMenu from "./components/Client/ClientMenu";
import RegisterCustomer from "./components/Client/RegisterCustomer";
import UpdateCustomer from "./components/Client/UpdateCustomer";

import Notification from "./components/Notification";


export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [notification, setNotification] = useState(null);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;

      case "book-inventory-menu":
        return <BookInventoryMenu onNavigate={setCurrentPage} />;

      case "book-registration":
        return (
          <BookRegistration onNavigate={setCurrentPage} notify={notify} />
        );

      case "book-list":
        return <BookList onNavigate={setCurrentPage} notify={notify} />;

      case "author-menu":
        return <AuthorMenu onNavigate={setCurrentPage} />;

      case "register-author":
        return (
          <RegisterAuthor onNavigate={setCurrentPage} notify={notify} />
        );

      case "assign-author":
        return (
          <AssignAuthor onNavigate={setCurrentPage} notify={notify} />
        );

      case "client-menu":
        return <ClientMenu onNavigate={setCurrentPage} />;

      case "register-customer":
        return (
          <RegisterCustomer onNavigate={setCurrentPage} notify={notify} />
        );

      case "update-customer":
        return (
          <UpdateCustomer onNavigate={setCurrentPage} notify={notify} />
        );

      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-title-row">
            <div className="app-logo">JL</div>
            <div className="app-title-text">
              <div className="app-title-main">JL Book Sales</div>
              <div className="app-title-sub">
                Oracle Database Management System
              </div>
            </div>
          </div>

          <div className="app-header-badge">Course Project · COMP 214</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">{renderPage()}</main>

      {/* Notification Toast */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
