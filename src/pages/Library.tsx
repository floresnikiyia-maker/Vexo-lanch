import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { Play, Trash2, Download, FolderOpen } from 'lucide-react'

const Library = () => {
  const gameSessions = useAppStore((state) => state.gameSessions)
  const updateGameSession = useAppStore((state) => state.updateGameSession)
  const setGameRunning = useAppStore((state) => state.setGameRunning)
  const [selectedFolder, setSelectedFolder] = useState<string>('')

  const sampleGames = [
    { id: '1', name: 'Valorant', playtime: 4820, lastPlayed: new Date(Date.now() - 3600000), installPath: 'C:\\Games\\Valorant', status: 'installed' as const, version: '8.15.1' },
    { id: '2', name: 'League of Legends', playtime: 12340, lastPlayed: new Date(Date.now() - 86400000), installPath: 'C:\\Games\\LOL', status: 'installed' as const, version: '14.12' },
    { id: '3', name: 'CS:GO', playtime: 8920, lastPlayed: new Date(Date.now() - 172800000), installPath: 'C:\\Games\\CSGO', status: 'installed' as const, version: '1.3.8' },
    { id: '4', name: 'Dota 2', playtime: 5670, lastPlayed: new Date(Date.now() - 259200000), installPath: 'C:\\Games\\Dota2', status: 'pending' as const, version: '7.33' },
    { id: '5', name: 'Overwatch 2', playtime: 3450, lastPlayed: new Date(Date.now() - 345600000), installPath: 'C:\\Games\\OW2', status: 'installed' as const, version: '1.58' },
  ]

  const formatPlaytime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    return `${Math.floor(minutes / 1440)}d`
  }

  const formatLastPlayed = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return 'A week ago'
  }

  const handlePlay = (gameId: string) => {
    setGameRunning(gameId, true)
    setTimeout(() => setGameRunning(gameId, false), 3000)
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Library</h2>
        <p className="text-gray-400">Manage and launch your installed games</p>
      </div>

      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-secondary border border-dark-tertiary rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Total Games</p>
          <p className="text-3xl font-bold">{sampleGames.length}</p>
        </div>
        <div className="bg-dark-secondary border border-dark-tertiary rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Games Installed</p>
          <p className="text-3xl font-bold">{sampleGames.filter((g) => g.status === 'installed').length}</p>
        </div>
        <div className="bg-dark-secondary border border-dark-tertiary rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Total Playtime</p>
          <p className="text-3xl font-bold">{formatPlaytime(sampleGames.reduce((acc, g) => acc + g.playtime, 0))}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sampleGames.map((game) => (
          <div key={game.id} className="bg-dark-secondary border border-dark-tertiary rounded-lg p-6 hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{game.name}</h3>
                <p className="text-sm text-gray-400 mt-1">Total playtime: {formatPlaytime(game.playtime)}</p>
              </div>
              <div className="text-3xl">🎮</div>
            </div>

            <div className="text-sm text-gray-400 mb-3 space-y-1">
              <p>Last played: {formatLastPlayed(game.lastPlayed)}</p>
              <p className="flex items-center gap-2">
                <FolderOpen size={14} />
                {game.installPath}
              </p>
              <p>Version: {game.version}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePlay(game.id)}
                className="flex-1 bg-accent hover:bg-accent-hover text-dark font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play size={18} />
                {gameSessions.find((s) => s.id === game.id)?.status === 'running' ? 'Playing' : 'Play'}
              </button>
              {game.status === 'pending' && (
                <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 rounded-lg transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Install
                </button>
              )}
              <button className="px-4 py-2 bg-dark-tertiary hover:bg-dark-tertiary border border-dark-tertiary text-gray-400 hover:text-red-400 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Library
