# 📌 Secure Image Upload & Management System  

## 🚀 Overview  
This project is a **secure image upload and management system** with **JWT authentication**, **AWS S3 for storage**, and **Gemini AI for image analysis**.  

### 🔹 Features  
- ✅ **User authentication** using JWT  
- ✅ **Upload images** securely to **AWS S3**  
- ✅ **Analyze images** with **Google Gemini AI**  
- ✅ **Store metadata** in **PostgreSQL (Neon)**  
- ✅ **Secure API** with Flask & React frontend  

---

## 🛠 Tech Stack  

| Technology  | Description |
|-------------|------------|
| **Frontend** | Vite with TypeScript & React |
| **Backend** | Flask (Python) |
| **Database** | PostgreSQL (Neon) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Storage** | Amazon S3 |
| **AI Integration** | Google Gemini AI |
| **Deployment** | Render (backend), Vercel (frontend) |

---

## 🔑 Authentication Flow  
1️⃣ **User registers** → Password stored securely (hashed).  
2️⃣ **User logs in** → JWT token generated & returned.  
3️⃣ **Protected routes** require JWT in **Authorization: Bearer <token>** header.  

---

## 📂 Image Upload & Storage  
1️⃣ **User uploads an image** → Sent to Flask backend.  
2️⃣ **Flask uploads it to AWS S3** → Stores **image URL** in PostgreSQL.  
3️⃣ **Image URL is returned** → Can be accessed securely.  

---

## 🧠 Image Analysis with Gemini AI  
1️⃣ **User uploads an image**.  
2️⃣ **Flask sends the image URL to Google Gemini API**.  
3️⃣ **Gemini AI generates a description** and returns results.  

---

## 🔧 Setup Instructions  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Irshad-Ahmaed/Aizen-Assignment.git
cd Aizen-Assignment
python -m venv venv
source venv/Scripts/activate  # On Windows
pip install -r requirements.txt
```
### Create .env file
- SECRET_KEY=your_secret_key
- JWT_SECRET_KEY=your_jwt_secret_key
- DATABASE_URL=postgresql://your_user:your_password@your_neon_db_url/db_name
- S3_BUCKET_NAME=your_s3_bucket
- S3_REGION=your_s3_region
- AWS_ACCESS_KEY_ID=your_aws_access_key
- AWS_SECRET_ACCESS_KEY=your_aws_secret
- GEMINI_API_KEY=your_gemini_api_key

### Run the backend
```bash
flask db upgrade  # Apply database migrations
flask run
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
### **1️⃣ Authentication**  
- POST /auth/register → Register a new user

- POST /auth/login → Login & receive JWT token

### **2️⃣ Image Management**  
- POST /images/upload → Upload an image + Analyze image using Gemini AI

- GET /images → Get all user images