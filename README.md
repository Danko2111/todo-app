# ToDo App

## Requirements

- Node.js LTS (>v22.x)

## Installation

1. **Clone the Repository**

   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Client Dependancies**

   ```sh
   cd client
   npm install
   ```

3. **Install Server Dependancies**

   ```sh
   cd ../server
   npm install
   ``
   ```

4. **Configure Environment Variables**
   Both the client and server directories contain a .env.sample file. Copy these files to create your own .env file in each directory, and fill in the required environment variables.

   For example, in each directory run:

   ```sh
   cp .env.sample .env
   ```

5. **Start the Applications**

   - To start the client:

   ```sh
   cd client
   npm start
   ```

   - To start the server:

   ```sh
   cd server
   npm start
   ```
