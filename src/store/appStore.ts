import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  level: number
  experience: number
  credits: number
}

export interface LeaderboardEntry {
  rank: number
  user: User
  score: number
  wins: number
}

export interface GameSession {
  id: string
  name: string
  playtime: number
  lastPlayed: Date
  installPath: string
  status: 'running' | 'installed' | 'pending'
  version: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  featured: boolean
  date: Date
  category: string
}

export interface GameServer {
  id: string
  name: string
  region: string
  players: number
  maxPlayers: number
  status: 'online' | 'offline' | 'maintenance'
  ping: number
}

export interface Settings {
  theme: 'dark' | 'light'
  notifications: boolean
  autoStart: boolean
  lowLatency: boolean
  quality: 'low' | 'medium' | 'high'
  defaultInstallPath: string
}

interface AppState {
  user: User
  leaderboard: LeaderboardEntry[]
  gameSessions: GameSession[]
  news: NewsArticle[]
  servers: GameServer[]
  settings: Settings
  updateUser: (user: Partial<User>) => void
  addLeaderboardEntry: (entry: LeaderboardEntry) => void
  updateSettings: (settings: Partial<Settings>) => void
  addGameSession: (session: GameSession) => void
  updateGameSession: (id: string, updates: Partial<GameSession>) => void
  removeGameSession: (id: string) => void
  addExperience: (amount: number) => void
  addCredits: (amount: number) => void
  setGameRunning: (id: string, running: boolean) => void
  addNews: (article: NewsArticle) => void
  addServers: (servers: GameServer[]) => void
}

const defaultUser: User = {
  id: '1',
  username: 'kayden.cfx',
  displayName: 'Kayden',
  avatar: '🎮',
  level: 1,
  experience: 0,
  credits: 1000,
}

const defaultSettings: Settings = {
  theme: 'dark',
  notifications: true,
  autoStart: false,
  lowLatency: false,
  quality: 'high',
  defaultInstallPath: '/Games',
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: { ...defaultUser, username: 'ProPlayer', displayName: 'Pro Player', level: 45, avatar: '🎮' },
    score: 15420,
    wins: 342,
  },
  {
    rank: 2,
    user: { ...defaultUser, username: 'ShadowNinja', displayName: 'Shadow Ninja', level: 42, avatar: '🥷' },
    score: 14890,
    wins: 318,
  },
  {
    rank: 3,
    user: { ...defaultUser, username: 'Phoenix', displayName: 'Phoenix', level: 40, avatar: '🔥' },
    score: 14120,
    wins: 295,
  },
  {
    rank: 4,
    user: { ...defaultUser, username: 'Nexus', displayName: 'Nexus', level: 38, avatar: '✨' },
    score: 13450,
    wins: 278,
  },
  {
    rank: 5,
    user: defaultUser,
    score: 8920,
    wins: 156,
  },
]

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Chapter 4 Season 2',
    description: 'Neo-Tokyo aesthetics introduced Mega City with grid rails and katanas. Heist elements and futuristic weapons like the Kinetic Blade defined gameplay. The Syndicate storyline added intrigue to the neon-lit map.',
    image: 'https://images.unsplash.com/photo-1538481143235-5d630e50c6da?w=1200&h=600&fit=crop',
    featured: true,
    date: new Date(Date.now() - 86400000),
    category: 'Update',
  },
  {
    id: '2',
    title: 'New Battle Pass Available',
    description: 'Exclusive cosmetics and rewards now available. Unlock rare skins and emotes this season.',
    image: 'https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=1200&h=600&fit=crop',
    featured: false,
    date: new Date(Date.now() - 172800000),
    category: 'Cosmetics',
  },
  {
    id: '3',
    title: 'Ranked Season Begins',
    description: 'New ranked season with updated rankings and rewards. Climb the leaderboard for exclusive prizes.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=600&fit=crop',
    featured: false,
    date: new Date(Date.now() - 259200000),
    category: 'Ranked',
  },
]

const mockServers: GameServer[] = [
  { id: '1', name: 'EU Server 1', region: 'EU', players: 4520, maxPlayers: 5000, status: 'online', ping: 24 },
  { id: '2', name: 'EU Server 2', region: 'EU', players: 4890, maxPlayers: 5000, status: 'online', ping: 28 },
  { id: '3', name: 'EU Server 3', region: 'EU', players: 0, maxPlayers: 5000, status: 'maintenance', ping: 0 },
  { id: '4', name: 'NAE Server 1', region: 'NAE', players: 3450, maxPlayers: 5000, status: 'online', ping: 45 },
  { id: '5', name: 'NAE Server 2', region: 'NAE', players: 4200, maxPlayers: 5000, status: 'online', ping: 52 },
]

const mockGameSessions: GameSession[] = [
  {
    id: '1',
    name: 'Exo Game',
    playtime: 24.20,
    lastPlayed: new Date(),
    installPath: 'C:\\Games\\Exo',
    status: 'running',
    version: '24.20-CL-2585254',
  },
]

export const useAppStore = create<AppState>(
  persist(
    (set) => (
      {
        user: defaultUser,
        leaderboard: mockLeaderboard,
        gameSessions: mockGameSessions,
        news: mockNews,
        servers: mockServers,
        settings: defaultSettings,
        updateUser: (updates) =>
          set((state) => ({
            user: { ...state.user, ...updates },
          })),
        addLeaderboardEntry: (entry) =>
          set((state) => ({
            leaderboard: [...state.leaderboard, entry],
          })),
        updateSettings: (updates) =>
          set((state) => ({
            settings: { ...state.settings, ...updates },
          })),
        addGameSession: (session) =>
          set((state) => ({
            gameSessions: [...state.gameSessions, session],
          })),
        updateGameSession: (id, updates) =>
          set((state) => ({
            gameSessions: state.gameSessions.map((session) =>
              session.id === id ? { ...session, ...updates } : session
            ),
          })),
        removeGameSession: (id) =>
          set((state) => ({
            gameSessions: state.gameSessions.filter((session) => session.id !== id),
          })),
        addExperience: (amount) =>
          set((state) => {
            const newExp = state.user.experience + amount
            const levelUp = Math.floor(newExp / 1000)
            return {
              user: {
                ...state.user,
                experience: newExp % 1000,
                level: state.user.level + levelUp,
              },
            }
          }),
        addCredits: (amount) =>
          set((state) => ({
            user: { ...state.user, credits: state.user.credits + amount },
          })),
        setGameRunning: (id, running) =>
          set((state) => ({
            gameSessions: state.gameSessions.map((session) =>
              session.id === id ? { ...session, status: running ? 'running' : 'installed' } : session
            ),
          })),
        addNews: (article) =>
          set((state) => ({
            news: [article, ...state.news],
          })),
        addServers: (servers) =>
          set(() => ({
            servers,
          })),
      }
    ),
    {
      name: 'vexo-launcher-storage',
    }
  )
)
