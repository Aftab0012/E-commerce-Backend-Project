# E-Commerce API Documentation

Welcome to the E-Commerce API! This API provides endpoints to manage categories, products, user authentication, and shopping cart functionalities for an e-commerce platform.

## Features

- User registration and login with JWT authentication
- Get list of categories and products
- Add products to the shopping cart
- Place an order
- View order history
- View order details

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

## It starts on http://localhost:3000

## API Endpoints

### User Authentication

## Sending API Requests

You can use Postman or any other API client to send requests to the endpoints mentioned above. Make sure to set the request type, URL, and provide the necessary parameters or request body as required by each endpoint.

For protected routes (e.g., categories, products, cart), you need to include the JWT token in the request header. Obtain the token by logging in or registering a user and use it as follows:

- Create a new header in Postman:

1. Key: Authorization
2. Value: Bearer Token = {your_jwt_token}

### Send the request to the desired protected endpoint.

- POST /auth/register - Register a new user

```
{
  "username": "example_username",
  "password": "example_password"
}

```

- POST /auth/login - Log in an existing user

```
{
  "username": "example_username",
  "password": "example_password"
}

```

## Categories

GET /categories - Get a list of all categories

```
return sjson of all available categories

```

POST /categories/add - add categories to database

```
//add this in JSON req body in postman to send request to server
name: {
    type: String,
    required: true,
  },

```

## Products

- GET /productDetails/products/:categoryId - Get a list of products by category ID

```
return json of product details by category id

```

- GET /productDetails/products/:productId - Get product details by product ID

```
return json of product details

```

- POST /productDetails/products/add - Add a new product

```
//add this in JSON req body in postman to send request to server
title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

```

## Shopping Cart

- POST /cart/add/:productId - Add a product to the shopping cart

```
// Response will look like this after you add the product in cart
[
    {
        "productId": "64f7153f615ac560168f0d53",
        "quantity": 2,
        "_id": "64f7166b615ac560168f0d5a"
    }
]
```

- POST /remove/:productId this route used to remove product from cart

```
it takes the product \_id and removes it from logged in users cart

```

- GET /cart/ get list of all cart items

```
it returns JSON list of all cart items available in cart

    {
        "_id": "64f7166b615ac560168f0d59",
        "user": "64f711ad10782bfb815c243d",
        "cart": [
            {
                "productId": "64f7153f615ac560168f0d53",
                "quantity": 2,
                "_id": "64f7166b615ac560168f0d5a"
            },
            {
                "productId": "64cf9150ac25736b4c0f5f10",
                "quantity": 1,
                "_id": "64f71751615ac560168f0d65"
            }
        ],
        "__v": 1
    }
]
```

## Order Placement

- POST /order/placeorder - Place an order

```

  <!-- This post request uses logged in users id to find userCart and add it to the order schamas products field  -->
  <!-- This post request uses logged in users id to add user and products value  -->

user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User", // Reference to the User model
required: true,
},
products: [
{
productId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Product", // Reference to the Product model
required: true,
},
quantity: {
type: Number,
required: true,
},
},
],
orderDate: {
type: Date,
default: Date.now,
},

```

## Order History

- GET /order/orderhistory - get order history

```

it check and finds the user by its useId in order schema and return the placed orders history

```

## Order Details

- GET /order/orderdetails - get order details

```

it takes the order \_id of specific order and returns the order details

```
