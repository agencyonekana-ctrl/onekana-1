CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread'
);

INSERT INTO contact_messages (name, email, subject, message, status) VALUES
('John Doe', 'john@example.com', 'Test Message', 'This is a test message', 'read'),
('Jane Smith', 'jane@example.com', 'Inquiry', 'I have a question about your services', 'unread');