# 🧠 Xeno CRM – AI-Powered Campaign Management App

## 📌 Overview

Xeno CRM is a mini customer relationship management (CRM) platform developed as part of the Xeno SDE Internship Assignment 2025. The platform enables:

- Customer segmentation based on custom rules
- AI-generated marketing messages
- Campaign delivery with performance tracking
- Google OAuth authentication

It is built using a modern MERN stack with AI integration through OpenRouter.

---

## 🚀 Local Setup Instructions

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/Hamir02/xeno-crm-frontend.git
cd xeno-crm-frontend

### 🔧 2. Install Dependencies

npm install

### 🔐 3. Add Environment Variables
Create a .env file in the root of your frontend project and add the following line:

REACT_APP_API_URL=https://xeno-crm-backend-zlmh.onrender.com


### ▶️ 4. Run the Development Server

Frontend (React.js)
   |
   |-- Login Page (Google OAuth)
   |-- Dashboard (Create + Send Campaign)
   |-- AI Integration (Generate message & summary)
   ↓
Backend (Node.js + Express)
   |
   |-- REST APIs (/api/campaigns, /api/ai, /api/send-campaign)
   |-- MongoDB Models (User, Campaign, Customer)
   ↓
MongoDB Atlas
   |
   |-- Stores all campaign data

External API:
   ↳ OpenRouter AI (for message + summary generation)


###  🤖 AI Tools and Technologies Used

 Tool/Service	Purpose
 React.js	Frontend UI
 Node.js + Express	Slope
 MongoDB + Mongoose	Database and models
 OpenRouter API	AI-generated messages and summaries
 Google OAuth	Authentication
 Vercel	Frontend hosting
 Render	Backend hosting

###📬 Contact
If Problem 

Name: [Hamir]

Email: [hamirchauhan.45@gmail.com]

LinkedIn: [http://www.linkedin.com/in/hamir-chauhan-31746a275]