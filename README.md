# TripAgent - AI-Powered Travel Assistant

A multi-agent travel assistant built with CrewAI (Backend) and React + Vite (Frontend) that helps users search for flights and weather information for trip planning.

## 📁 Project Structure

```
2526_sdp8_tripagent/
├── backend/                 # Python CrewAI Backend
│   ├── agents/              # AI Agents (flight, weather)
│   ├── tasks/               # Task definitions
│   ├── tools/               # API tools
│   ├── llm/                 # LLM configurations (Groq, Gemini)
│   ├── context/             # Shared context management
│   └── test/                # Unit tests
├── frontend/                # React + Vite Frontend
│   ├── src/
│   │   ├── api/             # API integration
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS styles
│   └── ...
└── README.md
```

---

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download Link |
|------|---------|---------------|
| Node.js | v18.0.0 or higher | [nodejs.org](https://nodejs.org/) |
| Python | v3.10 or higher | [python.org](https://python.org/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| VS Code | Latest (Recommended) | [code.visualstudio.com](https://code.visualstudio.com/) |

---

## 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/2526_sdp8_tripagent.git
cd 2526_sdp8_tripagent
```

---

## 🐍 Step 2: Backend Setup (Python + CrewAI)

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

### 2.2 Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2.3 Install Dependencies

```bash
pip install -r requirements.txt
```

> If `requirements.txt` doesn't exist, install manually:
> ```bash
> pip install crewai crewai-tools python-dotenv groq google-generativeai fastapi uvicorn
> ```

### 2.4 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit the `.env` file and add your API keys:

```env
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
SERP_API_KEY=your_serp_api_key_here
```

### 2.5 Run Backend Server

```bash
# Using uvicorn (if FastAPI is set up)
uvicorn main:app --reload --port 8000

# Or run directly
python main.py
```

Backend will be available at: `http://localhost:8000`

---

## ⚛️ Step 3: Frontend Setup (React + Vite)

### 3.1 Navigate to Frontend Directory

Open a **new terminal** and run:

```bash
cd frontend
```

### 3.2 Install Node Dependencies

```bash
npm install
```

### 3.3 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=TripAgent
```

### 3.4 Run Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🛠️ Step 4: Creating the Frontend from Scratch

If the frontend folder doesn't exist, follow these steps:

### 4.1 Create Vite React Project

```bash
# From project root directory
npm create vite@latest frontend -- --template react

cd frontend
npm install
```

### 4.2 Install Additional Dependencies

```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# Styling (choose one)
npm install tailwindcss postcss autoprefixer
# OR
npm install styled-components
# OR
npm install @emotion/react @emotion/styled

# Icons
npm install lucide-react

# Date handling
npm install date-fns

# Form handling
npm install react-hook-form

# State management (optional)
npm install @tanstack/react-query
```

### 4.3 Initialize Tailwind CSS (Recommended)

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/styles/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📋 Step 5: Verify Installation

### Check Backend

```bash
# In backend directory with venv activated
python --version          # Should be 3.10+
pip list                  # Check installed packages
```

### Check Frontend

```bash
# In frontend directory
node --version            # Should be 18+
npm --version             # Should be 9+
npm list                  # Check installed packages
```

---

## 🏃 Running the Full Application

Open **two terminals**:

### Terminal 1 - Backend

```bash
cd backend
venv\Scripts\activate     # Windows
# source venv/bin/activate  # macOS/Linux
python main.py
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

---

## 📝 Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `python main.py` | Start the backend server |
| `pytest` | Run tests |
| `pip freeze > requirements.txt` | Update dependencies |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Windows - Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

#### 2. Module Not Found (Python)

```bash
pip install <missing-module>
```

#### 3. Node Modules Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

#### 4. CORS Issues

Ensure backend has CORS configured:

```python
# In backend main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 👥 Team Members

| Name | Role |
|------|------|
| Member 1 | Backend Developer |
| Member 2 | Frontend Developer |
| Member 3 | Full Stack Developer |

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

If you encounter any issues during setup, please:

1. Check the troubleshooting section above
2. Create an issue in the GitHub repository
3. Contact the team lead

---

**Happy Coding! 🚀**