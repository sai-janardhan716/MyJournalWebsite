# MyJournalWebsite
MyJournal is a simple backend practice project built using Node.js, Express, and MySQL. It includes all essential backend features such as user authentication, CRUD operations, and route handling. The project demonstrates how a real-world backend system handles login, registration, and user-specific data.

---

# Features
- Authentication
- User registration
- User login with bcrypt password hashing
- Duplicate email validation
- LocalStorage used for session tracking
- Posts System
    - Create a new post
    - Fetch posts based on the logged-in user
    - View detailed post page
    - Delete a specific post
    - MySQL foreign key relationship between Users and Posts
- Database
    - users table for storing login details
    - posts table for storing user posts
    - Each post belongs to a user (userId as foreign key)

---

# Tech Stack
- Frontend
  - HTML
  - CSS
  - Bootstrap
  - JavaScript
- Backend
  - Node.js
  - Express.js
  - bcrypt
  - CORS
- Database
  - MySQL

---

# Folder Structure
```
MyJournalWebsite/
│
├── Backend/
│   ├── index.js
│   ├── package.json
│   └── node_modules/
│
├── Frontend/
│   ├── Login/
│   ├── Register/
│   ├── FeedPage/
│   ├── CreatePost/
│   └── DedicatedPage/
│
└── README.md
```
---

# API Endpoints

| Method |     Endpoint          |      Description      |
|--------|---------------------- |-----------------------|
| POST   | /registerUser         | Register new user     |
| POST   | /loginUser            | Login & return userId |
| POST   | /addPost              | Add a new post        |
| GET    | /fetchPosts/:userId   | Fetch user’s posts    |
| GET    | /getPost/:postId      | View a single post    |
| DELETE | /deletePost/:postId   | Delete a post         |

---

# What I Learned

- Building REST APIs with Express
- Connecting Node.js to MySQL
- Password hashing using bcrypt
- CRUD operations
- User-specific data filtering
- Handling sessions using localStorage
- Frontend–Backend communication using Fetch API
- Organizing a full-stack mini project

---

# Security
- Database credentials are stored securely in a .env file.
- .env is included in .gitignore to prevent credential leaks.

---

# How to Run
1) Install dependencies
```
cd Backend
npm install
```

2) Create .env inside Backend folder
```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=MyJournal
```

3️) Start the backend server
```
node index.js
```
or
```
nodemon index.js
```

4️) Open the frontend pages via Live Server or direct HTML file open.

---

# Future Improvements

1) JWT Authentication
2) Edit Post feature
3) Pagination
4) Image uploads
5) Cloud database integration

---

# Conclusion

This project helped me practice backend development with authentication, MySQL queries, CRUD functionality, and building a simple full-stack architecture.
It serves as a great foundation for learning real-world backend logic.
