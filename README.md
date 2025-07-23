# HairGrowth - Hair Loss Tracking Application

A comprehensive web application for tracking hair loss progress with React frontend and Node.js backend.

## 🏗️ Project Structure

```
HairGrowth/
├── frontend/          # React TypeScript application
├── backend/           # Node.js TypeScript API
├── package.json       # Root package.json with workspaces
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HairGrowth
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   This will install dependencies for:
   - Root workspace (concurrently for running both apps)
   - Backend (Express.js, TypeScript, etc.)
   - Frontend (React, Vite, TypeScript, etc.)

### Development

**Run both frontend and backend simultaneously:**
```bash
npm run dev
```

**Run only backend:**
```bash
npm run dev:backend
```

**Run only frontend:**
```bash
npm run dev:frontend
```

### Building

**Build both applications:**
```bash
npm run build
```

**Build only backend:**
```bash
npm run build:backend
```

**Build only frontend:**
```bash
npm run build:frontend
```

## 📦 Package Manager Setup

This project uses **npm workspaces** for managing multiple packages in a monorepo structure.

### Root Level (`/package.json`)
- Manages the overall project
- Defines workspaces for `frontend` and `backend`
- Contains scripts to run both applications
- Uses `concurrently` to run frontend and backend simultaneously

### Backend (`/backend/package.json`)
- Express.js server with TypeScript
- Authentication (JWT, bcrypt)
- File upload handling (Multer, AWS S3)
- Security middleware (Helmet, CORS)
- Development tools (Nodemon, ESLint, Jest)

### Frontend (`/frontend/package.json`)
- React 18 with TypeScript
- Vite for fast development and building
- Material-UI for components
- Redux Toolkit for state management
- React Router for navigation
- File upload with react-dropzone

## 🛠️ Available Scripts

### Root Level Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:backend` - Start only backend
- `npm run dev:frontend` - Start only frontend
- `npm run build` - Build both applications
- `npm run install:all` - Install all dependencies
- `npm run test` - Run tests for all workspaces
- `npm run lint` - Lint all workspaces
- `npm run clean` - Clean all build files and node_modules

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run test` - Run Jest tests
- `npm run lint` - Run ESLint

### Frontend Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run Vitest tests
- `npm run lint` - Run ESLint

## 🔧 Development Workflow

1. **Start Development:**
   ```bash
   npm run dev
   ```
   This will start:
   - Backend on `http://localhost:3000`
   - Frontend on `http://localhost:5173`

2. **Make Changes:**
   - Backend code in `/backend/src/`
   - Frontend code in `/frontend/src/`

3. **Testing:**
   ```bash
   npm run test
   ```

4. **Linting:**
   ```bash
   npm run lint
   ```

## 📁 Next Steps

After setting up the package managers, the next steps are:

1. **Backend Foundation:**
   - Set up Express.js server with TypeScript
   - Configure environment variables
   - Set up database connection

2. **Frontend Foundation:**
   - Set up React with TypeScript
   - Configure routing
   - Set up state management

3. **Authentication System:**
   - Implement JWT authentication
   - Create user registration/login

4. **AWS S3 Integration:**
   - Set up S3 bucket
   - Implement image upload functionality

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Backend default: 3000
   - Frontend default: 5173
   - Change ports in respective configuration files if needed

2. **Dependencies not installing:**
   ```bash
   npm run clean
   npm run install:all
   ```

3. **TypeScript errors:**
   - Ensure TypeScript is installed globally or locally
   - Check tsconfig.json files in both frontend and backend

## 📝 Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env):**
```
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=HairGrowth
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.