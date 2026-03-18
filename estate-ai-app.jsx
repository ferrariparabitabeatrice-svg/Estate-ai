import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, DollarSign, AlertCircle, CheckCircle, Building2, BarChart3, Trash2, Download, RefreshCw, Globe, Zap, Archive, Search, Filter, ThumbsUp, ThumbsDown, Save, Menu, X, Share2, Plus } from 'lucide-react';

export default function RealEstateAnalyzerApp() {
  const [propertyUrl, setPropertyUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [idealistaSearchResults, setIdealistaSearchResults] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('auto');
  const [manualInput, setManualInput] = useState(false);
  const [manualProperty, setManualProperty] = useState({
    address: '',
    purchasePrice: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    condition: 'Good',
    location: 'Urban',
    propertyType: 'House',
    luxuryFeatures: false,
    poolArea: 0,
    garageSpaces: 0,
    yearBuilt: ''
  });
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platformInfo, setPlatformInfo] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [archive, setArchive] = useState({ yesArchive: [], noArchive: [] });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const platforms = [
    { id: 'auto', name: 'Auto-Detect', icon: '🔍' },
    { id: 'idealista', name: 'Idealista', icon: '🏠' },
    { id: 'google', name: 'Google', icon: '🔍' },
    { id: 'luxury', name: 'Luxury', icon: '✨' },
    { id: 'james', name: 'James', icon: '👑' },
    { id: 'manual', name: 'Manual', icon: '📝' }
  ];

  // Install app handling
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    }
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Real Estate Analyzer',
          text: 'Analyze real estate investments with AI-powered insights',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    }
  };

  const searchIdealista = async (query) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const simulatedResults = [
      {
        id: 'idea-1',
        address: '125 Paseo de Gracia, Barcelona',
        price: 750000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        energyRating: 'B',
        url: 'https://www.idealista.com/inmueble/125',
        platform: 'idealista'
      },
      {
        id: 'idea-2',
        address: '45 Ramblas Avenue, Barcelona',
        price: 620000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2100,
        energyRating: 'C',
        url: 'https://www.idealista.com/inmueble/45',
        platform: 'idealista'
      },
      {
        id: 'idea-3',
        address: '200 Gran Vía, Madrid',
        price: 950000,
        bedrooms: 5,
        bathrooms: 3,
        squareFeet: 3200,
        energyRating: 'A',
        url: 'https://www.idealista.com/inmueble/200',
        platform: 'idealista'
      },
      {
        id: 'idea-4',
        address: '89 Avenida Diagonal, Barcelona',
        price: 550000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1900,
        energyRating: 'D',
        url: 'https://www.idealista.com/inmueble/89',
        platform: 'idealista'
      }
    ];
    
    setIdealistaSearchResults(simulatedResults);
    setLoading(false);
  };

  const extractPropertyData = (platform, url) => {
    const baseData = {
      address: '',
      purchasePrice: 0,
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      condition: 'Good',
      location: 'Urban',
      propertyType: 'House',
      yearBuilt: 2005,
      luxuryFeatures: false,
      poolArea: 0,
      garageSpaces: 0,
      platformData: {}
    };

    switch(platform) {
      case 'idealista':
        return {
          ...baseData,
          address: '125 Paseo de Gracia, Barcelona, Spain',
          purchasePrice: 750000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2500,
          condition: 'Good',
          location: 'Urban',
          propertyType: 'Apartment',
          yearBuilt: 2010,
          platformData: {
            source: 'Idealista.com',
            reference: 'IDEA-2024-BC-125',
            energyRating: 'B'
          }
        };
      case 'james':
        return {
          ...baseData,
          address: 'Villa Solaris, French Riviera, France',
          purchasePrice: 3500000,
          bedrooms: 6,
          bathrooms: 5,
          squareFeet: 5800,
          condition: 'Excellent',
          location: 'Urban',
          propertyType: 'Villa',
          yearBuilt: 1998,
          luxuryFeatures: true,
          poolArea: 500,
          garageSpaces: 4,
          platformData: {
            source: 'James Edition',
            reference: 'JE-FR-PACA-001'
          }
        };
      case 'luxury':
        return {
          ...baseData,
          address: '500 Park Avenue Penthouse, New York, NY',
          purchasePrice: 8500000,
          bedrooms: 5,
          bathrooms: 4,
          squareFeet: 4200,
          condition: 'Excellent',
          location: 'Urban',
          propertyType: 'Penthouse',
          yearBuilt: 2015,
          luxuryFeatures: true,
          poolArea: 0,
          garageSpaces: 3,
          platformData: {
            source: 'Luxury Estate',
            reference: 'LE-NY-PA-500'
          }
        };
      case 'google':
        return {
          ...baseData,
          address: '250 Ocean Boulevard, Miami Beach, FL',
          purchasePrice: 2200000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 3500,
          condition: 'Good',
          location: 'Urban',
          propertyType: 'House',
          yearBuilt: 2005,
          poolArea: 400,
          garageSpaces: 2,
          platformData: {
            source: 'Google Properties',
            reference: 'GP-FL-MIB-250'
          }
        };
      default:
        return baseData;
    }
  };

  const analyzeProperty = async (propertyData = null) => {
    if (!propertyUrl && !manualInput && !propertyData) {
      alert('Please enter a property URL or use manual entry');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let finalData;
    
    if (propertyData) {
      finalData = {
        ...propertyData,
        purchasePrice: parseFloat(propertyData.price),
        bedrooms: parseInt(propertyData.bedrooms),
        bathrooms: parseInt(propertyData.bathrooms),
        squareFeet: parseInt(propertyData.squareFeet),
        poolArea: 0,
        garageSpaces: 0
      };
    } else if (manualInput) {
      finalData = {
        ...manualProperty,
        purchasePrice: parseFloat(manualProperty.purchasePrice),
        bedrooms: parseInt(manualProperty.bedrooms),
        bathrooms: parseInt(manualProperty.bathrooms),
        squareFeet: parseInt(manualProperty.squareFeet),
        poolArea: parseInt(manualProperty.poolArea) || 0,
        garageSpaces: parseInt(manualProperty.garageSpaces) || 0,
        yearBuilt: parseInt(manualProperty.yearBuilt) || 2005
      };
    } else {
      const detectedPlatform = selectedPlatform === 'auto' ? 'google' : selectedPlatform;
      finalData = extractPropertyData(detectedPlatform, propertyUrl);
    }

    const analysis = calculatePropertyAnalysis(finalData);
    
    const newProperty = {
      id: Date.now(),
      ...finalData,
      ...analysis,
      savedDate: new Date().toLocaleString()
    };

    setProperties([...properties, newProperty]);
    setPropertyUrl('');
    setManualInput(false);
    setActiveTab('results');
    setManualProperty({
      address: '',
      purchasePrice: '',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      condition: 'Good',
      location: 'Urban',
      propertyType: 'House',
      luxuryFeatures: false,
      poolArea: 0,
      garageSpaces: 0,
      yearBuilt: ''
    });
    setLoading(false);
    setSelectedProperty(newProperty);
  };

  const calculatePropertyAnalysis = (property) => {
    const purchasePrice = property.purchasePrice;
    const isLuxury = property.luxuryFeatures;
    
    const baseRent = { 1: 1500, 2: 2200, 3: 3000, 4: 4000, 5: 5200, 6: 6500 };
    const locationMultiplier = { 'Urban': 1.3, 'Suburban': 1.0, 'Rural': 0.7 };
    
    let monthlyRent = (baseRent[property.bedrooms] || 3000) * locationMultiplier[property.location];
    if (isLuxury) monthlyRent *= 1.5;
    if (property.poolArea > 200) monthlyRent *= 1.15;
    if (property.garageSpaces >= 3) monthlyRent *= 1.10;
    
    const summerRent = monthlyRent * 1.4;
    const closingCosts = purchasePrice * (isLuxury ? 0.08 : 0.05);
    const propertyTaxAnnual = purchasePrice * (isLuxury ? 0.015 : 0.012);
    const propertyTaxMonthly = propertyTaxAnnual / 12;
    const rentalTaxRate = isLuxury ? 0.30 : 0.25;
    
    const insurance = purchasePrice * (isLuxury ? 0.012 : 0.006) / 12;
    const maintenance = monthlyRent * (isLuxury ? 0.12 : 0.08);
    const vacancy = monthlyRent * 0.05;
    const management = monthlyRent * 0.10;
    const luxuryManagement = isLuxury ? purchasePrice * 0.003 / 12 : 0;
    
    const conditionMultiplier = { 'Excellent': 0, 'Good': purchasePrice * 0.02, 'Fair': purchasePrice * 0.08, 'Poor': purchasePrice * 0.15 };
    const renovationCost = conditionMultiplier[property.condition] || 0;
    
    const grossAnnualRent = monthlyRent * 12;
    const totalMonthlyExpenses = propertyTaxMonthly + insurance + maintenance + vacancy + management + luxuryManagement;
    const monthlyNetBeforeTax = monthlyRent - totalMonthlyExpenses;
    const monthlyTaxOnRent = grossAnnualRent * rentalTaxRate / 12;
    const monthlyNetAfterTax = monthlyNetBeforeTax - monthlyTaxOnRent;
    const annualNetAfterTax = monthlyNetAfterTax * 12;
    
    const totalInitialInvestment = purchasePrice + closingCosts + renovationCost;
    const capRate = (annualNetAfterTax / purchasePrice) * 100;
    const totalROI = (annualNetAfterTax / totalInitialInvestment) * 100;
    
    let recommendation = 'Strong Buy';
    if (capRate < 4) recommendation = 'Hold';
    else if (capRate < 5) recommendation = 'Buy';

    return {
      monthlyRent: Math.round(monthlyRent),
      summerRent: Math.round(summerRent),
      closingCosts: Math.round(closingCosts),
      renovationCost: Math.round(renovationCost),
      totalInitialInvestment: Math.round(totalInitialInvestment),
      propertyTaxMonthly: Math.round(propertyTaxMonthly),
      insurance: Math.round(insurance),
      maintenance: Math.round(maintenance),
      vacancy: Math.round(vacancy),
      management: Math.round(management),
      totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
      monthlyNetAfterTax: Math.round(monthlyNetAfterTax),
      annualNetAfterTax: Math.round(annualNetAfterTax),
      monthlyTaxOnRent: Math.round(monthlyTaxOnRent),
      capRate: capRate.toFixed(2),
      totalROI: totalROI.toFixed(2),
      recommendation
    };
  };

  const saveToArchive = (property, decision) => {
    if (decision === 'yes') {
      setArchive(prev => ({
        ...prev,
        yesArchive: [...prev.yesArchive, { ...property, archivedDate: new Date().toLocaleString() }]
      }));
    } else {
      setArchive(prev => ({
        ...prev,
        noArchive: [...prev.noArchive, { ...property, archivedDate: new Date().toLocaleString() }]
      }));
    }
    setProperties(properties.filter(p => p.id !== property.id));
    setSelectedProperty(null);
    setActiveTab('archive');
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" style={{fontFamily: "'Poppins', sans-serif"}}>
      {/* Mobile App Header */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 z-50">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Estate AI</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {!isInstalled && installPrompt && (
              <button
                onClick={handleInstallClick}
                className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-3 py-1 rounded-lg font-semibold"
              >
                Install
              </button>
            )}
            <button
              onClick={handleShareApp}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
            >
              <Share2 className="w-5 h-5 text-slate-300" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-20 px-4">
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700/50 md:hidden">
          <div className="max-w-full mx-auto px-4 py-2 flex justify-around">
            {[
              { id: 'search', icon: Search, label: 'Search' },
              { id: 'results', icon: Building2, label: 'Results', badge: properties.length },
              { id: 'archive', icon: Archive, label: 'Archive', badge: archive.yesArchive.length + archive.noArchive.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-semibold">{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="text-xs bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center mt-1">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* SEARCH TAB */}
          {activeTab === 'search' && (
            <div className="space-y-4 pb-6">
              <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">🏠 Search Properties</h2>
                
                {/* Platform Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {platforms.map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        if (platform.id === 'manual') setManualInput(true);
                        else setManualInput(false);
                      }}
                      className={`whitespace-nowrap py-2 px-4 rounded-lg font-semibold transition text-sm ${
                        selectedPlatform === platform.id
                          ? 'bg-amber-500/40 border-2 border-amber-400 text-amber-300'
                          : 'bg-slate-700/30 border border-slate-600/50 text-slate-300'
                      }`}
                    >
                      {platform.icon} {platform.name}
                    </button>
                  ))}
                </div>

                {/* Idealista Search */}
                {selectedPlatform === 'idealista' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Barcelona 4bed, Madrid villa..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => searchIdealista(searchQuery)}
                      disabled={loading}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition"
                    >
                      {loading ? '🔄 Searching...' : '🔍 Search'}
                    </button>

                    {idealistaSearchResults.length > 0 && (
                      <div className="space-y-3 mt-4">
                        {idealistaSearchResults.map(result => (
                          <div
                            key={result.id}
                            className="bg-slate-900/50 border border-slate-600/50 rounded-xl p-4"
                          >
                            <h4 className="text-white font-semibold mb-2">{result.address}</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-3">
                              <div className="font-bold text-amber-400">${result.price?.toLocaleString()}</div>
                              <div>{result.bedrooms}B • {result.bathrooms}B</div>
                            </div>
                            <button
                              onClick={() => analyzeProperty(result)}
                              className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 py-2 rounded-lg font-bold text-sm"
                            >
                              📊 Analyze
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* URL Input */}
                {selectedPlatform !== 'manual' && selectedPlatform !== 'idealista' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Paste property link..."
                      value={propertyUrl}
                      onChange={(e) => setPropertyUrl(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => analyzeProperty()}
                      disabled={loading}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition"
                    >
                      {loading ? '🔄 Analyzing...' : '📊 Analyze'}
                    </button>
                  </div>
                )}

                {/* Manual Entry */}
                {selectedPlatform === 'manual' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Address"
                      value={manualProperty.address}
                      onChange={(e) => setManualProperty({...manualProperty, address: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Purchase Price ($)"
                      value={manualProperty.purchasePrice}
                      onChange={(e) => setManualProperty({...manualProperty, purchasePrice: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input type="number" placeholder="Beds" value={manualProperty.bedrooms} onChange={(e) => setManualProperty({...manualProperty, bedrooms: e.target.value})} className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm" />
                      <input type="number" placeholder="Baths" value={manualProperty.bathrooms} onChange={(e) => setManualProperty({...manualProperty, bathrooms: e.target.value})} className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm" />
                      <input type="number" placeholder="Sq Ft" value={manualProperty.squareFeet} onChange={(e) => setManualProperty({...manualProperty, squareFeet: e.target.value})} className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <select value={manualProperty.condition} onChange={(e) => setManualProperty({...manualProperty, condition: e.target.value})} className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white text-sm">
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                      <option>Poor</option>
                    </select>
                    <button
                      onClick={() => analyzeProperty()}
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition"
                    >
                      {loading ? '🔄 Analyzing...' : '✅ Analyze'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RESULTS TAB */}
          {activeTab === 'results' && (
            <div className="space-y-4 pb-6">
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No properties analyzed yet</p>
                </div>
              ) : (
                <>
                  {properties.map(property => (
                    <div
                      key={property.id}
                      onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
                      className={`bg-gradient-to-br border rounded-2xl p-6 cursor-pointer transition ${
                        selectedProperty?.id === property.id
                          ? 'from-amber-900/30 to-orange-900/30 border-amber-500/50'
                          : 'from-slate-800/30 to-slate-700/30 border-slate-700/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-white">{property.address}</h3>
                        <button onClick={(e) => { e.stopPropagation(); deleteProperty(property.id); }} className="p-1 hover:bg-red-500/20 rounded">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-amber-400 font-bold text-xl">${property.purchasePrice?.toLocaleString()}</p>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="bg-blue-900/30 rounded-lg p-2 text-blue-300">
                            <p className="text-xs opacity-75">Rent</p>
                            <p className="font-bold">${property.monthlyRent?.toLocaleString()}</p>
                          </div>
                          <div className="bg-emerald-900/30 rounded-lg p-2 text-emerald-300">
                            <p className="text-xs opacity-75">Profit</p>
                            <p className="font-bold">${property.monthlyNetAfterTax?.toLocaleString()}</p>
                          </div>
                          <div className="bg-purple-900/30 rounded-lg p-2 text-purple-300">
                            <p className="text-xs opacity-75">Cap Rate</p>
                            <p className="font-bold">{property.capRate}%</p>
                          </div>
                        </div>

                        {selectedProperty?.id === property.id && (
                          <div className="space-y-3 mt-4 pt-4 border-t border-slate-600/30">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div><p className="text-slate-400">Annual Profit</p><p className="text-emerald-400 font-bold">${property.annualNetAfterTax?.toLocaleString()}</p></div>
                              <div><p className="text-slate-400">Total Investment</p><p className="text-amber-400 font-bold">${property.totalInitialInvestment?.toLocaleString()}</p></div>
                              <div><p className="text-slate-400">ROI</p><p className="text-blue-400 font-bold">{property.totalROI}%</p></div>
                              <div><p className="text-slate-400">Summer Rent</p><p className="text-orange-400 font-bold">${property.summerRent?.toLocaleString()}</p></div>
                            </div>

                            {/* Expenses Breakdown */}
                            <div className="bg-slate-900/50 rounded-xl p-3">
                              <p className="text-xs text-slate-400 font-semibold mb-2">Monthly Expenses</p>
                              <div className="space-y-1 text-xs text-slate-300">
                                <div className="flex justify-between"><span>Tax</span><span className="text-red-400">${property.propertyTaxMonthly?.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Insurance</span><span className="text-red-400">${property.insurance?.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Maintenance</span><span className="text-red-400">${property.maintenance?.toLocaleString()}</span></div>
                                <div className="flex justify-between border-t border-slate-700 pt-1 mt-1"><span className="font-bold">Total</span><span className="text-red-400 font-bold">${property.totalMonthlyExpenses?.toLocaleString()}</span></div>
                              </div>
                            </div>

                            {/* Recommendation */}
                            <div className={`rounded-lg p-3 text-center ${
                              property.recommendation === 'Strong Buy' ? 'bg-emerald-900/40 border border-emerald-500/30' : 'bg-blue-900/40 border border-blue-500/30'
                            }`}>
                              <p className={`font-bold text-sm ${property.recommendation === 'Strong Buy' ? 'text-emerald-300' : 'text-blue-300'}`}>
                                {property.recommendation === 'Strong Buy' ? '✅' : '✓'} {property.recommendation}
                              </p>
                            </div>

                            {/* Archive Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); saveToArchive(property, 'yes'); }}
                                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1"
                              >
                                <ThumbsUp className="w-4 h-4" /> YES
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); saveToArchive(property, 'no'); }}
                                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1"
                              >
                                <ThumbsDown className="w-4 h-4" /> NO
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* ARCHIVE TAB */}
          {activeTab === 'archive' && (
            <div className="space-y-6 pb-6">
              {/* YES Archive */}
              <div>
                <h2 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" /> YES BUY ({archive.yesArchive.length})
                </h2>
                {archive.yesArchive.length === 0 ? (
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center text-slate-400 text-sm">
                    No properties yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {archive.yesArchive.map(property => (
                      <div key={property.id} className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-600/50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-bold text-sm">{property.address}</p>
                            <p className="text-emerald-400 text-xs">✓ {property.archivedDate}</p>
                          </div>
                          <button onClick={() => setArchive(prev => ({ ...prev, yesArchive: prev.yesArchive.filter(p => p.id !== property.id) }))} className="p-1">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div><p className="text-slate-400">Price</p><p className="text-amber-400 font-bold">${property.purchasePrice?.toLocaleString()}</p></div>
                          <div><p className="text-slate-400">Monthly</p><p className="text-emerald-400 font-bold">${property.monthlyNetAfterTax?.toLocaleString()}</p></div>
                          <div><p className="text-slate-400">Cap Rate</p><p className="text-blue-400 font-bold">{property.capRate}%</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* NO Archive */}
              <div>
                <h2 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                  <ThumbsDown className="w-5 h-5" /> NO BUY ({archive.noArchive.length})
                </h2>
                {archive.noArchive.length === 0 ? (
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center text-slate-400 text-sm">
                    No properties yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {archive.noArchive.map(property => (
                      <div key={property.id} className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-600/50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-bold text-sm">{property.address}</p>
                            <p className="text-red-400 text-xs">✗ {property.archivedDate}</p>
                          </div>
                          <button onClick={() => setArchive(prev => ({ ...prev, noArchive: prev.noArchive.filter(p => p.id !== property.id) }))} className="p-1">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div><p className="text-slate-400">Price</p><p className="text-amber-400 font-bold">${property.purchasePrice?.toLocaleString()}</p></div>
                          <div><p className="text-slate-400">Monthly</p><p className="text-red-400 font-bold">${property.monthlyNetAfterTax?.toLocaleString()}</p></div>
                          <div><p className="text-slate-400">Cap Rate</p><p className="text-blue-400 font-bold">{property.capRate}%</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
