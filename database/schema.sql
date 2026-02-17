-- Lagankhel Dental Clinic Database Schema
-- Run this script to set up the database

CREATE DATABASE IF NOT EXISTS lagankhel_dental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lagankhel_dental;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin: admin / admin123 (change after first login!)
INSERT INTO admin_users (username, password_hash, email) VALUES 
('admin', '$2y$10$dMHD8a83tqlYaeSRRVZOauWN7xOpjz5MyVzgg9m4bAXU8FUw6biEK', 'admin@lagankheldental.com')
ON DUPLICATE KEY UPDATE username=username;

-- Hero banner table (supports multiple slides for carousel)
CREATE TABLE IF NOT EXISTS hero_banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subtitle VARCHAR(255) DEFAULT 'YOUR SMILE IS OUR PRIDE',
    title VARCHAR(255) DEFAULT 'Lagankhel Dental Clinic',
    tagline VARCHAR(255) DEFAULT 'Best Dental Clinic in Lalitpur',
    background_image VARCHAR(500) NOT NULL,
    overlay_opacity DECIMAL(3,2) DEFAULT 0.45,
    text_position ENUM('left', 'center', 'right') DEFAULT 'center',
    btn1_text VARCHAR(100) DEFAULT 'Book Appointment',
    btn2_text VARCHAR(100) DEFAULT 'Learn More',
    btn2_link VARCHAR(255) DEFAULT '/about',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero with professional dental clinic images from Unsplash
INSERT INTO hero_banner (subtitle, title, tagline, background_image, overlay_opacity, text_position, sort_order) VALUES
('YOUR SMILE IS OUR PRIDE', 'Lagankhel Dental Clinic', 'Best Dental Clinic in Lalitpur', 
 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920', 0.5, 'center', 0),
('EXPERIENCE EXCELLENCE', 'Lagankhel Dental Clinic', 'Modern Care, Traditional Values', 
 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920', 0.5, 'center', 1),
('TRUSTED DENTAL CARE', 'Lagankhel Dental Clinic', 'Your Smile, Our Priority', 
 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920', 0.5, 'center', 2);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    category VARCHAR(100) DEFAULT 'clinic',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert professional dental clinic images
INSERT INTO gallery_images (image_url, title, category, sort_order) VALUES
('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 'Treatment Room', 'clinic', 0),
('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', 'Dental Chair', 'clinic', 1),
('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', 'Modern Equipment', 'clinic', 2),
('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', 'Examination Room', 'clinic', 3),
('https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', 'Dental Care', 'clinic', 4),
('https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', 'Clinic Interior', 'clinic', 5),
('https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600', 'Patient Care', 'clinic', 6),
('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 'Professional Care', 'clinic', 7);

-- Site settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO site_settings (setting_key, setting_value) VALUES
('clinic_name', 'Lagankhel Dental Clinic'),
('clinic_tagline', 'Your smile is our pride'),
('contact_phone', '+977 9800000000'),
('contact_landline', '01-1234567'),
('contact_address', 'Lagankhel, Lalitpur, Nepal'),
('opening_hours', 'Sunday - Friday, 10:00 AM - 7:00 PM')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
