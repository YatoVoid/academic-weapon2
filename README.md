# 🎓 Mentora (Academic Weapon)

AI-powered academic management platform that automates student workflows through intelligent calendar syncing, syllabus parsing, and real-time schedule monitoring.

![Mentora Banner](https://img.shields.io/badge/Hackathon-Winner-gold)
![Google Calendar API](https://img.shields.io/badge/Google%20Calendar-API-blue)
![Zapier Integration](https://img.shields.io/badge/Zapier-Integrated-orange)
![License](https://img.shields.io/badge/License-MIT-green)
<img width="587" height="910" alt="image" src="https://github.com/user-attachments/assets/bd61044f-b284-46b9-831b-ae7f4cb1be66" />
<img width="592" height="914" alt="image" src="https://github.com/user-attachments/assets/caca674b-eca1-42ab-b51f-6354f86bd572" />
<img width="1152" height="926" alt="image" src="https://github.com/user-attachments/assets/69af713a-0785-4957-b754-210c32936752" />
<img width="590" height="919" alt="image" src="https://github.com/user-attachments/assets/cf160e2d-f476-4e9e-970d-d59c2d01545b" />
<img width="593" height="916" alt="image" src="https://github.com/user-attachments/assets/2833a564-ed80-409a-85f8-5834d5030541" />
<img width="585" height="916" alt="image" src="https://github.com/user-attachments/assets/0513de6f-f2fb-4730-9d0e-6a7c3bf30399" />

## ✨ Features

### 📅 **Smart Calendar Integration**
- Real-time Google Calendar sync
- Automatic event creation from natural language
- Intelligent deadline tracking

### 📧 **Email Intelligence** 
- Monitors academic emails for schedule changes
- Auto-detects urgent updates (class cancellations, room changes)
- Instantly updates calendar with changes via Zapier webhooks

### 📄 **Syllabus Parser**
- Upload PDF syllabi
- AI extracts all important dates
- Automatically syncs assignments, exams, and deadlines to calendar

### 🧮 **Grade Calculator**
- Track current grades across all courses
- Calculate required scores for target grades
- Visual progress tracking

### 🤖 **AI Study Assistant**
- Natural language calendar event creation
- Study recommendations based on upcoming deadlines
- Personalized academic insights

### 📱 **Mobile-First Design**
- Progressive Web App (PWA)
- Beautiful animated login with swirl effects
- Responsive dashboard widgets

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Google Cloud account (for Calendar API)
- Zapier account (for email automation)
- ngrok (for local development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YatoVoid/academic-weapon2.git
cd academic-weapon2
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_API_KEY=your_api_key_here
ZAPIER_WEBHOOK_URL=your_webhook_url_here
PORT=3000
```

4. **Start the backend server**
```bash
node server.js
```

5. **Start ngrok tunnel** (in a new terminal)
```bash
ngrok http 3000
```

6. **Open the app**
- Open `index.html` in your browser
- Or deploy to any static hosting service

## ⚙️ Configuration

### Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - Your ngrok URL
   - Your production domain

### Zapier Webhook Setup

1. Create a new Zap in Zapier
2. Set trigger: **Webhooks by Zapier** → **Catch Hook**
3. Set action: **Google Calendar** → **Create Detailed Event**
4. Copy webhook URL to your `.env` file
5. Turn on the Zap

### Server Configuration

The `server.js` handles:
- Chatbot API responses
- Webhook processing
- Calendar event creation
- PDF parsing endpoints

Start with:
```bash
node server.js
```

Access at: `http://localhost:3000`

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Zapier    │
│    (PWA)    │     │  (Node.js)  │     │  Webhooks   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Google    │     │   AI Chat   │     │    Email    │
│  Calendar   │     │   Engine    │     │  Monitoring │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 📁 Project Structure

```
academic-weapon2/
├── index.html          # Main app interface
├── server.js           # Backend server
├── package.json        # Dependencies
├── README.md           # Documentation
├── public/             # Static assets
│   ├── css/           # Stylesheets
│   ├── js/            # Frontend scripts
│   └── assets/        # Images/icons
├── src/               # Source code
│   ├── api/           # API handlers
│   ├── webhooks/      # Zapier handlers
│   └── utils/         # Helper functions
└── docs/              # Additional docs
```

## 🔌 API Endpoints

### Backend Server (server.js)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Process chatbot messages |
| `/api/calendar/create` | POST | Create calendar event |
| `/api/syllabus/parse` | POST | Parse PDF syllabus |
| `/webhook/zapier` | POST | Receive Zapier webhooks |
| `/health` | GET | Server health check |

### Request Examples

**Create Calendar Event:**
```javascript
POST /api/calendar/create
{
  "title": "Calculus Exam",
  "date": "2025-11-25",
  "time": "14:00",
  "duration": 120
}
```

**Chat with AI Assistant:**
```javascript
POST /api/chat
{
  "message": "Add homework due tomorrow at 5pm",
  "userId": "user123"
}
```

## 🛠️ Development

### Local Development Setup

1. **Start backend server:**
```bash
node server.js
# Server runs on http://localhost:3000
```

2. **Start ngrok tunnel:**
```bash
ngrok http 3000
# Provides public URL like https://abc123.ngrok.io
```

3. **Update webhook URLs:**
- Copy ngrok URL
- Update Zapier webhook to use ngrok URL
- Update frontend API calls to use ngrok URL

### Testing

```bash
# Run tests
npm test

# Test webhook
curl -X POST http://localhost:3000/webhook/zapier \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": "sample"}'
```

## 🚢 Deployment

### Frontend Deployment (Static Sites)
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Push to gh-pages branch

### Backend Deployment (Node.js Server)
- **Heroku**: 
  ```bash
  heroku create your-app-name
  git push heroku main
  ```
- **Railway**: Connect GitHub repo
- **Render**: Auto-deploy from GitHub

### Environment Variables (Production)
Set these in your hosting platform:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_API_KEY`
- `ZAPIER_WEBHOOK_URL`
- `NODE_ENV=production`

## 🎯 Hackathon Features

This project was built for **CaseQuest Hackathon 2025** addressing:

1. **Automated Schedule Management**: Eliminates manual calendar entry
2. **Email Intelligence**: Never miss urgent academic updates
3. **Smart Grade Tracking**: Real-time academic performance insights
4. **AI-Powered Assistance**: Natural language interaction for all features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🏆 Achievements

- **CaseQuest Hackathon 2025** - Academic Management Track
- Solving real student problems with automation
- 90% reduction in manual scheduling tasks

## 📞 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/YatoVoid/academic-weapon2/issues)
- Contact: [wali.lambert1960@gmail.com]

## 🙏 Acknowledgments

- Google Calendar API for calendar integration
- Zapier for webhook automation
- CaseQuest for the hackathon opportunity

---

<p align="center">
  Made with ❤️ for students by students
  <br>
  <strong>Automate your academic success with Mentora!</strong>
</p>
