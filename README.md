# CA_backendassignment_PiyushWaghmarefinal
# Project Name Readme



## Why Fastify after using express?

Fastify is a high-performance web framework for Node.js that is designed to be blazingly fast and efficient. In the context of finance-related products, speed and performance are critical factors. Fastify's lightweight nature and extensive optimizations make it an ideal choice to handle high volumes of requests and ensure low response times. This translates to improved user experience and better scalability for our applications.

## MongoDB Atlas Cloud

Initially, I encountered issues with our local MongoDB database, which led me to explore more robust and scalable solutions. MongoDB Atlas cloud service provides a managed database-as-a-service (DBaaS) platform, offering automated backups, scaling, and high availability. By migrating to MongoDB Atlas, we ensure our database is reliable, secure, and can handle the demands of our finance-related applications.

## Folder Structure

This project is organized into multiple folders, each containing the same API but implemented using different frameworks. The main advantage of this approach is that we can compare the performance and features of Fastify and Express directly and make informed decisions based on our project requirements.

- `fastify-api`: This folder contains the API implemented using the Fastify framework.
- `express-api`: This folder contains the API implemented using the Express framework.

## Installation and Setup

To run the API for both Fastify and Express implementations, follow these steps:

1. Clone the repository and install all necessary packages for fastify and express mongoose
2.  Configure MongoDB Atlas connection string:

- For the Fastify implementation, update the `fastify-api/.env` file with your MongoDB Atlas connection string:

  ```
  MONGO_URI=<your_mongodb_atlas_connection_string>
  ```

- For the Express implementation, update the `express-api/.env` file with your MongoDB Atlas connection string:

  ```
  MONGO_URI=<your_mongodb_atlas_connection_string>
  ```

3. Start the API server: once packages are installed type ``` node app<1/2>.js```
4. use POSTman to check for API endpoints and scenarios



