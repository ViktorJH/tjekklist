# tjekklist
Demo: https://tjekklist.firebaseapp.com

# About
To-do list notes app based on Facebook React + Google Firebase. Log in with Google, Facebook, Github.

# Firestore rules
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId=**} {
      allow read, update, delete, create: if request.auth.uid == userId;
		}
    match /users/{userId}/notes/{document=**} {
      allow read, update, delete, create: if request.auth.uid == userId;
		}
  }
}
```
