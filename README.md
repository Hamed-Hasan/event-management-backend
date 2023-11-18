# GreenEcovents Back End

**View the live site [here](https://green-ecovents.vercel.app).**

## Embrace the Heartbeat of GreenEcovents 🌿

![GreenAura Crest](https://i.ibb.co/pQ4jX6J/green-landing.png)

Welcome to the soulful core of GreenEcovents!  This repository cradles the intricate symphony of the server side, a masterpiece crafted by a lone dream-weaver immersed in the enchanting realms of TypeScript, Node.js, and Express.js. It's not just a backend; it's the pulsating heart of a visionary event management web application.

## Unveiling the Magic

GreenEcovents is more than code; it's a journey. Picture a lone developer, navigating the digital wilderness, sculpting this marvel with the grace of TypeScript, the power of Node.js, and the expressiveness of Express.js. The backdrop? A PostgreSQL canvas, where every line of code weaves a tale of user authentication, event orchestration, and dynamic content choreography.

## Symphony of Contribution

As the maestro behind the curtain, I orchestrated the entire backend symphony for GreenEcovents. My canvas embraced the responsibilities of user management, the choreography of event handling, and the dynamic narration of content administration. Each keystroke, a note; every commit, a melody. Here’s a glimpse of my contributions:





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

# GreenEcovents API Endpoints

### Main Route
- **/api/v1:** Root route to include all sub-routes.

### Auth Routes
- **POST /signup:** Register a new user.
- **POST /login:** Log in a user.
- **POST /refresh-token:** Refresh the authentication token.
- **PATCH /change-password:** Change the password of a user.
- **POST /logout:** Log out a user.

### Admin Routes
- **POST /make-admin:** Make a user an admin (requires SUPER_ADMIN role).
- **PATCH /:id:** Update admin details (requires SUPER_ADMIN role).
- **GET /:** Get all admins (requires SUPER_ADMIN role).
- **DELETE /:id:** Delete an admin (requires SUPER_ADMIN role).

### Blog Routes
- **POST /:** Create a new blog (requires ADMIN or SUPER_ADMIN role).
- **GET /user:** Get blogs by user (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /:** Get all blogs.
- **GET /:id:** Get a single blog.
- **PATCH /:id:** Update a blog (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete a blog (requires ADMIN or SUPER_ADMIN role).

### Booking Routes
- **POST /create-payment-intents:** Create payment intents for booking (requires ADMIN, SUPER_ADMIN, or USER role).
- **POST /:** Create a new booking (requires ADMIN, SUPER_ADMIN, or USER role).
- **POST /confirm:** Confirm a booking (requires ADMIN, SUPER_ADMIN, or USER role).
- **POST /get-data:** Get booking data (requires ADMIN or SUPER_ADMIN role).
- **GET /payment-details/:id:** Get payment details for a booking (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /:** Get all bookings (requires ADMIN or SUPER_ADMIN role).
- **GET /user:** Get bookings by user (requires USER role).
- **GET /:id:** Get a single booking (requires ADMIN, SUPER_ADMIN, or USER role).
- **PATCH /:id:** Update a booking (requires ADMIN or SUPER_ADMIN role).
- **PATCH /user/:id:** Cancel a booking (requires USER role).
- **DELETE /:id:** Delete a booking (requires ADMIN, SUPER_ADMIN, or USER role).

### Category Routes
- **POST /:** Create or update a category (requires ADMIN or SUPER_ADMIN role).
- **GET /:** Get all categories.
- **GET /:id:** Get a single category.
- **PATCH /:id:** Update a category (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete a category (requires ADMIN or SUPER_ADMIN role).

### Event Routes
- **POST /:** Create a new event (requires ADMIN or SUPER_ADMIN role).
- **GET /:** Get all events.
- **GET /:id:** Get a single event.
- **PATCH /:id:** Update an event (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete an event (requires ADMIN or SUPER_ADMIN role).

### FAQ Routes
- **POST /:** Create a new FAQ (requires ADMIN or SUPER_ADMIN role).
- **GET /user:** Get FAQs by user (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /:** Get all FAQs.
- **GET /:id:** Get a single FAQ.
- **PATCH /:id:** Update a FAQ (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete a FAQ (requires ADMIN or SUPER_ADMIN role).

### Feedback Routes
- **POST /:** Create new feedback (requires USER role).
- **GET /user:** Get feedbacks by user (requires USER role).
- **GET /:** Get all feedbacks (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /:id:** Get a single feedback (requires ADMIN, SUPER_ADMIN, or USER role).
- **PATCH /:id:** Update feedback (requires ADMIN, SUPER_ADMIN, or USER role).
- **DELETE /:id:** Delete feedback (requires ADMIN or SUPER_ADMIN role).

### Mail Routes
- **POST /:** Send an email.

### Page Routes
- **POST /:** Create a new page (requires ADMIN or SUPER_ADMIN role).
- **GET /user:** Get pages by user (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /:** Get all pages.
- **GET /:id:** Get a single page.
- **PATCH /:id:** Update a page (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete a page (requires ADMIN or SUPER_ADMIN role).

### Review Routes
- **POST /:** Create a new review (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /user:** Get reviews by user (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /:** Get all reviews.
- **GET /:id:** Get a single review.
- **PATCH /:id:** Update a review (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete a review (requires ADMIN or SUPER_ADMIN role).
- **GET /events/:eventId:** Get reviews by event ID (requires ADMIN, SUPER_ADMIN, or USER role).

### Subscriber Routes
- **POST /:** Add a new subscriber.
- **POST /send:** Send an email to subscribers (requires ADMIN or SUPER_ADMIN role).
- **GET /:** Get all subscribers (requires ADMIN or SUPER_ADMIN role).
- **DELETE /:id:** Delete a subscriber (requires ADMIN or SUPER_ADMIN role).

### User Routes
- **GET /profile:** Get user profile details (requires ADMIN, SUPER_ADMIN, or USER role).
- **GET /get-all:** Get all users (requires ADMIN or SUPER_ADMIN role).
- **GET /:id:** Get a user by ID.
- **PATCH /profile:** Update user profile (requires ADMIN, SUPER_ADMIN, or USER role).
- **PATCH /:id:** Update a user (requires ADMIN, SUPER_ADMIN, or USER role).
- **DELETE /:id:** Delete a user (requires ADMIN or SUPER_ADMIN role).



# API ENDPOINTS & DATA


### Authentication Endpoints (AuthRoutes)

1. **POST /api/v1/auth/signup**
   - **Request:**
     ```json
     {
       "email": "user@example.com",
       "password": "password123",
       "firstName": "John",
       "lastName": "Doe",
       "contactNo": "1234567890",
       "gender": "male"
     }
     ```
   - **Response:**
     ```json
     {
       "id": "generated_user_id",
       "email": "user@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "contactNo": "1234567890",
       "role": "USER",
       "gender": "male",
       "profileImg": null,
       "createdAt": "timestamp",
       "updatedAt": "timestamp",
       "feedbacks": [],
       "pages": [],
       "payments": [],
       "reviews": [],
       "bookings": [],
       "blogPosts": [],
       "FAQs": [],
       "events": []
     }
     ```

2. **POST /api/v1/auth/login**
   - **Request:**
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "accessToken": "jwt_access_token",
       "refreshToken": "jwt_refresh_token"
     }
     ```

3. **POST /api/v1/auth/refresh-token**
   - **Request:**
     ```json
     {
       "refreshToken": "jwt_refresh_token"
     }
     ```
   - **Response:**
     ```json
     {
       "accessToken": "new_jwt_access_token"
     }
     ```

4. **PATCH /api/v1/auth/change-password**
   - **Request:**
     ```json
     {
       "newPassword": "new_password123"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Password changed successfully"
     }
     ```

5. **POST /api/v1/auth/logout**
   - **Response:**
     ```json
     {
       "message": "Logout successful"
     }
     ```

### User Endpoints (UserRoutes)

6. **GET /api/v1/user/profile**
   - **Response:**
     ```json
     {
       "id": "user_id",
       "email": "user@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "contactNo": "1234567890",
       "role": "USER",
       "gender": "male",
       "profileImg": null,
       "createdAt": "timestamp",
       "updatedAt": "timestamp",
       "feedbacks": [],
       "pages": [],
       "payments": [],
       "reviews": [],
       "bookings": [],
       "blogPosts": [],
       "FAQs": [],
       "events": []
     }
     ```

7. **GET /api/v1/user/get-all**
   - **Response:**
     ```json
     [
       {
         "id": "user_id_1",
         "email": "user1@example.com",
         "firstName": "Alice",
         "lastName": "Smith",
         "contactNo": "9876543210",
         "role": "USER",
         "gender": "female",
         "profileImg": null,
         "createdAt": "timestamp",
         "updatedAt": "timestamp",
         "feedbacks": [],
         "pages": [],
         "payments": [],
         "reviews": [],
         "bookings": [],
         "blogPosts": [],
         "FAQs": [],
         "events": []
       },
       {
         "id": "user_id_2",
         "email": "user2@example.com",
         "firstName": "Bob",
         "lastName": "Johnson",
         "contactNo": "5678901234",
         "role": "USER",
         "gender": "male",
         "profileImg": null,
         "createdAt": "timestamp",
         "updatedAt": "timestamp",
         "feedbacks": [],
         "pages": [],
         "payments": [],
         "reviews": [],
         "bookings": [],
         "blogPosts": [],
         "FAQs": [],
         "events": []
       }
     ]
     ```

8. **GET /api/v1/user/:id**
   - **Response:**
     ```json
     {
       "id": "user_id",
       "email": "user@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "contactNo": "1234567890",
       "role": "USER",
       "gender": "male",
       "profileImg": null,
       "createdAt": "timestamp",
       "updatedAt": "timestamp",
       "feedbacks": [],
       "pages": [],
       "payments": [],
       "reviews": [],
       "bookings": [],
       "blogPosts": [],
       "FAQs": [],
       "events":

 []
     }
     ```

9. **PATCH /api/v1/user/profile**
   - **Request:**
     ```json
     {
       "firstName": "UpdatedJohn",
       "lastName": "UpdatedDoe",
       "contactNo": "9876543210",
       "gender": "female"
     }
     ```
   - **Response:**
     ```json
     {
       "id": "user_id",
       "email": "user@example.com",
       "firstName": "UpdatedJohn",
       "lastName": "UpdatedDoe",
       "contactNo": "9876543210",
       "role": "USER",
       "gender": "female",
       "profileImg": null,
       "createdAt": "timestamp",
       "updatedAt": "timestamp",
       "feedbacks": [],
       "pages": [],
       "payments": [],
       "reviews": [],
       "bookings": [],
       "blogPosts": [],
       "FAQs": [],
       "events": []
     }
     ```

10. **PATCH /api/v1/user/:id**
    - **Request:**
      ```json
      {
        "firstName": "UpdatedAlice",
        "lastName": "UpdatedSmith",
        "contactNo": "9876543210",
        "gender": "female"
      }
      ```
    - **Response:**
      ```json
      {
        "id": "user_id",
        "email": "user@example.com",
        "firstName": "UpdatedAlice",
        "lastName": "UpdatedSmith",
        "contactNo": "9876543210",
        "role": "USER",
        "gender": "female",
        "profileImg": null,
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "feedbacks": [],
        "pages": [],
        "payments": [],
        "reviews": [],
        "bookings": [],
        "blogPosts": [],
        "FAQs": [],
        "events": []
      }
      ```

11. **DELETE /api/v1/user/:id**
    - **Response:**
      ```json
      {
        "message": "User deleted successfully"
      }
      ```

### Admin Endpoints (AdminRoutes)

12. **POST /api/v1/admin/make-admin**
    - **Request:**
      ```json
      {
        "userId": "user_id_to_promote"
      }
      ```
    - **Response:**
      ```json
      {
        "message": "User promoted to admin successfully"
      }
      ```

13. **PATCH /api/v1/admin/:id**
    - **Request:**
      ```json
      {
        "firstName": "UpdatedAdmin",
        "lastName": "UpdatedLastName",
        "contactNo": "9876543210",
        "gender": "male"
      }
      ```
    - **Response:**
      ```json
      {
        "id": "admin_id",
        "email": "admin@example.com",
        "firstName": "UpdatedAdmin",
        "lastName": "UpdatedLastName",
        "contactNo": "9876543210",
        "role": "ADMIN",
        "gender": "male",
        "profileImg": null,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
      ```

14. **GET /api/v1/admin/**
    - **Response:**
      ```json
      [
        {
          "id": "admin_id_1",
          "email": "admin1@example.com",
          "firstName": "Admin1",
          "lastName": "Smith",
          "contactNo": "9876543210",
          "role": "ADMIN",
          "gender": "male",
          "profileImg": null,
          "createdAt": "timestamp",
          "updatedAt": "timestamp"
        },
        {
          "id": "admin_id_2",
          "email": "admin2@example.com",
          "firstName": "Admin2",
          "lastName": "Johnson",
          "contactNo": "5678901234",
          "role": "ADMIN",
          "gender": "female",
          "profileImg": null,
          "createdAt": "timestamp",
          "updatedAt": "timestamp"
        }
      ]
      ```

15. **DELETE /api/v1/admin/:id**
    - **Response:**
      ```json
      {
        "message": "Admin deleted successfully"
      }
      ```


### Category Endpoints (CategoryRoutes)

1. **Create a Category:**
   - Endpoint: `POST /api/v1/categories`
   - Authentication: Required (Admin or Super Admin)
   - Request Body:
     ```json
     {
       "name": "CategoryName"
     }
     ```
   - Response:
     ```json
     {
       "id": "categoryId",
       "name": "CategoryName",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

2. **Get All Categories:**
   - Endpoint: `GET /api/v1/categories`
   - Authentication: Not required
   - Response:
     ```json
     [
       {
         "id": "categoryId1",
         "name": "CategoryName1",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       {
         "id": "categoryId2",
         "name": "CategoryName2",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       // ... other categories
     ]
     ```

3. **Get a Single Category:**
   - Endpoint: `GET /api/v1/categories/:id`
   - Authentication: Not required
   - Response:
     ```json
     {
       "id": "categoryId",
       "name": "CategoryName",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

4. **Update a Category:**
   - Endpoint: `PATCH /api/v1/categories/:id`
   - Authentication: Required (Admin or Super Admin)
   - Request Body:
     ```json
     {
       "name": "UpdatedCategoryName"
     }
     ```
   - Response:
     ```json
     {
       "id": "categoryId",
       "name": "UpdatedCategoryName",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

5. **Delete a Category:**
   - Endpoint: `DELETE /api/v1/categories/:id`
   - Authentication: Required (Admin or Super Admin)
   - Response:
     ```json
     {
       "message": "Category deleted successfully"
     }
     ```

### Event API Endpoints (EventRoutes)


1. **Create Event:**
   - **Endpoint:** `POST /api/v1/events`
   - **Request Body:**
     ```json
     {
       "title": "Example Event",
       "description": "A sample event description",
       "startDate": "2023-01-01T00:00:00.000Z",
       "endDate": "2023-01-02T00:00:00.000Z",
       "location": "Sample Location",
       "price": 25.99,
       "image": "event-image-url.jpg",
       "userId": "user-id",  // Replace with the actual user ID
       "categoryId": "category-id"  // Replace with the actual category ID
     }
     ```
   - **Response Data:**
     ```json
     {
       "id": "generated-event-id",
       "title": "Example Event",
       "description": "A sample event description",
       "startDate": "2023-01-01T00:00:00.000Z",
       "endDate": "2023-01-02T00:00:00.000Z",
       "location": "Sample Location",
       "price": 25.99,
       "image": "event-image-url.jpg",
       "status": "upcoming",
       "userId": "user-id",
       "categoryId": "category-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

2. **Get All Events:**
   - **Endpoint:** `GET /api/v1/events`
   - **Response Data:**
     ```json
     [
       {
         "id": "event-id-1",
         "title": "Event 1",
         "description": "Description 1",
         "startDate": "2023-01-01T00:00:00.000Z",
         "endDate": "2023-01-02T00:00:00.000Z",
         "location": "Location 1",
         "price": 29.99,
         "image": "event-image-1.jpg",
         "status": "upcoming",
         "userId": "user-id-1",
         "categoryId": "category-id-1",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       // ... (other events)
     ]
     ```

3. **Get Single Event:**
   - **Endpoint:** `GET /api/v1/events/:id` (replace `:id` with the actual event ID)
   - **Response Data:**
     ```json
     {
       "id": "event-id",
       "title": "Example Event",
       "description": "A sample event description",
       "startDate": "2023-01-01T00:00:00.000Z",
       "endDate": "2023-01-02T00:00:00.000Z",
       "location": "Sample Location",
       "price": 25.99,
       "image": "event-image-url.jpg",
       "status": "upcoming",
       "userId": "user-id",
       "categoryId": "category-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

4. **Update Event:**
   - **Endpoint:** `PATCH /api/v1/events/:id` (replace `:id` with the actual event ID)
   - **Request Body:**
     ```json
     {
       "title": "Updated Event Title",
       "description": "Updated event description",
       "startDate": "2023-02-01T00:00:00.000Z",
       "endDate": "2023-02-02T00:00:00.000Z",
       "location": "Updated Location",
       "price": 35.99,
       "image": "updated-event-image.jpg"
     }
     ```
   - **Response Data:**
     ```json
     {
       "id": "event-id",
       "title": "Updated Event Title",
       "description": "Updated event description",
       "startDate": "2023-02-01T00:00:00.000Z",
       "endDate": "2023-02-02T00:00:00.000Z",
       "location": "Updated Location",
       "price": 35.99,
       "image": "updated-event-image.jpg",
       "status": "upcoming",
       "userId": "user-id",
       "categoryId": "category-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

5. **Delete Event:**
   - **Endpoint:** `DELETE /api/v1/events/:id` (replace `:id` with the actual event ID)
   - **Response Data:** (No content, successful deletion)

### Bookings API Endpoints (BookingsRoutes)


1. **Create a Booking:**
   - **Endpoint:** `POST /api/v1/bookings/`
   - **Request Body:**
     ```json
     {
       "status": "pending",
       "startDate": "2023-01-01T12:00:00Z",
       "endDate": "2023-01-03T12:00:00Z",
       "adults": 2,
       "childrens": 1,
       "email": "user@example.com",
       "contactNo": "+123456789",
       "daysBooked": 3,
       "totalAmount": 150.0,
       "userId": "user-id",
       "eventId": "event-id"
     }
     ```
   - **Response:**
     ```json
     {
       "id": "booking-id",
       "status": "pending",
       "startDate": "2023-01-01T12:00:00Z",
       "endDate": "2023-01-03T12:00:00Z",
       "adults": 2,
       "childrens": 1,
       "email": "user@example.com",
       "contactNo": "+123456789",
       "daysBooked": 3,
       "totalAmount": 150.0,
       "userId": "user-id",
       "eventId": "event-id",
       "createdAt": "2023-11-18T12:00:00Z",
       "updatedAt": "2023-11-18T12:00:00Z"
     }
     ```

2. **Confirm Booking:**
   - **Endpoint:** `POST /api/v1/bookings/confirm`
   - **Request Body:**
     ```json
     {
       "bookingId": "booking-id"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Booking confirmed successfully",
       "booking": {
         "id": "booking-id",
         "status": "confirmed",
         "startDate": "2023-01-01T12:00:00Z",
         "endDate": "2023-01-03T12:00:00Z",
         "adults": 2,
         "childrens": 1,
         "email": "user@example.com",
         "contactNo": "+123456789",
         "daysBooked": 3,
         "totalAmount": 150.0,
         "userId": "user-id",
         "eventId": "event-id",
         "createdAt": "2023-11-18T12:00:00Z",
         "updatedAt": "2023-11-18T12:00:00Z"
       }
     }
     ```

3. **Get All Bookings:**
   - **Endpoint:** `GET /api/v1/bookings/`
   - **Response:**
     ```json
     [
       {
         "id": "booking-id-1",
         "status": "confirmed",
         "startDate": "2023-01-01T12:00:00Z",
         "endDate": "2023-01-03T12:00:00Z",
         "adults": 2,
         "childrens": 1,
         "email": "user@example.com",
         "contactNo": "+123456789",
         "daysBooked": 3,
         "totalAmount": 150.0,
         "userId": "user-id",
         "eventId": "event-id",
         "createdAt": "2023-11-18T12:00:00Z",
         "updatedAt": "2023-11-18T12:00:00Z"
       },
       {
         "id": "booking-id-2",
         "status": "pending",
         "startDate": "2023-02-01T12:00:00Z",
         "endDate": "2023-02-03T12:00:00Z",
         "adults": 1,
         "childrens": 0,
         "email": "anotheruser@example.com",
         "contactNo": "+987654321",
         "daysBooked": 2,
         "totalAmount": 100.0,
         "userId": "another-user-id",
         "eventId": "another-event-id",
         "createdAt": "2023-11-19T12:00:00Z",
         "updatedAt": "2023-11-19T12:00:00Z"
       }
     ]
     ```

4. **Get Booking by ID:**
   - **Endpoint:** `GET /api/v1/bookings/:id`
   - **Response:**
     ```json
     {
       "id": "booking-id",
       "status": "confirmed",
       "startDate": "2023-01-01T12:00:00Z",
       "endDate": "2023-01-03T12:00:00Z",
       "adults": 2,
       "childrens": 1,
       "email": "user@example.com",
       "contactNo": "+123456789",
       "daysBooked": 3,
       "totalAmount": 150.0,
       "userId": "user-id",
       "eventId": "event-id",
       "createdAt": "2023-11-18T12:00:00Z",
       "updatedAt": "2023-11-18T12:00:00Z"
     }
     ```


5. **Update Booking:**
   - **Endpoint:** `PATCH /api/v1/bookings/:id`
   - **Request Body:**
     ```json
     {
       "status": "canceled"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Booking updated successfully",
       "booking": {
         "id": "booking-id",
         "status": "canceled",
         "startDate": "2023-01-01T12:00:00Z",
         "endDate": "2023-01-03T12:00:00Z",
         "adults": 2,
         "childrens": 1,
         "email": "user@example.com",
         "contactNo": "+123456789",
         "daysBooked": 3,
         "totalAmount": 150.0,
         "userId": "user-id",
         "eventId": "event-id",
         "createdAt": "2023-11-18T12:00:00Z",
         "updatedAt": "2023-11-18T12:00:00Z"
       }
     }
     ```

6. **Cancel Booking (User):**
   - **Endpoint:** `PATCH /api/v1/bookings/user/:id`
   - **Response:**
     ```json
     {
       "message": "Booking canceled successfully",
       "booking": {
         "id": "booking-id",
         "status": "canceled",
         "startDate": "2023-01-01T12:00:00Z",
         "endDate": "2023-01-03T12:00:00Z",
         "adults": 2,
         "childrens": 1,
         "email": "user@example.com",
         "contactNo": "+123456789",
         "daysBooked": 3,
         "totalAmount": 150.0,
         "userId": "user-id",
         "eventId": "event-id",
         "createdAt": "2023-11-18T12:00:00Z",
         "updatedAt": "2023-11-18T12:00:00Z"
       }
     }
     ```

7. **Delete Booking:**
   - **Endpoint:** `DELETE /api/v1/bookings/:id`
   - **Response:**
     ```json
     {
       "message": "Booking deleted successfully"
     }
     ```

8. **Get Payment Details:**
   - **Endpoint:** `GET /api/v1/bookings/payment-details/:id`
   - **Response:**
     ```json
     {
       "id": "payment-id",
       "amount": 150.0,
       "currency": "USD",
       "paymentId": "payment-stripe-id",
       "userId": "user-id",
       "bookingId": "booking-id",
       "createdAt": "2023-11-18T12:00:00Z",
       "updatedAt": "2023-11-18T12:00:00Z"
     }
     ```

9. **Get Booking Data (Admin):**
   - **Endpoint:** `POST /api/v1/bookings/get-data`
   - **Response:**
     ```json
     {
       "totalBookings": 100,
       "confirmedBookings": 80,
       "pendingBookings": 15,
       "canceledBookings": 5,
       "revenue": 15000.0
     }
     ```
### Review API Endpoints (ReviewsRoutes)

### 1. Create a Review

**Endpoint:** `POST /api/v1/reviews`

**Request Data:**
```json
{
  "review": "Great event! Enjoyed every moment.",
  "rating": 4.5,
  "userId": "user_id_here",
  "eventId": "event_id_here"
}
```

**Response Data:**
```json
{
  "id": "review_id_here",
  "review": "Great event! Enjoyed every moment.",
  "rating": 4.5,
  "userId": "user_id_here",
  "eventId": "event_id_here",
  "createdAt": "timestamp_here",
  "updatedAt": "timestamp_here"
}
```

### 2. Get Reviews by User

**Endpoint:** `GET /api/v1/reviews/user`

**Response Data:**
```json
[
  {
    "id": "review_id_1",
    "review": "Awesome experience!",
    "rating": 5.0,
    "userId": "user_id_here",
    "eventId": "event_id_1",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  },
  {
    "id": "review_id_2",
    "review": "Enjoyed the event.",
    "rating": 4.0,
    "userId": "user_id_here",
    "eventId": "event_id_2",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  }
  // ... additional reviews
]
```

### 3. Get All Reviews

**Endpoint:** `GET /api/v1/reviews`

**Response Data:**
```json
[
  {
    "id": "review_id_1",
    "review": "Awesome experience!",
    "rating": 5.0,
    "userId": "user_id_1",
    "eventId": "event_id_1",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  },
  {
    "id": "review_id_2",
    "review": "Enjoyed the event.",
    "rating": 4.0,
    "userId": "user_id_2",
    "eventId": "event_id_2",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  }
  // ... additional reviews
]
```

### 4. Get Single Review

**Endpoint:** `GET /api/v1/reviews/:id`

**Response Data:**
```json
{
  "id": "review_id_here",
  "review": "Great event! Enjoyed every moment.",
  "rating": 4.5,
  "userId": "user_id_here",
  "eventId": "event_id_here",
  "createdAt": "timestamp_here",
  "updatedAt": "timestamp_here"
}
```

### 5. Update a Review

**Endpoint:** `PATCH /api/v1/reviews/:id`

**Request Data:**
```json
{
  "review": "Updated review text.",
  "rating": 4.8
}
```

**Response Data:**
```json
{
  "id": "review_id_here",
  "review": "Updated review text.",
  "rating": 4.8,
  "userId": "user_id_here",
  "eventId": "event_id_here",
  "createdAt": "timestamp_here",
  "updatedAt": "timestamp_here"
}
```

### 6. Delete a Review

**Endpoint:** `DELETE /api/v1/reviews/:id`

**Response Data:**
```json
{
  "message": "Review deleted successfully."
}
```

### 7. Get Reviews by Event

**Endpoint:** `GET /api/v1/reviews/events/:eventId`

**Response Data:**
```json
[
  {
    "id": "review_id_1",
    "review": "Great event!",
    "rating": 4.5,
    "userId": "user_id_1",
    "eventId": "event_id_here",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  },
  {
    "id": "review_id_2",
    "review": "Fantastic experience!",
    "rating": 5.0,
    "userId": "user_id_2",
    "eventId": "event_id_here",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  }
  // ... additional reviews
]
```

### Blog API Endpoints (BlogsRoutes)

Certainly! Below are the API endpoints along with their corresponding response data and required request details for the provided `Blog` model:

1. **Create Blog Post:**

   - Endpoint: `POST /api/v1/blogs`
   - Request:
     - Headers: `Authorization` (with user's token)
     - Body: 
       ```json
       {
         "title": "Example Blog Title",
         "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
         "image": "example_image_url.jpg",
         "userId": "user_id"
       }
       ```
   - Response:
     ```json
     {
       "id": "generated_blog_id",
       "title": "Example Blog Title",
       "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
       "image": "example_image_url.jpg",
       "userId": "user_id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

2. **Get All Blogs:**

   - Endpoint: `GET /api/v1/blogs`
   - Response:
     ```json
     [
       {
         "id": "blog_id_1",
         "title": "Blog Title 1",
         "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
         "image": "image_url_1.jpg",
         "userId": "user_id_1",
         "createdAt": "timestamp_1",
         "updatedAt": "timestamp_1"
       },
       {
         "id": "blog_id_2",
         "title": "Blog Title 2",
         "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
         "image": "image_url_2.jpg",
         "userId": "user_id_2",
         "createdAt": "timestamp_2",
         "updatedAt": "timestamp_2"
       },
       // ... More Blogs
     ]
     ```

3. **Get Single Blog:**

   - Endpoint: `GET /api/v1/blogs/:id`
   - Response:
     ```json
     {
       "id": "blog_id",
       "title": "Blog Title",
       "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
       "image": "image_url.jpg",
       "userId": "user_id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

4. **Update Blog:**

   - Endpoint: `PATCH /api/v1/blogs/:id`
   - Request:
     - Headers: `Authorization` (with user's token)
     - Body:
       ```json
       {
         "title": "Updated Blog Title",
         "content": "Updated content goes here",
         "image": "updated_image_url.jpg"
       }
       ```
   - Response:
     ```json
     {
       "id": "blog_id",
       "title": "Updated Blog Title",
       "content": "Updated content goes here",
       "image": "updated_image_url.jpg",
       "userId": "user_id",
       "createdAt": "original_timestamp",
       "updatedAt": "new_timestamp"
     }
     ```

5. **Delete Blog:**

   - Endpoint: `DELETE /api/v1/blogs/:id`
   - Request:
     - Headers: `Authorization` (with user's token)
   - Response:
     ```json
     {
       "message": "Blog with id blog_id deleted successfully."
     }
     ```

### Faq API Endpoints (FaqRoutes)

### Create FAQ

- **Endpoint**: `POST /api/v1/faq`
- **Request Data**:

  ```json
  {
    "question": "Your FAQ Question",
    "answer": "Your FAQ Answer"
  }
  ```

- **Response Data**:

  ```json
  {
    "id": "generated-id",
    "question": "Your FAQ Question",
    "answer": "Your FAQ Answer",
    "userId": "user-id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Get FAQs for User

- **Endpoint**: `GET /api/v1/faq/user`
- **Response Data**:

  ```json
  [
    {
      "id": "faq-id",
      "question": "FAQ Question",
      "answer": "FAQ Answer",
      "userId": "user-id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    // Additional FAQs...
  ]
  ```

### Get All FAQs

- **Endpoint**: `GET /api/v1/faq`
- **Response Data**:

  ```json
  [
    {
      "id": "faq-id",
      "question": "FAQ Question",
      "answer": "FAQ Answer",
      "userId": "user-id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    // Additional FAQs...
  ]
  ```

### Get Single FAQ

- **Endpoint**: `GET /api/v1/faq/:id`
- **Response Data**:

  ```json
  {
    "id": "faq-id",
    "question": "FAQ Question",
    "answer": "FAQ Answer",
    "userId": "user-id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Update FAQ

- **Endpoint**: `PATCH /api/v1/faq/:id`
- **Request Data**:

  ```json
  {
    "question": "Updated FAQ Question",
    "answer": "Updated FAQ Answer"
  }
  ```

- **Response Data**:

  ```json
  {
    "id": "faq-id",
    "question": "Updated FAQ Question",
    "answer": "Updated FAQ Answer",
    "userId": "user-id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Delete FAQ

- **Endpoint**: `DELETE /api/v1/faq/:id`
- **Response Data**:

  ```json
  {
    "message": "FAQ deleted successfully"
  }
  ```


### Feedback API Endpoints (FeedbacksRoutes)

### API Endpoints:

1. **Create Feedback:**
   - Endpoint: `POST /api/v1/feedbacks`
   - Request Body (JSON):
     ```json
     {
       "feedback": "Your feedback message here"
     }
     ```
   - Response Data (JSON):
     ```json
     {
       "id": "generated-feedback-id",
       "feedback": "Your feedback message here",
       "userId": "user-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

2. **Get Feedbacks by User:**
   - Endpoint: `GET /api/v1/feedbacks/user`
   - Response Data (Array of JSON):
     ```json
     [
       {
         "id": "feedback-id-1",
         "feedback": "Feedback message 1",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       {
         "id": "feedback-id-2",
         "feedback": "Feedback message 2",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       ...
     ]
     ```

3. **Get All Feedbacks:**
   - Endpoint: `GET /api/v1/feedbacks`
   - Response Data (Array of JSON):
     ```json
     [
       {
         "id": "feedback-id-1",
         "feedback": "Feedback message 1",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       {
         "id": "feedback-id-2",
         "feedback": "Feedback message 2",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
     ]
     ```

4. **Get Single Feedback:**
   - Endpoint: `GET /api/v1/feedbacks/:id`
   - Response Data (JSON):
     ```json
     {
       "id": "feedback-id",
       "feedback": "Your feedback message",
       "userId": "user-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

5. **Update Feedback:**
   - Endpoint: `PATCH /api/v1/feedbacks/:id`
   - Request Body (JSON):
     ```json
     {
       "feedback": "Updated feedback message"
     }
     ```
   - Response Data (JSON):
     ```json
     {
       "id": "feedback-id",
       "feedback": "Updated feedback message",
       "userId": "user-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

6. **Delete Feedback:**
   - Endpoint: `DELETE /api/v1/feedbacks/:id`
   - Response Data (JSON):
     ```json
     {
       "message": "Feedback deleted successfully"
     }
     ```



### Page API Endpoints (PagesRoutes)


1. **Create Page:**
   - **Endpoint:** `POST /api/v1/pages`
   - **Request Body:** JSON with page details
     ```json
     {
       "title": "Sample Page",
       "content": "This is a sample page content."
     }
     ```
   - **Response Data:** JSON with created page details
     ```json
     {
       "id": "generated-id",
       "title": "Sample Page",
       "content": "This is a sample page content.",
       "userId": "user-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

2. **Get Pages:**
   - **Endpoint:** `GET /api/v1/pages`
   - **Response Data:** JSON array with all pages
     ```json
     [
       {
         "id": "page-id-1",
         "title": "Page 1",
         "content": "Content of Page 1",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       {
         "id": "page-id-2",
         "title": "Page 2",
         "content": "Content of Page 2",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       // ... additional pages
     ]
     ```

3. **Get Single Page:**
   - **Endpoint:** `GET /api/v1/pages/:id`
   - **Response Data:** JSON with details of the requested page
     ```json
     {
       "id": "page-id",
       "title": "Sample Page",
       "content": "This is a sample page content.",
       "userId": "user-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

4. **Update Page:**
   - **Endpoint:** `PATCH /api/v1/pages/:id`
   - **Request Body:** JSON with updated page details
     ```json
     {
       "title": "Updated Page Title",
       "content": "Updated page content."
     }
     ```
   - **Response Data:** JSON with updated page details
     ```json
     {
       "id": "page-id",
       "title": "Updated Page Title",
       "content": "Updated page content.",
       "userId": "user-id",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

5. **Delete Page:**
   - **Endpoint:** `DELETE /api/v1/pages/:id`
   - **Response Data:** JSON with a success message
     ```json
     {
       "message": "Page deleted successfully."
     }
     ```

6. **Get Pages by User:**
   - **Endpoint:** `GET /api/v1/pages/user`
   - **Response Data:** JSON array with pages associated with the authenticated user
     ```json
     [
       {
         "id": "page-id-1",
         "title": "Page 1",
         "content": "Content of Page 1",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       {
         "id": "page-id-2",
         "title": "Page 2",
         "content": "Content of Page 2",
         "userId": "user-id",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       // ... additional pages
     ]
     ```


### Subscriber API Endpoints (SubscribersRoutes)


1. **Add a Subscriber**
   - **Endpoint:** `POST /api/v1/subscribers`
   - **Request Data:**
     ```json
     {
       "email": "subscriber@example.com"
     }
     ```
   - **Response Data:**
     ```json
     {
       "id": "generated-uuid",
       "email": "subscriber@example.com",
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
     ```

2. **Send Email to Subscribers**
   - **Endpoint:** `POST /api/v1/subscribers/send`
   - **Request Data:**
     ```json
     {
       "subject": "Your Subject",
       "message": "Your Message"
     }
     ```
   - **Response Data:**
     ```json
     {
       "message": "Email sent successfully to subscribers."
     }
     ```

3. **Get Subscribers**
   - **Endpoint:** `GET /api/v1/subscribers`
   - **Response Data:**
     ```json
     [
       {
         "id": "subscriber-id-1",
         "email": "subscriber1@example.com",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       {
         "id": "subscriber-id-2",
         "email": "subscriber2@example.com",
         "createdAt": "timestamp",
         "updatedAt": "timestamp"
       },
       // ... other subscribers
     ]
     ```

4. **Delete a Subscriber**
   - **Endpoint:** `DELETE /api/v1/subscribers/:id`
   - **Response Data:**
     ```json
     {
       "message": "Subscriber deleted successfully."
     }
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
