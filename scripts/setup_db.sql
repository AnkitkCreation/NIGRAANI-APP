-- ==========================================
-- NIGRANI MySQL Schema
-- Run this script in your MySQL environment
-- ==========================================

CREATE DATABASE IF NOT EXISTS nigraani_db;
USE nigraani_db;

-- 1. WARDS & FINANCES
CREATE TABLE IF NOT EXISTS wards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    total_budget DECIMAL(15, 2) DEFAULT 0.00,
    active_complaints INT DEFAULT 0,
    resolved_complaints INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS & ROLES
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('citizen', 'contractor', 'admin') DEFAULT 'citizen',
    ward_id INT,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ward_id) REFERENCES wards(id)
);

-- 3. COMPLAINTS
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(20) PRIMARY KEY, -- e.g., NIG-2025-001
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address VARCHAR(255),
    ward_id INT,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('pending', 'assigned', 'in_progress', 'resolved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ward_id) REFERENCES wards(id)
);

-- 4. COMPLAINT PHOTOS
CREATE TABLE IF NOT EXISTS complaint_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id VARCHAR(20) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
);

-- 5. CONTRACTORS
CREATE TABLE IF NOT EXISTS contractors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    agency_name VARCHAR(150) NOT NULL,
    department VARCHAR(100),
    rating DECIMAL(2, 1) DEFAULT 0.0,
    avg_resolution_days INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 6. ASSIGNMENTS (The Contractor Jobs)
CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id VARCHAR(20) NOT NULL,
    contractor_id INT NOT NULL,
    tender_id VARCHAR(50),
    budget DECIMAL(12, 2),
    deadline DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id),
    FOREIGN KEY (contractor_id) REFERENCES contractors(id)
);

-- 7. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50), -- e.g., 'status_update', 'assignment'
    title VARCHAR(100),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- INITIAL SEED DATA (WARDS)
INSERT INTO wards (name, total_budget) VALUES 
('Ward 14 — Deccan', 5000000.00),
('Ward 15 — Kothrud', 7500000.00),
('Ward 19 — Koregaon Park', 6000000.00),
('Ward 8 — Aundh', 4500000.00);
