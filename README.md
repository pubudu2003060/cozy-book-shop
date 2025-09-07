# CozyBookshop 📚🛒

A secure and modern online bookstore built with the MERN stack, featuring user authentication via Auth0 (OIDC), book search, shopping cart, order management, and profile handling.

## ✨ Features

- 🔐 **Secure Authentication**: Integrated with Auth0 OIDC (OpenID Connect) for reliable login/signup
- 📚 **Book Search**: Browse and search books easily
- 🛒 **Shopping Cart**: Add/remove books to cart and manage your selections
- 💳 **Order Management**: Place orders and view order history
- 👤 **Profile Management**: Update and manage personal user data
- ⚡ **Modern Security**: Auth0 API, JWT validation, secure cookie handling, role-based access
- 📱 **Responsive UI**: Optimized for desktop, tablet, and mobile devices
- 🚀 **MERN Stack**: React.js frontend, Node.js + Express backend, MongoDB database

## 🛠️ Tech Stack

| Component      | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React.js, Vite               |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB (Atlas)              |
| Authentication | Auth0 (OIDC + JWT)           |
| Email Service  | Nodemailer (Gmail App Pass)  |

## 🚀 Quick Start

### Prerequisites

- [Node.js >= 18.x](https://nodejs.org/en/download/)
- [MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas)
- [Auth0 Account](https://auth0.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pubudu2003060/cozy-book-shop
   cd cozy-book-shop
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

#### Backend .env
```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string

# Auth0 API
AUDIENCE=https://your-api-identifier
ISSUREBASEURL=https://your-tenant-region.auth0.com/
TOKENSIGNINALG=RS256

# Email
GOOGLE_APP_PASSWORD=your-google-app-password
EMAIL=your-email@gmail.com
```

#### Frontend .env
```env
VITE_DOMAIN=your-tenant-region.auth0.com
VITE_CLIENTID=your-auth0-client-id
VITE_AUDIENCE=your-auth0-audience
```

⚠️ **Do not commit .env files** — add them to `.gitignore`.

### Running Locally

1. **Run with Concurrent library**
   In the root directory, add backend .env file and run bellow command
   ```bash
   npm install
   npm run dev
   ```
   → App available at https://localhost:5173

3. **Start backend**
   ```bash
   cd backend
   npm run dev
   ```
   → API available at https://localhost:5000

4. **Start frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   → App available at https://localhost:5173

## 🔑 Setting Up Auth0

You must configure both a SPA and an API in Auth0.

### Frontend (SPA)
1. Go to **Applications** → **Create Single Page Application**
2. Configure the following settings:
   - **Allowed Callback URLs** → `https://localhost:5173`
   - **Allowed Logout URLs** → `https://localhost:5173`
   - **Allowed Web Origins** → `https://localhost:5173`

### Backend (API)
1. Go to **APIs** → **Create API**
2. Configure the following settings:
   - **Identifier** → e.g., `https://localhost:5000` (used as AUDIENCE)
   - **Signing Algorithm** → `RS256`

### 🔒 HTTPS Certificate Setup for Chrome
To avoid SSL certificate warnings in Chrome when using localhost with HTTPS:

1. **Open Chrome Certificate Manager**
   - Navigate to `chrome://certificate-manager/localcerts/usercerts` in your Chrome browser

2. **Import Certificates**
   - Click **Import** button
   - Import the following certificate files:
     - `backend/certs/localhost.pem` (for backend HTTPS)
     - `frontend/certs/localhost.pem` (for frontend HTTPS)

3. **Trust Certificates**
   - After importing, mark both certificates as trusted for localhost connections
   - Restart Chrome to ensure changes take effect

⚠️ **Note**: These certificates should only be used for local development. Never use self-signed certificates in production.
