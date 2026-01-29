# 🪐 Yash | Premium 3D AI Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

An immersive, futuristic personal portfolio website featuring interactive 3D elements, glassmorphism UI, and a fully integrated AI Assistant powered by Google's **Gemini 3 Pro** model.

## ✨ Features

- **🌌 Immersive 3D Environment**: Built with **React Three Fiber**, featuring a starry void and an interactive, distorting hero sphere.
- **🤖 AI Chatbot Assistant**: A floating chat interface powered by `@google/genai` (Gemini 3 Pro Preview). The AI acts as a personal assistant, answering questions about skills, projects, and contact info.
- **🎨 Cyberpunk / Space Aesthetic**: Deep space colors, neon accents (`#06b6d4`, `#a855f7`), and glowing text effects.
- **💎 Glassmorphism UI**: Modern frosted glass cards with backdrop filters and border gradients.
- **⚡ Smooth Animations**: Powered by **Framer Motion** for scroll reveals, hover effects, and transitions.
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **3D Engine**: Three.js / @react-three/fiber / @react-three/drei
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: Google GenAI SDK (`gemini-3-pro-preview`)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Cloud API Key with access to Gemini API.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yash-portfolio.git
   cd yash-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your API key:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🧠 AI Assistant Configuration

The ChatBot component (`index.tsx`) is pre-configured with a specific **System Instruction** to act as Yash's assistant. You can customize the `systemInstruction` variable in the `handleSend` function to change the AI's persona or knowledge base.

```typescript
const systemInstruction = `You are an intelligent AI assistant for Yash's personal portfolio...`;
```

## 📂 Project Structure

- `index.html`: Entry point, includes Tailwind CDN and Import Maps.
- `index.tsx`: Main application logic containing:
  - 3D Canvas & Scene
  - UI Components (Navbar, Hero, About, Skills, Projects, Contact)
  - `ChatBot` Logic & UI
- `google56aaa7bbb73bb553.html`: Google Site Verification.



---

<p align="center">
  Built with ❤️ by Yash
</p>