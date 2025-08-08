import React, { useState } from 'react';
import { Plus, Minus, Copy, Palette, Instagram, Sparkles } from 'lucide-react';

interface ColorData {
  id: string;
  color: string;
}

function App() {
  const [colors, setColors] = useState<ColorData[]>([
    { id: '1', color: '#3b82f6' }
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const addColorPicker = () => {
    const newId = Date.now().toString();
    setColors([...colors, { id: newId, color: '#3b82f6' }]);
  };

  const removeColorPicker = (id: string) => {
    if (colors.length > 1) {
      setColors(colors.filter(color => color.id !== id));
    }
  };

  const updateColor = (id: string, newColor: string) => {
    setColors(colors.map(color => 
      color.id === id ? { ...color, color: newColor } : color
    ));
  };

  const copyToClipboard = async (text: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (id) {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyAllColors = () => {
    const allHexCodes = colors.map(color => color.color).join(', ');
    copyToClipboard(allHexCodes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-purple-600/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
        <div className="relative px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/30">
                  <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent tracking-tight">
                  Younis_Dev
                </h1>
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-1 sm:mt-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-blue-200 font-medium tracking-wide text-sm sm:text-base">DEVELOPER</span>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white px-2">
                Professional Color Picker & Palette Generator
              </h2>
              <p className="text-blue-200/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                Create stunning color palettes with precision. Perfect for designers, developers, and creative professionals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 pt-3 sm:pt-4">
                <div className="flex items-center space-x-2 text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Real-time Preview</span>
                </div>
                <div className="flex items-center space-x-2 text-indigo-300">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">One-Click Copy</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Mobile Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={addColorPicker}
                className="flex items-center justify-center space-x-2 px-8 py-4 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 ease-out w-full sm:w-auto text-lg sm:text-base"
              >
                <Plus className="w-6 h-6 sm:w-5 sm:h-5" />
                <span>Add Color</span>
              </button>
              
              {colors.length > 1 && (
                <button
                  onClick={copyAllColors}
                  className="flex items-center justify-center space-x-2 px-8 py-4 sm:px-6 sm:py-3 bg-gray-700/50 backdrop-blur-sm text-gray-200 rounded-xl font-semibold border border-gray-600 hover:border-blue-400 hover:bg-gray-600/50 transition-all duration-300 w-full sm:w-auto text-lg sm:text-base"
                >
                  <Copy className="w-6 h-6 sm:w-5 sm:h-5" />
                  <span className={copiedAll ? "text-green-400" : ""}>
                    {copiedAll ? "Copied!" : "Copy All"}
                  </span>
                </button>
              )}
            </div>
            
            <div className="text-gray-400 text-sm sm:text-base text-center">
              {colors.length} color{colors.length !== 1 ? 's' : ''} selected
            </div>
          </div>

          {/* Color Pickers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colors.map((colorData, index) => (
              <div
                key={colorData.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {/* Remove Button */}
                {colors.length > 1 && (
                  <button
                    onClick={() => removeColorPicker(colorData.id)}
                    className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 z-10"
                  >
                    <Minus className="w-5 h-5 sm:w-4 sm:h-4" />
                  </button>
                )}

                {/* Color Picker */}
                <div className="relative mb-4 sm:mb-6">
                  <div 
                    className="w-full h-40 sm:h-32 rounded-xl cursor-pointer relative overflow-hidden group/picker shadow-lg border-2 border-gray-600 hover:border-blue-400 transition-colors duration-300"
                    style={{ backgroundColor: colorData.color }}
                  >
                    <input
                      type="color"
                      value={colorData.color}
                      onChange={(e) => updateColor(colorData.id, e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/picker:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/picker:opacity-100 transition-opacity duration-300">
                      <div className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm sm:text-base font-semibold shadow-lg">
                        Click to change
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Info */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm sm:text-base mb-1">Color {index + 1}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {colorData.color.toUpperCase()}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(colorData.color, colorData.id)}
                    className="w-full flex items-center justify-center space-x-2 py-4 sm:py-3 bg-gradient-to-r from-gray-600/50 to-gray-700/50 backdrop-blur-sm text-gray-200 rounded-xl font-semibold border border-gray-600 hover:border-blue-400 hover:from-blue-500/20 hover:to-indigo-400/20 transition-all duration-300 text-lg sm:text-base"
                  >
                    <Copy className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className={copiedId === colorData.id ? "text-green-400" : ""}>
                      {copiedId === colorData.id ? "Copied!" : "Copy Hex"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* All Colors Display */}
          {colors.length > 1 && (
            <div className="mt-12 sm:mt-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Your Color Palette</h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                {colors.map((colorData) => (
                  <div
                    key={colorData.id}
                    className="flex flex-col items-center space-y-1 sm:space-y-2"
                  >
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-lg border-2 border-slate-600"
                      style={{ backgroundColor: colorData.color }}
                    ></div>
                    <div className="text-xs sm:text-sm font-mono text-gray-300">
                      {colorData.color.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm sm:text-base mb-2">All Colors</div>
                <div className="text-sm sm:text-xl font-mono text-white bg-gray-900/50 px-3 sm:px-4 py-2 rounded-lg inline-block mb-4 break-all">
                  {colors.map(c => c.color.toUpperCase()).join(', ')}
                </div>
                <button
                  onClick={copyAllColors}
                  className="px-8 py-4 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 ease-out text-lg sm:text-base w-full sm:w-auto"
                >
                  <Copy className="w-6 h-6 sm:w-5 sm:h-5 inline mr-2" />
                  <span className={copiedAll ? "text-green-200" : ""}>
                    {copiedAll ? "Copied All Colors!" : "Copy All Colors"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Instagram Footer */}
      <footer className="mt-12 sm:mt-20 py-6 sm:py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center">
            <a
              href="https://www.instagram.com/younis_dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-8 py-4 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300 ease-out group text-lg sm:text-base"
            >
              <Instagram className="w-6 h-6 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Follow @younis_dev</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;