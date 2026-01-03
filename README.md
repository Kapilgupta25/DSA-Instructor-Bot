# 🤖 DSA Instructor Bot

**DSA Instructor Bot** is an interactive **AI-powered chatbot** that helps users **learn and understand Data Structures & Algorithms (DSA)** concepts in the **simplest possible way**.  
Built using **React** and **Tailwind CSS**, it leverages **Google’s Gemini 2.5 Flash** model to provide intelligent and topic-restricted responses.  

🔗 **Live Demo:** *(https://dsa-instructor-bot.vercel.app/)*

---

## 🚀 Features

- 🧠 **DSA-Focused Chatbot** – Only answers questions related to DSA topics like Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, etc.  
- 🚫 **Topic Restriction** – If the user asks non-DSA questions, the bot politely reminds them to stay on DSA topics.  
- 💬 **Simplified Explanations** – Breaks down complex DSA concepts into easy-to-understand language.  
- ⚡ **Powered by Gemini 2.5 Flash** – Uses Google’s latest generative model for fast and accurate responses.  
- 💻 **Real-Time Chat** – Provides instant responses with smooth UI transitions.

---

## 🛠️ Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | React (with Vite) |
| **Styling** | Tailwind CSS |
| **AI Model** | Gemini 2.5 Flash |
| **API** | Google Generative Language API |
| **Deployment** | Vercel / Netlify (optional) |

---

## ⚙️ How It Works

1. The user enters a question in the chat interface.  
2. The app sends the prompt to the **Gemini 2.5 Flash model** using the **Google Generative Language API**.  
3. The `system_instruction` defines the model’s behavior —  
   - If the question is DSA-related → gives a clear, polite, and simple explanation.  
   - If it’s non-DSA → replies with a reminder to stick to DSA topics.  
4. The bot displays the AI’s response instantly in a smooth chat UI.  

---

## 📦 Getting Started

### 🔧 Prerequisites

- Node.js & npm installed  
- Gemini API Key (get from [Google AI Studio](https://aistudio.google.com/api-keys))  

### 🧩 Installation

```bash
# Clone the repo
git clone https://github.com/Kapilgupta25/DSA-Instructor-Bot.git
cd DSA-Instructor-Bot

# Install dependencies
npm install

# Run the app
npm run dev
```

🔑 Environment Variables

Create a .env file in the root directory and add your API key:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
