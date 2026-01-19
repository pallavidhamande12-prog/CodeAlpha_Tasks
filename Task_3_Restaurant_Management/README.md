# Restaurant Management System – Backend

This project is developed as **Task 3** for the **CodeAlpha Backend Internship**.  
It is a backend application built using **Node.js, Express.js, MySQL, and Sequelize** to manage restaurant operations.

## Features
- Add and view menu items  
- Update menu item availability  
- Place customer orders  
- View order details  
- Complete orders  
- Inventory stock validation and updates  
- Manage tables with seating capacity  
- Book table reservations  
- Prevent reservation conflicts based on capacity and time  
- Cancel reservations  

## Technologies Used
- Node.js  
- Express.js  
- MySQL  
- Sequelize ORM  
- Nodemon  

## API Endpoints

### Menu
- `POST /menu` – Add menu item  
- `GET /menu` – View available menu items  
- `PUT /menu/:id/availability` – Update menu availability  

### Orders
- `POST /orders` – Create order  
- `GET /orders/:id` – View order details  
- `PUT /orders/:id/complete` – Complete order  

### Inventory
- `POST /inventory` – Add inventory item  
- `PUT /inventory/:id` – Update inventory stock  

### Tables
- `POST /tables` – Add table  
- `GET /tables` – View tables  

### Reservations
- `POST /reservations` – Create reservation  
- `GET /reservations` – View reservations  
- `DELETE /reservations/:id` – Cancel reservation  

## How to Run
1. Install dependencies:
   ```bash
   npm install
