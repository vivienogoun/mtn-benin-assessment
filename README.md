# README

The following documentation provides detailed instructions on how to set up and run the system.

## Prerequisites

- Node.js (version 20.x or later)
- npm (version 9.x or later)
- Docker (optional)
- Git
- Python (version 3.13 or later)
- Flask

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/vivienogoun/mtn-benin-assessment.git
   cd mtn-benin-assessment
   ```

2. Install the frontend dependencies:

   ```sh
   cd frontend
   npm install
   ```

3. Install the backend dependencies:
   ```sh
   cd ../backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

## Configuration

1. Create a `.env` file in the `frontend` directory and add the Flask API url. Refer to the `.env.example` file for the exact variable name:

   ```sh
   cp frontend/.env.example frontend/.env
   ```

2. Update the `.env` file with your Flask API url.

## Running the Application

### Using Docker

1. Build and run the Docker containers:

   ```sh
   docker-compose up --build
   ```

2. The frontend application will be available at `http://localhost` and the backend at `http://localhost:5000`.

### Without Docker

#### Running the Backend

1. Start the backend server:

   ```sh
   cd backend
   flask run
   ```

2. The backend will be available at `http://localhost:5000`.

#### Running the Frontend

1. Start the frontend application:

   ```sh
   cd frontend
   npm run build
   npm run start
   ```

2. The frontend will be available at `http://localhost:5173`.
