# Vexo Launcher

A modern, feature-rich desktop launcher application built with Tauri, React, and Tailwind CSS.

## 🎮 Features

- 🎨 **Modern Dark Theme UI** - Beautiful purple/violet accent colors
- 🧭 **Intuitive Navigation** - Sidebar with Home, Library, Shop, Ranks, Servers, Profile, Settings
- 📰 **News Feed** - Featured game updates and latest news
- 🌍 **Server Browser** - Multi-region server selection with real-time status
- 🎯 **Game Library** - Manage installed games with playtime tracking
- 🏆 **Leaderboard System** - Real-time rankings and player statistics
- ⚙️ **Advanced Settings** - Comprehensive customization options
- 👤 **User Profiles** - Achievements and statistics showcase
- 💰 **In-Game Economy** - Credits and XP system
- 📊 **Stats Dashboard** - Detailed analytics and tracking
- 🚀 **Tauri Performance** - Lightweight desktop app
- 💻 **Cross-Platform** - Windows, macOS, Linux support

## 🛠️ Tech Stack

- **Desktop Framework**: Tauri
- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Icons**: Lucide React

## 📋 Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **Rust** ([Install via rustup](https://rustup.rs/))
- **npm** or **yarn**

### System Requirements

- Windows 10+ / macOS 10.13+ / Linux (Ubuntu 18.04+)
- 4GB RAM minimum
- 500MB free disk space

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/floresnikiyia-maker/Vexo-lanch.git
cd Vexo-lanch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run tauri:dev
```

This will start the Vite dev server and launch the Tauri app automatically.

### 4. Build for Production

```bash
npm run tauri:build
```

Built applications will be in `src-tauri/target/release/bundle/`

## 📁 Project Structure

```
Vexo-lanch/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Top navigation bar
│   │   ├── Sidebar.tsx      # Left sidebar navigation
│   │   └── StatCard.tsx     # Statistics display card
│   ├── pages/               # Full page components
│   │   ├── Home.tsx         # Dashboard with news feed
│   │   ├── Library.tsx      # Game library manager
│   │   ├── Shop.tsx         # In-game store
│   │   ├── Ranks.tsx        # Leaderboard
│   │   ├── Servers.tsx      # Server browser
│   │   ├── Profile.tsx      # User profile
│   │   └── Settings.tsx     # Settings panel
│   ├── store/
│   │   └── appStore.ts      # Zustand state management
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── src-tauri/               # Tauri backend (Rust)
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── tailwind.config.js       # Tailwind config
```

## 🎯 Pages Overview

### **Home**
- Welcome greeting
- Featured news banner
- Player statistics
- Experience progress bar
- Quick action buttons
- Top players leaderboard

### **Library**
- Installed games list
- Playtime tracking
- Last played information
- Game status (running/installed/pending)
- Quick launch buttons
- Download management

### **Shop**
- Premium items store
- Credit-based purchasing
- Cosmetics and boosters
- Real-time credit balance

### **Leaderboard (Ranks)**
- Global player rankings
- Score and win statistics
- Tier indicators
- Performance analytics

### **Servers**
- Multi-region server selection (EU, NAE)
- Real-time server status
- Player count and load percentage
- Ping information
- Connection status indicators

### **Profile**
- User profile information
- Achievement showcase
- Personal statistics
- Credit and XP display
- Level progress

### **Settings**
- Notification preferences
- Performance options
- Quality settings
- Game installation paths
- Username customization
- System preferences

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'accent': '#a78bfa',      // Purple
      'accent-hover': '#c4b5fd',
    },
  },
}
```

### Update Mock Data

Edit `src/store/appStore.ts` to change:
- User data
- Leaderboard entries
- News articles
- Game servers
- Game sessions

### Modify UI Components

All components are in `src/components/` and `src/pages/` - fully customizable!

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
npm run tauri:dev       # Start Tauri in dev mode

# Production
npm run build           # Build frontend
npm run tauri:build     # Build Tauri app

# Preview
npm run preview         # Preview production build
```

## 🔄 State Management

All app state uses Zustand with localStorage persistence:

```typescript
// Access store
const user = useAppStore((state) => state.user)
const updateUser = useAppStore((state) => state.updateUser)

// Modify state
updateUser({ credits: 5000 })
```

## 🎮 Game Integration

To integrate real games:

1. Update `GameSession` interface in `appStore.ts`
2. Implement game process detection
3. Add platform-specific code in `src-tauri/src/`
4. Update Library page to list real games

## 🐛 Troubleshooting

### Tauri Not Starting?
```bash
# Make sure Rust is installed
rustup update

# Rebuild Tauri
npm run tauri:build
```

### Port Already in Use?
```bash
# Kill process on port 5173
# Windows: netstat -ano | findstr :5173
# Linux/Mac: lsof -i :5173
```

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run tauri:dev
```

## 📝 Environment Setup

### Windows
1. Install Visual C++ Build Tools
2. Install Rust via `rustup`
3. Install Node.js
4. Run `npm install` and `npm run tauri:dev`

### macOS
```bash
brew install rust
brew install node
npm install
npm run tauri:dev
```

### Linux (Ubuntu)
```bash
sudo apt-get install libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
npm install
npm run tauri:dev
```

## 📄 License

MIT License - Feel free to use this project as a base for your own launcher!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via GitHub Issues
- Submit pull requests with improvements
- Suggest new features

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Check existing documentation
- Review Tauri docs: https://tauri.app/

## 🚀 Next Steps

1. Clone the repo
2. Run `npm install`
3. Run `npm run tauri:dev`
4. Start customizing!

Enjoy your new launcher! 🎮✨
