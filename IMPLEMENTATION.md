# UMI Supervisor Portal Implementation

## Overview
This document describes the implementation of TanStack Query for authentication and the creation of supervisor routes and controllers in the UMI Supervisor Portal.

## TanStack Query Implementation

### 1. Setup
- **Query Client**: Configured in `src/utils/tanstack.js`
- **Provider**: Added to `src/main.jsx` with QueryClientProvider
- **API Utilities**: Created `src/utils/apiRequestUrl.js` for HTTP requests

### 2. Authentication Context
- **Location**: `src/context/AuthContext.jsx`
- **Features**:
  - User state management
  - Login/logout functions
  - Token storage in localStorage
  - Protected route handling

### 3. Store Structure (Matching Management Client)
- **Location**: `src/store/tanstackStore/services/`
- **Files**:
  - `api.js`: API service functions
  - `queries.js`: TanStack Query hooks

#### API Services (`api.js`)
- `loginSupervisor`: Authenticate supervisor
- `getSupervisorProfile`: Get user profile
- `updateSupervisorProfile`: Update profile
- `changePassword`: Change password
- `logoutSupervisor`: Logout
- `getAssignedStudents`: Get assigned students
- `getStudentDetails`: Get student details
- `updateStudentProgress`: Update student progress
- `getStudentProposals`: Get student proposals
- `reviewProposal`: Review proposals
- `getDashboardStats`: Get dashboard statistics
- `getNotifications`: Get notifications

#### Query Hooks (`queries.js`)
- `useLoginSupervisor`: Login mutation hook
- `useGetSupervisorProfile`: Profile query hook
- `useUpdateSupervisorProfile`: Profile update mutation
- `useChangePassword`: Password change mutation
- `useLogoutSupervisor`: Logout mutation
- `useGetAssignedStudents`: Students query hook
- `useGetStudentDetails`: Student details query hook
- `useUpdateStudentProgress`: Progress update mutation
- `useGetStudentProposals`: Proposals query hook
- `useReviewProposal`: Proposal review mutation
- `useGetDashboardStats`: Dashboard stats query hook
- `useGetNotifications`: Notifications query hook

### 4. Login Component
- **Location**: `src/pages/0.auth/Login.jsx`
- **Features**:
  - Uses `useLoginSupervisor` hook
  - Form validation
  - Loading states
  - Error handling with toast notifications
  - Password visibility toggle

### 5. Dashboard Component
- **Location**: `src/pages/1.Dashboard/Dashboard.jsx`
- **Features**:
  - Uses `useGetSupervisorProfile` and `useGetDashboardStats` hooks
  - Real-time data display
  - Loading states
  - Logout functionality

## Server Implementation

### 1. Supervisor Routes
- **Location**: `../umi-server/src/api/v1/routes/supervisorRoutes.js`
- **Endpoints**:
  - `POST /supervisor/login`: Supervisor authentication
  - `POST /supervisor/logout`: Logout
  - `GET /supervisor/profile`: Get profile
  - `PUT /supervisor/profile`: Update profile
  - `PUT /supervisor/password`: Change password
  - `GET /supervisor/students`: Get assigned students
  - `GET /supervisor/students/:studentId`: Get student details
  - `PUT /supervisor/students/:studentId/progress`: Update student progress
  - `GET /supervisor/students/:studentId/proposals`: Get student proposals
  - `PUT /supervisor/proposals/:proposalId/review`: Review proposal
  - `GET /supervisor/dashboard/stats`: Get dashboard statistics
  - `GET /supervisor/notifications`: Get notifications

### 2. Supervisor Controller
- **Location**: `../umi-server/src/api/v1/controllers/supervisorController.js`
- **Functions**:
  - `loginSupervisor`: Handle supervisor login with JWT
  - `getSupervisorProfile`: Retrieve supervisor profile
  - `updateSupervisorProfile`: Update supervisor information
  - `changePassword`: Change supervisor password
  - `logoutSupervisor`: Handle logout
  - `getAssignedStudents`: Get students assigned to supervisor
  - `getStudentDetails`: Get detailed student information
  - `updateStudentProgress`: Update student progress status
  - `getStudentProposals`: Get student proposals
  - `reviewProposal`: Review and update proposal status
  - `getDashboardStats`: Get dashboard statistics
  - `getNotifications`: Get supervisor notifications

### 3. Route Integration
- **Location**: `../umi-server/src/api/v1/index.mjs`
- Added supervisor routes to main API router

## Features Implemented

### 1. Authentication
- ✅ JWT-based authentication
- ✅ Role-based access control (SUPERVISOR role)
- ✅ Remember me functionality
- ✅ Password validation
- ✅ Token storage and management

### 2. Dashboard
- ✅ Real-time statistics
- ✅ Assigned students count
- ✅ Recent proposals
- ✅ Profile information display
- ✅ Logout functionality

### 3. Error Handling
- ✅ API error handling with custom messages
- ✅ Toast notifications for user feedback
- ✅ Loading states
- ✅ Form validation

### 4. Security
- ✅ Protected routes
- ✅ Token-based authentication
- ✅ Role verification
- ✅ Password hashing

### 5. TanStack Query Integration
- ✅ Custom query hooks for all operations
- ✅ Automatic cache invalidation
- ✅ Optimistic updates
- ✅ Error handling
- ✅ Loading states

## Usage

### Starting the Application
1. Start the server: `cd ../umi-server && npm start`
2. Start the supervisor portal: `npm run dev`

### Login Credentials
- Use supervisor credentials with role "SUPERVISOR"
- The system validates email/password against the database
- JWT token is generated and stored for session management

### API Endpoints
All supervisor endpoints are prefixed with `/api/v1/supervisor/`

### Using Query Hooks
```javascript
// Example usage in components
import { useGetSupervisorProfile, useUpdateSupervisorProfile } from '../../store/tanstackStore/services/queries';

const MyComponent = () => {
  const { data: profile, isLoading } = useGetSupervisorProfile();
  const updateProfile = useUpdateSupervisorProfile();
  
  // The hook automatically handles caching, loading states, and error handling
};
```

## Dependencies Added
- `@tanstack/react-query`: For data fetching and caching
- `sonner`: For toast notifications
- `lucide-react`: For icons

## Folder Structure
```
src/
├── store/
│   └── tanstackStore/
│       └── services/
│           ├── api.js          # API service functions
│           └── queries.js      # TanStack Query hooks
├── utils/
│   ├── tanstack.js            # Query client configuration
│   └── apiRequestUrl.js       # Axios configuration
├── context/
│   └── AuthContext.jsx        # Authentication context
└── pages/
    ├── 0.auth/
    │   └── Login.jsx          # Login component
    └── 1.Dashboard/
        └── Dashboard.jsx      # Dashboard component
```

## Next Steps
1. Implement student management features
2. Add proposal review functionality
3. Implement real-time notifications
4. Add file upload capabilities
5. Implement advanced filtering and search 