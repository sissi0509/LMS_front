# Kambaz LMS — Full-Stack Learning Management System
*A course platform built with Next.js, React, Redux Toolkit, Node.js, Express, and MongoDB.*

## 🚀 Overview
Kambaz LMS is a full-stack learning management platform that supports courses, modules, assignments, quizzes.  
We built this project as part of our MSCS program at Northeastern University, focusing on realistic EdTech workflows, clean architecture, and production-ready design.

This is the **frontend** repository (Next.js). The backend lives here:  
👉 https://github.com/sissi0509/LMS_back

---

## ✨ Key Features

### 🔐 User Authentication
- Login/logout  
- Protected routes based on role (student / faculty)

### 📚 Course & Module Management
- Faculty can create courses and organize content into modules  
- Students can browse enrolled courses

### 📝 Assignments
- Faculty create assignments  
- Students submit text or file responses  
- Submissions are viewable by faculty

### 🧠 Quizzes & Question Management
Our quiz system is one of the most detailed features of the LMS, supporting the full workflow for both faculty and students.

#### For Faculty
- Create, edit, publish, unpublish, and delete quizzes  
- Configure rich quiz settings, including:
  - Shuffle answers  
  - Time limit  
  - Multiple attempts  
  - Access code  
  - Due date, available from/until dates  
  - One-question-at-a-time mode  
- Add questions of multiple types:
  - Multiple Choice  
  - True/False  
  - Fill-in-the-Blank  
- Edit questions inline with dynamic tools:
  - Add/remove choices (MCQ)  
  - Mark correct answer(s)  
  - Define acceptable answers (Fill-in-the-Blank)  
- Preview the quiz exactly as students would see it using `...?preview=1`

#### For Students
- View published quizzes for enrolled courses  
- Enter access code when required  
- Take quizzes with one or more attempts depending on settings  
- Submit answers and receive automatic grading  
- View their most recent attempt, with correct/incorrect answers clearly highlighted  
- Quiz order and answer choices may be randomized depending on quiz settings  

#### Quiz Attempt System
- Attempts are created when a quiz begins   
- Support for multiple attempts, up to the quiz’s configured limit  
- LocalStorage fallback is used in preview mode for safety  
- Faculty preview attempts are not stored in the database  

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React**
- **Redux Toolkit**
- **React Bootstrap**

### Backend (paired repo)
- Node.js / Express  
- MongoDB / Mongoose  
- Cookie-based sessions  

---

## 📁 Project Structure (Frontend)

```
/app
  /Courses
    /[cid]
      /Quizzes
        /[qid]
          TakePage.tsx
          Questions.tsx
          OneQuestion.tsx
  /api
/components
/store
/utils
```

---

## ▶️ Running the Project Locally

### 1. Clone the repo
git clone https://github.com/sissi0509/LMS_front
cd LMS_front

### 2. Install dependencies
npm install

### 3. Environment Variables  
Create a `.env.local` file:

NEXT_PUBLIC_FIREBASE_API_KEY=...
BACKEND_API_URL=...

### 4. Start the development server
npm run dev

The app will run at:  
**http://localhost:3000**

---

## 🌱 Future Improvements
- Autosave + auto-submit timer for quizzes  
- Analytics dashboard for faculty    
- Rich-text question editor  
- Accessibility improvements (WCAG)

---

## 🤝 Acknowledgments
This project was developed by **Xi Zhao** and **Eunjin Lee** as part of the Northeastern University MSCS program.

---
