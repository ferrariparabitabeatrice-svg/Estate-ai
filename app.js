const { useState } = React;
const { Home, TrendingUp, DollarSign, AlertCircle, CheckCircle, Building2, BarChart3, Trash2, Download, RefreshCw, Globe, Zap, Archive, Search, Filter, ThumbsUp, ThumbsDown, Save, Menu, X, Share2, Plus } = lucide;

function RealEstateAnalyzerApp() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [archive, setArchive] = useState({ yesArchive: [], noArchive: [] });
  const [selectedProperty, setSelectedProperty] = useState(null);

  const searchIdealista = () => {
    const results = [
      { id: 1, address: '125 Paseo de Gracia, Barcelona', price: 750000, bedrooms: 4, bathrooms: 3, squareFeet: 2500, energyRating: 'B' },
      { id: 2, address: '45 Ramblas Avenue, Barcelona', price: 620000, bedrooms: 3, bathrooms: 2, squareFeet: 2100, energyRating: 'C' },
      { id: 3, address: '200 Gran Vía, Madrid', price: 950000, bedrooms: 5, bathrooms: 3, squareFeet: 3200, energyRating: 'A' },
      { id: 4, address: '89 Avenida Diagonal, Barcelona', price: 550000, bedrooms: 3, bathrooms: 2, squareFeet: 1900, energyRating: 'D' }
    ];
    setProperties(results);
  };

  const analyzeProperty = (prop) => {
    const price = prop.price;
    const baseRent = { 1: 1500, 2: 2200, 3: 3000, 4: 4000, 5: 5200 };
    const monthlyRent = (baseRent[prop.bedrooms] || 3000) * 1.3;
    
    const analysis = {
      ...prop,
      monthlyRent: Math.round(monthlyRent),
      summerRent: Math.round(monthlyRent * 1.4),
      closingCosts: Math.round(price * 0.05),
      renovationCost: Math.round(price * 0.02),
      totalInvestment: Math.round(price + price * 0.05 + price * 0.02),
      propertyTax: Math.round((price * 0.012) / 12),
      monthlyExpenses: Math.round(monthlyRent * 0.35),
      monthlyProfit: Math.round(monthlyRent * 0.65 * 0.75),
      capRate: ((monthlyRent * 12 * 0.65 * 0.75) / price * 100).toFixed(2),
      recommendation: ((monthlyRent * 12 * 0.65 * 0.75) / price * 100) >= 5 ? 'Strong Buy' : 'Buy'
    };
    
    setSelectedProperty(analysis);
    setActiveTab('results');
  };

  const saveToArchive = (decision) => {
    if (decision === 'yes') {
      setArchive(prev => ({
        ...prev,
        yesArchive: [...prev.yesArchive, { ...selectedProperty, date: new Date().toLocaleString() }]
      }));
    } else {
      setArchive(prev => ({
        ...prev,
        noArchive: [...prev.noArchive, { ...selectedProperty, date: new Date().toLocaleString() }]
      }));
    }
    setSelectedProperty(null);
    setActiveTab('archive');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 z-50 p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <h1 className="text-xl font-bold">Estate AI</h1>
        </div>
      </div>

      <div className="pt-20 px-4">
        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">🔍 Search Properties</h2>
              
              <input
                type="text"
                placeholder="Barcelona 4bed, Madrid villa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 mb-4"
              />
              
              <button
                onClick={searchIdealista}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition"
              >
                🔍 Search Idealista
              </button>

              {properties.length > 0 && (
                <div className="space-y-3 mt-6">
                  {properties.map(prop => (
                    <div key={prop.id} className="bg-slate-900/50 border border-slate-600/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">{prop.address}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-3">
                        <div className="font-bold text-amber-400">${prop.price.toLocaleString()}</div>
                        <div>{prop.bedrooms}B • {prop.bathrooms}B</div>
                      </div>
                      <button
                        onClick={() => analyzeProperty(prop)}
                        className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 py-2 rounded-lg font-bold"
                      >
                        📊 Analyze
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RESULTS TAB */}
        {activeTab === 'results' && selectedProperty && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedProperty.address}</h2>
              
              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <p className="text-slate-400 text-sm">Purchase Price</p>
                  <p className="text-3xl font-bold text-amber-400">${selectedProperty.price.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-900/30 rounded-lg p-3">
                    <p className="text-xs text-blue-300">Monthly Rent</p>
                    <p className="text-lg font-bold text-blue-300">${selectedProperty.monthlyRent.toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-900/30 rounded-lg p-3">
                    <p className="text-xs text-emerald-300">Monthly Profit</p>
                    <p className="text-lg font-bold text-emerald-300">${selectedProperty.monthlyProfit.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-900/30 rounded-lg p-3">
                    <p className="text-xs text-purple-300">Cap Rate</p>
                    <p className="text-lg font-bold text-purple-300">{selectedProperty.capRate}%</p>
                  </div>
                  <div className="bg-orange-900/30 rounded-lg p-3">
                    <p className="text-xs text-orange-300">Recommendation</p>
                    <p className="text-lg font-bold text-orange-300">✅ {selectedProperty.recommendation}</p>
                  </div>
                </div>

                <div className="border-t border-slate-600 pt-4 mt-4">
                  <p className="text-sm text-slate-400 mb-3">Total Investment: ${selectedProperty.totalInvestment.toLocaleString()}</p>
                  <p className="text-sm text-slate-400 mb-3">Annual Net Profit: ${(selectedProperty.monthlyProfit * 12).toLocaleString()}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => saveToArchive('yes')}
                      className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg font-bold"
                    >
                      ✅ YES BUY
                    </button>
                    <button
                      onClick={() => saveToArchive('no')}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg font-bold"
                    >
                      ❌ NO BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARCHIVE TAB */}
        {activeTab === 'archive' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-3">✅ YES BUY ({archive.yesArchive.length})</h2>
              {archive.yesArchive.length === 0 ? (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center text-slate-400">
                  No properties yet
                </div>
              ) : (
                <div className="space-y-3">
                  {archive.yesArchive.map(prop => (
                    <div key={prop.id} className="bg-emerald-900/30 border border-emerald-600/50 rounded-xl p-4">
                      <p className="text-white font-bold">{prop.address}</p>
                      <p className="text-emerald-400 text-xs mt-1">${prop.price.toLocaleString()}</p>
                      <p className="text-emerald-400 text-xs">💰 ${prop.monthlyProfit.toLocaleString()}/month profit</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-3">❌ NO BUY ({archive.noArchive.length})</h2>
              {archive.noArchive.length === 0 ? (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center text-slate-400">
                  No properties yet
                </div>
              ) : (
                <div className="space-y-3">
                  {archive.noArchive.map(prop => (
                    <div key={prop.id} className="bg-red-900/30 border border-red-600/50 rounded-xl p-4">
                      <p className="text-white font-bold">{prop.address}</p>
                      <p className="text-red-400 text-xs mt-1">${prop.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700/50">
        <div className="max-w-full mx-auto px-4 py-2 flex justify-around">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center py-3 px-4 rounded-lg transition ${
              activeTab === 'search' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            <span className="text-2xl">🔍</span>
            <span className="text-xs font-bold">Search</span>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex flex-col items-center py-3 px-4 rounded-lg transition ${
              activeTab === 'results' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            <span className="text-2xl">📊</span>
            <span className="text-xs font-bold">Results</span>
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`flex flex-col items-center py-3 px-4 rounded-lg transition ${
              activeTab === 'archive' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            <span className="text-2xl">📦</span>
            <span className="text-xs font-bold">Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RealEstateAnalyzerApp />);
