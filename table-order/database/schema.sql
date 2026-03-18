CREATE DATABASE IF NOT EXISTS tableorder CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tableorder;

CREATE TABLE stores (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id CHAR(36) PRIMARY KEY,
  store_id CHAR(36) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  login_attempts INT NOT NULL DEFAULT 0,
  locked_until DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  UNIQUE KEY uq_admin_store_username (store_id, username)
);

CREATE TABLE tables_ (
  id CHAR(36) PRIMARY KEY,
  store_id CHAR(36) NOT NULL,
  table_number INT NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  UNIQUE KEY uq_table_store_number (store_id, table_number)
);

CREATE TABLE sessions (
  id CHAR(36) PRIMARY KEY,
  table_id CHAR(36) NOT NULL,
  store_id CHAR(36) NOT NULL,
  started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (table_id) REFERENCES tables_(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE categories (
  id CHAR(36) PRIMARY KEY,
  store_id CHAR(36) NOT NULL,
  name VARCHAR(50) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE menus (
  id CHAR(36) PRIMARY KEY,
  store_id CHAR(36) NOT NULL,
  category_id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id CHAR(36) PRIMARY KEY,
  store_id CHAR(36) NOT NULL,
  table_id CHAR(36) NOT NULL,
  session_id CHAR(36) NOT NULL,
  order_number INT NOT NULL,
  status ENUM('pending','preparing','completed') NOT NULL DEFAULT 'pending',
  total_amount INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (table_id) REFERENCES tables_(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE order_items (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  menu_id CHAR(36) NOT NULL,
  menu_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  unit_price INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menus(id)
);

CREATE TABLE payments (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL UNIQUE,
  status ENUM('unpaid','paid','failed') NOT NULL DEFAULT 'unpaid',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
