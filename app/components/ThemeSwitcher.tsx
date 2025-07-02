import React from 'react';
import { Monitor, Moon, Sun, Terminal, Sparkles } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  terminal: string;
  text: string;
  accent: string;
}

const themes: Theme[] = [
  { 
    id: 'default', 
    name: 'DevOps Blue', 
    icon: Monitor, 
    gradient: 'from-gray-900 via-blue-900 to-purple-900',
    terminal: 'bg-black/90',
    text: 'text-gray-300',
    accent: 'text-blue-400'
  },
  { 
    id: 'matrix', 
    name: 'Matrix', 
    icon: Terminal, 
    gradient: 'from-black via-green-950 to-black',
    terminal: 'bg-black/95',
    text: 'text-green-400',
    accent: 'text-green-500'
  },
  { 
    id: 'synthwave', 
    name: 'Synthwave', 
    icon: Sun, 
    gradient: 'from-purple-900 via-pink-900 to-orange-900',
    terminal: 'bg-purple-950/90',
    text: 'text-pink-300',
    accent: 'text-pink-400'
  },
  { 
    id: 'nord', 
    name: 'Nord', 
    icon: Moon, 
    gradient: 'from-slate-900 via-slate-800 to-blue-950',
    terminal: 'bg-slate-900/90',
    text: 'text-slate-300',
    accent: 'text-cyan-400'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    icon: Sparkles, 
    gradient: 'from-gray-900 via-yellow-900 to-red-950',
    terminal: 'bg-gray-950/90',
    text: 'text-yellow-300',
    accent: 'text-yellow-400'
  },
];

interface ThemeSwitcherProps {
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 backdrop-blur-md rounded-full p-3 border border-blue-500/30 hover:border-blue-400 transition-all hover:scale-110"
        title="Change Theme"
      >
        <Sparkles className="w-5 h-5 text-blue-400" />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-black/90 backdrop-blur-md rounded-lg p-3 border border-blue-500/30 min-w-[200px]">
          <p className="text-xs text-gray-400 mb-3 font-semibold">Choose Theme</p>
          <div className="space-y-2">
            {themes.map(theme => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded transition-all ${
                    currentTheme === theme.id
                      ? 'bg-blue-600/30 text-white border border-blue-500/50'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{theme.name}</span>
                  {currentTheme === theme.id && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export { ThemeSwitcher, themes };
export type { Theme };