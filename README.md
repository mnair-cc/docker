# [PoC] Dockerized Full-Stack Application

This repository contains a proof of concept (PoC) for a full-stack application that is fully dockerized. It consists of a Next.js client, a Nest.js server, an audit microservice (Nest.js), PostgreSQL as the database, and NATS streaming for messaging. The project demonstrates how these components can interact within a containerized environment using Docker Compose.

## Table of Contents

- [\[PoC\] Dockerized Full-Stack Application](#poc-dockerized-full-stack-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Technologies](#technologies)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
  - [How to Run](#how-to-run)
  - [Seed data](#seed-data)
    - [Option 1: Using the seed script](#option-1-using-the-seed-script)
    - [Option 2: Using CURL](#option-2-using-curl)
  - [Available Services](#available-services)
  - [Testing and Development](#testing-and-development)
  - [Troubleshooting](#troubleshooting)

## Overview

This project is a **Proof of Concept (PoC)** for demonstrating how to dockerize and orchestrate a full-stack application with different components, including:

- **Next.js (Client)**: The frontend application built with React. This app was created using the [Next.js starter template for dashboards](https://github.com/vercel/next-learn/tree/main/dashboard/starter-example).
- **Nest.js (Server)**: The backend REST API that handles authentication and interacts with the database.
- **Audit Microservice**: A microservice built with Nest.js that listens for login events and logs them into the database using NATS streaming.
- **PostgreSQL (Database)**: The relational database where user data and audit logs are stored.
- **NATS (Messaging System)**: A messaging system that facilitates communication between the server and the audit microservice.

## Technologies

- **Next.js (React)** - Client-side application.
- **Nest.js** - Backend REST API and microservices.
- **PostgreSQL** - Database to persist data.
- **NATS Streaming** - Message broker for event-driven architecture.
- **Docker** - Containerization.
- **Docker Compose** - Orchestrates multiple containers.

## Prerequisites

Before running this project, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started) (v20+ recommended)
- [Docker Compose](https://docs.docker.com/compose/) (v2+ recommended)

## Configuration

### Environment Variables

You need to configure environment variables in a `.env` file. Below is an example of the variables needed:

Create a `.env` file at the root of the project with the following content:

```bash
# DB
DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASS=mypassword
DB_NAME=mydb

# Backend
BACKEND_PORT=3001
BACKEND_URL=http://localhost:3001

# Frontend
FRONTEND_PORT=3000
FRONTEND_URL=http://localhost:3000

# Auth
JWT_SECRET=my_secret_key
SALT_ROUNDS=10

# NATS
NATS_CLUSTER_ID=my-cluster
NATS_URL=nats://localhost:4222
NATS_PORT=4222
```

Make sure to adjust any credentials or configuration as needed.

## How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/tiesch/fullstack-dockerized-app.git
    cd fullstack-dockerized-app
    ```

2. Ensure Docker is running:
   Make sure Docker Desktop (or your Docker engine) is up and running.

3. Build and run the Docker containers:
   You can start all the services by running the following command:
    ```bash
    docker-compose up --build
    ```
   This will build the images for all the services and start the containers. The --build flag ensures that the images are rebuilt if any changes have been made to the Dockerfiles.

4. Access the applications:
- Client (Next.js): Open your browser and go to http://localhost:3000
- Server (Nest.js): The backend API will be running at http://localhost:3001
- NATS: The NATS server is available on port 4222 for message handling.
- Audit Service: The audit service runs in the background and listens for NATS events.
- PostgreSQL Database: PostgreSQL is running on port 5432.


## Seed data

To add a sample user to the database, you have two options: running a seed script directly from the server or using a curl command to register a user via the API.

### Option 1: Using the seed script

You can seed the database by running the following command, which will create a default user in the database.

1. Make sure the server is running.
2. Navigate to the /server directory.
3. Run the following command:
    ```bash
    pnpm run seed
    ```
    This will execute a script to seed the database with initial data. (email=admin@local, password=1234)

### Option 2: Using CURL

Alternatively, you can manually register a user via the API by sending a POST request using curl.

1. Make sure the server is running on localhost:3001.
2. Execute the following curl command to create a user with the name John:
    ```bash
    curl --location 'localhost:3001/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "password": "1234",
        "role": "admin"
    }'
    ```
    This command will create a user with the role of “admin” in the database.

## Available Services

- Client (Next.js): The frontend that interacts with the backend to authenticate users and perform actions.

  URL: http://localhost:3000

- Server (Nest.js): The backend API that manages user authentication and interaction with the database.

  URL: http://localhost:3001

- Audit Microservice: The microservice that logs login events by subscribing to the NATS server.

- PostgreSQL Database: The relational database where data is persisted.

- NATS Streaming: The messaging broker that facilitates communication between the backend and the microservices.

## Testing and Development

To make changes to the project for development:

1. Edit the code in the client, server, or audit-service directories.

2. Use docker-compose down to stop the containers and docker-compose up --build to rebuild the images and start them again.

3. Logs for each service can be viewed using:
    ```bash
    docker-compose logs -f [service-name]
    ```
   Replace [service-name] with client, server, audit-service, nats-server, or db to view logs for a specific service.


## Troubleshooting

- Database loses data after restart: Ensure that Docker volumes are configured correctly for PostgreSQL persistence.

- Connection issues between services: Make sure services are using the correct names as defined in the docker-compose.yml. Ensure that all services are on the same network.

- CORS errors: Check that the CORS_ORIGIN variable is correctly set in the .env file and that the client URL is properly configured in the backend.

If you encounter any issues or need further assistance, feel free to open an issue or contact the maintainers of this repository.