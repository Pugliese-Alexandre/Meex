# Meex

Meex is a full-stack web application developed for jewelry store management.

The application provides an administration interface for managing products, customers, suppliers, orders and invoices.

This project was developed as part of my studies and allowed me to practice the development of a complete application with an Angular frontend, a Spring Boot backend and a PostgreSQL database.

## Technologies

### Backend
- Java 17
- Spring Boot
- Maven
- Spring Data JPA
- REST API

### Frontend
- Angular
- TypeScript
- HTML / SCSS
- PrimeNG

### Database
- PostgreSQL

## Project structure

- `BackEnd` — Spring Boot REST API and database access
- `FrontEnd` — Angular administration interface

## Features

### Dashboard
- Overview of the application
- Sales and product statistics
- Data visualization with charts

### Product catalogue
- Display jewelry products
- Add, edit and delete products
- Product filtering by jewelry type
- Stock management
- Automatic stock status:
    - Available
    - Low quantity
    - Unavailable
- Supplier association

### Customer management
- Display and manage customers
- Customer information and contact details

### Supplier management
- Display and manage suppliers
- Supplier information linked to products

### Orders
- Order management
- Association between customers and products
- Order status tracking

### Invoicing
- Invoice management
- Association between invoices, customers and orders

### Archives
- Archive section to keep data before permanent deletion

## Database

The application uses PostgreSQL to persist the application data.

Main entities include:

- Articles
- Customers
- Suppliers
- Orders
- Order items
- Invoices
- Supplier categories

The Angular frontend communicates with the Spring Boot backend through REST endpoints.

Example:

```text
GET /api/articles
```

## Authentication

An authentication system was initially implemented in the project.

For the current demonstration version, authentication is temporarily bypassed so the different administration features can be accessed directly.

## Running the project

### Backend

From the `BackEnd` directory:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
.\mvnw.cmd spring-boot:run
```

The backend runs by default on:

```text
http://localhost:8080
```

### Frontend

From the `FrontEnd` directory:

```bash
npm install
npm start
```

The Angular development server will then start locally.

## Project status

The project is functional and connected to a PostgreSQL database.

Some features and UI elements are still being improved as the project continues to evolve.

## Author

**Alexandre Pugliese**

Computer Science student — Application Development