# NIGRANI MySQL Backend Master Guide

This guide explains how we will move NIGRANI from a "Prototype" to a "Production" application with a real MySQL database.

---

## 🏗️ 1. The Architecture
To use MySQL with React, we need a **Node.js + Express** server. 
- **React (Frontend)**: Handles the UI you've already built.
- **Express (Backend)**: The bridge that takes requests from React and talks to MySQL.
- **MySQL (Database)**: The permanent home for your users, reports, and budgets.

---

## 📊 2. The Database Schema
I have designed a robust SQL schema for you. It handles all three roles (Citizen, Admin, Contractor).

### **Step 1: Execute the SQL**
Please run the code inside `scripts/setup_db.sql` in your MySQL environment (MySQL Workbench, XAMPP, or Cloud).

### **Table Definitions:**
- **`users`**: Stores logins, passwords (hashed), and roles.
- **`complaints`**: Stores every detail including GPS coordinates and photo URLs.
- **`contractors`**: Tracking their agency, department, and overall city rating.
- **`assignments`**: The Admin's tool to link a specific contractor to a complaint.
- **`notifications`**: To keep users updated in real-time.

---

## 🚀 3. What We Do Next (Chunk-by-Chunk)

### **Chunk 3: The Backend Bridge**
- Create a `backend/` folder in your project.
- Setup `Express.js`.
- Install `mysql2` and `cors` dependencies.
- Create the first API endpoint: `GET /api/complaints`.

### **Chunk 4: Real Authentication**
- Setup "Passport.js" or "JWT" for secure logins.
- Move from "Priya Sharma" (Mock User) to a real signup/login flow.

### **Chunk 5: Admin & Contractor Dashboards**
- Build the "God Mode" view for the Municipal Commissioner.
- Build the "Job View" for contractors to mark tasks as fixed.

---

## 🛠️ 4. Things You Need
1.  **MySQL Server**: Ensure you have MySQL installed locally (or have a cloud URL).
2.  **Node.js**: Ensure Node.js is installed on your machine.
3.  **Environment File**: We will create a `.env` file to store your DB username and password safely.

**Ready to start?** I'll provide the SQL script next.
