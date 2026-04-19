# NIGRANI — Firebase Implementation Roadmap

This document provides a step-by-step guide to transitioning the NIGRANI project from a mock prototype to a live, production-ready application using Google Firebase.

---

## 1. Prerequisites (Setup)
Before writing any code, we must complete these steps in the Firebase Console:
1.  **Project Creation**: Create a new project at [console.firebase.google.com](https://console.firebase.google.com).
2.  **Authentication**: Enable "Email/Password" sign-in provider.
3.  **Firestore Database**: Initialize a new database in "Production Mode."
4.  **Storage**: Initialize a storage bucket for issue photos.
5.  **Config**: Obtain the `firebaseConfig` object (API Keys) and add them to a `.env` file in our project.

---

## 2. Technical Architecture (The 4 Phases)

### Phase 1: Authentication & User Roles
We will replace `authStore.js` with real Firebase logic.
- **Login/Signup**: Use `createUserWithEmailAndPassword`.
- **User Profiles**: Every time a user signs up, a document is created in the `users` collection in Firestore with their `role` (Citizen, Contractor, or Admin).
- **Session Persistence**: Use `onAuthStateChanged` to keep users logged in across refreshes.

### Phase 2: Firestore Migration (The "Live" Data)
We will refactor `complaintStore.js` to act as a real-time listener.
- **Fetching**: Use `onSnapshot` so that reports appear instantly on the map for all users.
- **Reporting**: Reports are saved to the `complaints` collection with real coordinates captured from the browser's GPS.
- **Filtering**: Use Firestore queries to separate "My Issues" from global city issues.

### Phase 3: Firebase Storage (The Evidence)
Transition from local image previews to cloud storage.
- **Upload**: When a citizen reports an issue, the file is compressed and uploaded to `images/complaints/{id}.jpg`.
- **URL Storage**: The resulting URL is saved inside the Firestore document so others can see the photographic proof.

### Phase 4: Admin & Contractor Rules
This is where the "Real" app comes alive.
- **Security Rules**: We will write Cloud Security Rules to enforce:
    - Citizens: Can only edit their own reports.
    - Contractors: Can only update the status of complaints assigned to them.
    - Admins: Can view all budgets and contractor ratings.

---

## 3. Data Structure (NoSQL Collections)

### `users` (Collection)
```json
{
  "uid": "USER_ID",
  "name": "Ankit Sharma",
  "role": "citizen | contractor | admin",
  "ward": "Ward 14 - Deccan",
  "reputation": 85
}
```

### `complaints` (Collection)
```json
{
  "id": "NIG-XXXX",
  "userId": "USER_ID",
  "category": "road_damage",
  "title": "Severe pothole",
  "location": { "lat": 18.2, "lng": 73.1 },
  "status": "pending | assigned | resolved",
  "photos": ["URL1", "URL2"],
  "assignment": {
    "contractorId": "C_ID",
    "budget": 50000,
    "deadline": "2025-07-01"
  }
}
```

---

## 4. Next Steps
1.  **Install Dependencies**: `npm install firebase`
2.  **Config Setup**: Create `src/firebase.js` to initialize the app.
3.  **Auth Refactor**: Implement the signup flow with role selection.
4.  **Reporting Refactor**: Connect the camera/location to Firestore.

---

**Do you have your Firebase API Keys ready, or should I help you set up the project structure first?**
