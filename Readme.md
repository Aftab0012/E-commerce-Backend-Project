# E-Commerce API Documentation

Welcome to the E-Commerce API! This API provides endpoints to manage categories, products, user authentication, and shopping cart functionalities for an e-commerce platform.

## Features

- User registration and login with JWT authentication
- Get list of categories and products
- Add products to the shopping cart
- Place an order (Not yet implemented)
- View order history (Not yet implemented)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system
- MongoDB server running

## Getting Started

1. Clone the repository:
2. Install dependencies using npm install.
3. Set up your MongoDB database and provide the connection URI in the .env file.
4. Set environment variables for other configurations if needed.
5. Start the server using npm start.

## API Endpoints

User Authentication
POST /auth/register - Register a new user
POST /auth/login - Log in an existing user

## Categories

GET /categories - Get a list of all categories

## Products

GET /productapis/products/:categoryId - Get a list of products by category ID
GET /productapis/products/:productId - Get product details by product ID

## Shopping Cart

POST /cart/add/:productId - Add a product to the shopping cart
Order (Not Yet Implemented)
POST /order/place - Place an order
Order History (Not Yet Implemented)
GET /order/history - Get order history for the logged-in user

## Sending API Requests

You can use Postman or any other API client to send requests to the endpoints mentioned above. Make sure to set the request type, URL, and provide the necessary parameters or request body as required by each endpoint.

For protected routes (e.g., categories, products, cart), you need to include the JWT token in the request header. Obtain the token by logging in or registering a user and use it as follows:

1. Create a new header in Postman:

- Key: Authorization
- Value: Bearer {your_jwt_token}

2. Send the request to the desired protected endpoint.

## Future Enhancements

- Implement the /order/place endpoint to place orders.
- Implement the /order/history endpoint to view order history.

### Feel free to contribute to the project by adding new features or improvements!
