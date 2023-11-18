# GreenEcovents Back End

**View the live site [here](https://green-ecovents.vercel.app).**

Welcome to the GreenEcovents Back End repository! This repository hosts the server-side implementation of the GreenEcovents project, a sophisticated event management web application.

## Overview

GreenEcovents boasts a robust back end meticulously crafted by a solo developer using cutting-edge technologies such as TypeScript, Node.js, Express.js, and a PostgreSQL database. This back end seamlessly supports user authentication, event management, content administration, and more.

## What I Did

As the sole developer, I led the entire back-end development of GreenEcovents. My responsibilities included user management, event handling, and dynamic content management. Specifically, my contributions include:



## Entity-Relationship Diagram (ERD)

```plaintext
+---------------------+      +------------------------+      +----------------------+
|        User         |      |        Category        |      |        Event         |
+---------------------+      +------------------------+      +----------------------+
| id                  |      | id                     |      | id                   |
| email               |      | name                   |      | title                |
| password            |      +------------------------+      | description          |
| firstName           |            |                     |      | startDate            |
| lastName            |            |                     |      | endDate              |
| contactNo           |            |                     |      | location             |
| role                |            |                     |      | price                |
| gender              |            |                     |      | image                |
| profileImg          |            |                     |      | status               |
| createdAt           |            |                     |      | userId               |
| updatedAt           |            |                     |      | categoryId           |
|                     |            |                     |      | createdAt            |
|                     |            |                     |      | updatedAt            |
|                     |            |                     |      |                     |
|                     |            |                     |      |                     |
|                     |            |                     |      |                     |
|                     |            |                     |      |                     |
+---------------------+            |                     +------------------------+
        |                       |
        |                       |
        V                       V
+---------------------+      +---------------------+      +---------------------+
|      Booking        |      |       Payment       |      |       Review        |
+---------------------+      +---------------------+      +---------------------+
| id                  |      | id                  |      | id                  |
| status              |      | amount              |      | review              |
| startDate           |      | currency            |      | rating              |
| endDate             |      | paymentId           |      | userId              |
| adults              |      | userId              |      | eventId             |
| childrens           |      | bookingId           |      | createdAt           |
| email               |      | createdAt           |      | updatedAt           |
| contactNo           |      | updatedAt           |      |                     |
| daysBooked          |      |                     |      |                     |
| totalAmount         |      |                     |      |                     |
| userId              |      |                     |      |                     |
| eventId             |      |                     |      |                     |
| createdAt           |      |                     |      |                     |
| updatedAt           |      |                     |      |                     |
|                     |      |                     |      |                     |
|                     |      |                     |      |                     |
|                     |      |                     |      |                     |
+---------------------+      +---------------------+      +---------------------+
        |
        |
        V
+---------------------+
|        Feedback     |
+---------------------+
| id                  |
| feedback            |
| userId              |
| createdAt           |
| updatedAt           |
|                     |
|                     |
|                     |
+---------------------+
        |
        |
        V
+---------------------+
|      BlogPost       |
+---------------------+
| id                  |
| title               |
| content             |
| image               |
| userId              |
| createdAt           |
| updatedAt           |
|                     |
|                     |
|                     |
+---------------------+
        |
        |
        V
+---------------------+
|         FAQ         |
+---------------------+
| id                  |
| question            |
| answer              |
| userId              |
| createdAt           |
| updatedAt           |
|                     |
|                     |
|                     |
+---------------------+
        |
        |
        V
+---------------------+
|        Pages        |
+---------------------+
| id                  |
| title               |
| content             |
| userId              |
| createdAt           |
| updatedAt           |
|                     |
|                     |
|                     |
+---------------------+
        |
        |
        V
+---------------------+
|     Subscriber      |
+---------------------+
| id                  |
| email               |
| createdAt           |
| updatedAt           |
|                     |
|                     |
|                     |
+---------------------+
```


### 🚀 Features

Explore the powerful features of GreenEcovents Back End that make event management a breeze:

- **🔐 Custom Authentication with JWT:**
  Secure your application with a custom authentication system using JSON Web Tokens (JWT). Keep your user data safe and sound.

- **🛡️ Role-Based Access Control:**
  Implement granular control over user permissions with Role-Based Access Control (RBAC). Define who can do what within your application.

- **📅 Event Management API:**
  Effortlessly handle events with a robust API. Create, update, and retrieve event data seamlessly, providing a smooth experience for users.

- **👤 User Management API:**
  Manage users effortlessly with a dedicated API. Handle user registration, login, and profile management with ease.

- **📝 Content Management API:**
  Take control of dynamic content with a powerful Content Management API. Update and manage your application content dynamically.

- **📬 Subscriber Management API:**
  Build and maintain your subscriber base with a dedicated API. Streamline communication with event updates and newsletters.

- **📧 Email Sending Capability:**
  Enhance user engagement by incorporating email notifications. Keep users informed about upcoming events and important updates.

- **🚀 Additional Features (New!):**
  - **Real-time Notifications:**
    Keep users informed in real-time with instant notifications for important events and updates.

  - **Analytics Dashboard:**
    Gain insights into user interactions and event performance with a comprehensive analytics dashboard.

  - **Localization Support:**
    Expand your user base globally with localization support. Provide a seamless experience in multiple languages.

  - **Advanced Search Functionality:**
    Allow users to find events effortlessly with an advanced search feature. Improve user experience and satisfaction.

  - **Integration with Third-Party Services:**
    Seamlessly integrate with external services to enhance functionality and provide a richer user experience.

### Technologies Used

Explore the powerful technologies that drive GreenEcovents Back End, carefully chosen for their efficiency and reliability:

- 💻 **TypeScript** - A statically typed superset of JavaScript, enhancing code quality and developer productivity.
- 🚀 **Node.js** - The runtime environment that enables server-side JavaScript execution, ensuring scalability and performance.
- ⚡ **Express.js** - A fast and minimalist web framework for Node.js, simplifying the development of robust APIs and web applications.
- 🐘 **PostgreSQL** - An advanced open-source relational database management system, providing data integrity and extensibility.
- 🚀 **Prisma** - A modern database toolkit that simplifies database access and management through type-safe queries.
- 🔐 **Zod** - A TypeScript-first schema declaration and validation library, ensuring data integrity throughout the application.
- 🔑 **JWT (JSON Web Token)** - A compact, URL-safe means of representing claims between two parties, commonly used for secure user authentication.

#### Additional Technologies

- 🌐 **GraphQL** - A query language and runtime for APIs, offering a more efficient and powerful alternative to traditional REST.
- 📦 **Docker** - Containerization platform for automating the deployment of applications, ensuring consistency across various environments.
- 🛡️ **Helmet** - A security m iddleware for Express.js, adding essential HTTP headers to protect against common web vulnerabilities.
- 🌍 **Redis** - An in-memory data structure store, often used as a caching mechanism for improved performance.
- 📧 **SendGrid** - A cloud-based email service for reliable and scalable email delivery.

These technologies collectively empower GreenEcovents Back End to deliver a secure, performant, and feature-rich experience.


## Getting Started

1. **Clone this repository:**

    ```bash
    git clone https://github.com/Hamed-Hasan/event-management-backend.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd event-management-backend
    ```

3. **Install dependencies:**

    ```bash
    yarn install
    ```

4. **Configure your database settings in the `.env` file**

5. **Run database migrations:**

    ```bash
    yarn prisma migrate dev
    ```

6. **Start the server:**

    ```bash
    yarn dev
    ```

## Configuration

Make sure to configure the necessary environment variables in a `.env` file based on the provided `.env.example`.

## Contributing

As the sole developer behind this project, contributions are not currently accepted. However, feel free to open issues for bug reports or feature requests.

Happy coding!
