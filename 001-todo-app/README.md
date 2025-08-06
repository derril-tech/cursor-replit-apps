# ✅ Smart To-Do App

🎯 **An AI-powered full-stack productivity app** built using Next.js, Firebase, Tailwind CSS — developed with Cursor AI, Replit, and GitHub in sync.

🧠 This project demonstrates the modern 2025 AI-assisted developer workflow: coding with Claude in Cursor, deploying via Replit, syncing with GitHub, and going live with Vercel.

---

## 🌐 Live Demo

👉 [**View Live App**](https://cursor-replit-apps.vercel.app/)  
_Deployed on Vercel – login required to test full functionality_

---

## 📦 Features

- ✅ **Google Sign-In**
- 📄 **Create / Read / Update / Delete tasks**
- 🔄 **Live Firestore sync**
- 💾 **Persistent data across sessions**
- 📱 **Responsive Tailwind design**
- ⚡ **Fast AI-generated frontend via [v0.dev](https://v0.dev)**

---

## 🚀 Tech Stack

| Layer          | Tool/Tech                           |
|----------------|-------------------------------------|
| Frontend       | Next.js 14 (App Router)             |
| Styling        | Tailwind CSS                        |
| State / DB     | Firebase Firestore + Auth           |
| Deployment     | Vercel (Frontend)                   |
| AI Assistance  | Cursor AI + Claude + v0.dev         |
| Collaboration  | Git + GitHub + Replit               |

---

## 🤖 AI Dev Workflow Powered By

- [`v0.dev`](https://v0.dev): for React/Tailwind code generation
- [`Cursor`](https://www.cursor.sh): full AI developer IDE
- `.cursor-rules`: local AI assistant behavior rules (not public)
- Claude: for custom prompt-based refactoring
- Replit: for testing, secrets management, and SSH sync

---

## 🧠 Project Purpose

This app is part of a **multi-phase AI developer bootcamp**, showing how to:

- Use AI to rapidly scaffold and build real-world apps
- Learn modern full-stack development with AI in the loop
- Connect code editors (Cursor), platforms (Replit), and cloud services (Firebase, Vercel)

---

## 📁 File Structure

```bash
todo-app/
├── app/                   # Next.js App Router pages
├── components/            # ToDoList component
├── lib/                   # Firebase config
├── public/                # Static assets
├── .cursor-rules          # (ignored) AI assistant logic
├── .env.example           # Required env variables
├── package.json           # Project config
└── tailwind.config.ts     # Tailwind setup

```
## 🛠️ Getting Started

```bash
git clone https://github.com/derril-tech/cursor-replit-apps
cd cursor-replit-apps/todo-app
npm install
cp .env.example .env  # Fill in your Firebase config
npm run dev

```
---

## 🔐 Required ENV Variables

| Name                                 | Description                |
| ------------------------------------ | -------------------------- |
| NEXT\_PUBLIC\_FIREBASE\_API\_KEY     | From Firebase              |
| NEXT\_PUBLIC\_FIREBASE\_AUTH\_DOMAIN | `your-app.firebaseapp.com` |
| NEXT\_PUBLIC\_FIREBASE\_PROJECT\_ID  | Project ID                 |
| NEXT\_PUBLIC\_FIREBASE\_APP\_ID      | App ID                     |

---

©️ Author
🧑‍💻 Derril Filemon — AI Engineer | Full-Stack Developer | Replit + Cursor Specialist
🌍 Currently building multiple apps with LangChain, Claude, and full AI workflow tools.