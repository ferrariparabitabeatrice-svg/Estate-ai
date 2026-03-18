import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, DollarSign, AlertCircle, CheckCircle, Building2, BarChart3, Trash2, Download, RefreshCw, Globe, Zap, Archive, Search, Filter, ThumbsUp, ThumbsDown, Save } from 'lucide-react';

export default function AdvancedRealEstateAnalyzer() {
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
  const [activeTab, setActiveTab] = useState('analyzer');
  const [archive, setArchive] = useState({ yesArchive: [], noArchive: [] });
  const [filterTab, setFilterTab] = useState('all');
  const [searchName, setSearchName] = useState('');

  const platforms = [
    { id: 'auto', name: 'Auto-Detect', icon: '🔍' },
    { id: 'idealista', name: 'Idealista Search', icon: '🏠' },
    { id: 'google', name: 'Google Properties', icon: '🔍' },
    { id: 'luxury', name: 'Luxury Estate', icon: '✨' },
    { id: 'james', name: 'James Edition', icon: '👑' },
    { id: 'manual', name: 'Manual Entry', icon: '📝' }
  ];

  // Simulated Idealista search
  const searchIdealista = async (query) => {
    setLoading(true);
    // Simulated search results from Idealista
    const simulatedResults = [
      {
        id: 'idea-1',
        address: '125 Paseo de Gracia, Barcelona, Spain',
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
        address: '45 Ramblas Avenue, Barcelona, Spain',
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
        address: '200 Gran Vía, Madrid, Spain',
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
        address: '89 Avenida Diagonal, Barcelona, Spain',
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

  const detectPlatform = (url) => {
    if (url.includes('idealista')) return 'idealista';
    if (url.includes('jamesedition')) return 'james';
    if (url.includes('luxuryestate')) return 'luxury';
    if (url.includes('google')) return 'google';
    return 'auto';
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
            energyRating: 'B',
            expenses: { community: 250, utilities: 150 },
            virtualTour: true
          }
        };
      
      case 'james':
        return {
          ...baseData,
          address: 'Villa Solaris, French Riviera, Côte d\'Azur, France',
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
            reference: 'JE-FR-PACA-001',
            features: ['Swimming Pool', 'Wine Cellar', 'Home Cinema', 'Tennis Court', 'Wellness Center'],
            architecture: 'Mediterranean',
            agent: 'Luxury Properties France'
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
            reference: 'LE-NY-PA-500',
            features: ['Concierge Service', 'Private Elevator', 'Rooftop Terrace', 'Smart Home', 'Gym'],
            location: 'Manhattan Prime',
            starRating: '5-Star'
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
            reference: 'GP-FL-MIB-250',
            features: ['Ocean View', 'Pool', 'Smart Home']
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
      const detectedPlatform = selectedPlatform === 'auto' ? detectPlatform(propertyUrl) : selectedPlatform;
      finalData = extractPropertyData(detectedPlatform, propertyUrl);
      setPlatformInfo(`Detected: ${platforms.find(p => p.id === detectedPlatform)?.name || 'Unknown Platform'}`);
    }

    const analysis = calculatePropertyAnalysis(finalData);
    
    const newProperty = {
      id: Date.now(),
      ...finalData,
      ...analysis,
      savedDate: new Date().toLocaleString(),
      buyRecommendation: null
    };

    setProperties([...properties, newProperty]);
    setPropertyUrl('');
    setManualInput(false);
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
    
    const baseRent = {
      1: 1500, 2: 2200, 3: 3000, 4: 4000, 5: 5200, 6: 6500
    };
    const locationMultiplier = {
      'Urban': 1.3,
      'Suburban': 1.0,
      'Rural': 0.7
    };
    
    let monthlyRent = (baseRent[property.bedrooms] || 3000) * locationMultiplier[property.location];
    
    if (isLuxury) {
      monthlyRent *= 1.5;
    }
    
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
    const utilities = property.bedrooms * 150;
    const management = monthlyRent * 0.10;
    
    const luxuryManagement = isLuxury ? purchasePrice * 0.003 / 12 : 0;
    
    const conditionMultiplier = {
      'Excellent': 0,
      'Good': purchasePrice * 0.02,
      'Fair': purchasePrice * 0.08,
      'Poor': purchasePrice * 0.15
    };
    const renovationCost = conditionMultiplier[property.condition] || 0;
    
    const grossAnnualRent = monthlyRent * 12;
    const totalMonthlyExpenses = propertyTaxMonthly + insurance + maintenance + vacancy + management + luxuryManagement;
    const monthlyNetBeforeTax = monthlyRent - totalMonthlyExpenses;
    const monthlyTaxOnRent = grossAnnualRent * rentalTaxRate / 12;
    const monthlyNetAfterTax = monthlyNetBeforeTax - monthlyTaxOnRent;
    const annualNetAfterTax = monthlyNetAfterTax * 12;
    
    const summerMonths = 3;
    const summerGrossRent = summerRent * summerMonths;
    const summerExpenses = totalMonthlyExpenses * summerMonths;
    const summerTaxableIncome = summerGrossRent * rentalTaxRate;
    const summerNetProfit = (summerGrossRent - summerExpenses - summerTaxableIncome) / summerMonths;
    
    const totalInitialInvestment = purchasePrice + closingCosts + renovationCost;
    
    const capRate = (annualNetAfterTax / purchasePrice) * 100;
    const totalROI = (annualNetAfterTax / totalInitialInvestment) * 100;
    
    const appreciationRate = isLuxury ? 0.04 : 0.03;
    const projections = [];
    for (let year = 1; year <= 10; year++) {
      const projectedValue = purchasePrice * Math.pow(1 + appreciationRate, year);
      const appreciationGain = projectedValue - purchasePrice;
      const totalWorth = projectedValue + (annualNetAfterTax * year);
      projections.push({
        year,
        projectedValue: Math.round(projectedValue),
        appreciationGain: Math.round(appreciationGain),
        totalWorth: Math.round(totalWorth),
        totalRentalProfit: Math.round(annualNetAfterTax * year)
      });
    }
    
    let recommendation = 'Strong Buy';
    let recommendationReason = [];
    
    if (capRate < 4) {
      recommendation = 'Hold';
      recommendationReason.push('Cap rate below 4% - moderate returns');
    } else if (capRate >= 6) {
      recommendation = 'Strong Buy';
      recommendationReason.push('Excellent cap rate of ' + capRate.toFixed(2) + '%');
    } else if (capRate >= 5) {
      recommendation = 'Buy';
      recommendationReason.push('Good cap rate of ' + capRate.toFixed(2) + '%');
    }
    
    if (monthlyNetAfterTax < purchasePrice * 0.002) {
      recommendationReason.push('Low monthly cash flow');
    } else {
      recommendationReason.push('Strong cash flow of $' + Math.round(monthlyNetAfterTax) + '/month');
    }
    
    if (isLuxury) {
      recommendationReason.push('Luxury property with ' + appreciationRate * 100 + '% annual appreciation');
    }
    
    const monthlyBreakEvenRent = totalMonthlyExpenses + monthlyTaxOnRent;
    const breakEvenMonths = monthlyNetAfterTax > 0 ? 0 : Math.ceil((closingCosts + renovationCost) / (monthlyNetAfterTax || 1));
    
    return {
      monthlyRent: Math.round(monthlyRent),
      summerRent: Math.round(summerRent),
      closingCosts: Math.round(closingCosts),
      renovationCost: Math.round(renovationCost),
      totalInitialInvestment: Math.round(totalInitialInvestment),
      propertyTaxMonthly: Math.round(propertyTaxMonthly),
      propertyTaxAnnual: Math.round(propertyTaxAnnual),
      insurance: Math.round(insurance),
      maintenance: Math.round(maintenance),
      vacancy: Math.round(vacancy),
      management: Math.round(management),
      luxuryManagement: Math.round(luxuryManagement),
      totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
      monthlyRentalIncome: Math.round(monthlyRent),
      monthlyNetBeforeTax: Math.round(monthlyNetBeforeTax),
      monthlyTaxOnRent: Math.round(monthlyTaxOnRent),
      monthlyNetAfterTax: Math.round(monthlyNetAfterTax),
      annualNetAfterTax: Math.round(annualNetAfterTax),
      summerMonthlyNet: Math.round(summerNetProfit),
      capRate: capRate.toFixed(2),
      totalROI: totalROI.toFixed(2),
      projections,
      recommendation,
      recommendationReason,
      breakEvenMonths,
      appreciationRate: appreciationRate * 100
    };
  };

  const saveToArchive = (property, decision) => {
    const updatedProperty = { ...property, buyRecommendation: decision };
    
    if (decision === 'yes') {
      setArchive(prev => ({
        ...prev,
        yesArchive: [...prev.yesArchive, { ...updatedProperty, archivedDate: new Date().toLocaleString() }]
      }));
    } else {
      setArchive(prev => ({
        ...prev,
        noArchive: [...prev.noArchive, { ...updatedProperty, archivedDate: new Date().toLocaleString() }]
      }));
    }
    
    setProperties(properties.filter(p => p.id !== property.id));
    setSelectedProperty(null);
    alert(`Property saved to ${decision === 'yes' ? 'YES BUY' : 'NO BUY'} archive!`);
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    if (selectedProperty?.id === id) setSelectedProperty(null);
  };

  const deleteArchiveProperty = (id, archiveType) => {
    if (archiveType === 'yes') {
      setArchive(prev => ({
        ...prev,
        yesArchive: prev.yesArchive.filter(p => p.id !== id)
      }));
    } else {
      setArchive(prev => ({
        ...prev,
        noArchive: prev.noArchive.filter(p => p.id !== id)
      }));
    }
  };

  const downloadReport = (property) => {
    const report = `
╔════════════════════════════════════════════════════════════════════════════╗
║          REAL ESTATE INVESTMENT ANALYSIS REPORT - MULTI-PLATFORM           ║
╚════════════════════════════════════════════════════════════════════════════╝

📍 PROPERTY DETAILS
─────────────────────────────────────────────────────────────────────────────
Address:                  ${property.address}
Property Type:            ${property.propertyType}
Bedrooms:                 ${property.bedrooms} | Bathrooms: ${property.bathrooms}
Square Feet:              ${property.squareFeet?.toLocaleString() || 'N/A'} sq ft
Year Built:               ${property.yearBuilt}
Condition:                ${property.condition}
Location Type:            ${property.location}
Analyzed:                 ${property.savedDate}

💰 PURCHASE ANALYSIS
─────────────────────────────────────────────────────────────────────────────
Purchase Price:           $${property.purchasePrice?.toLocaleString() || 'N/A'}
Closing Costs:            $${property.closingCosts?.toLocaleString() || 'N/A'}
Renovation Estimate:      $${property.renovationCost?.toLocaleString() || 'N/A'}
Total Initial Investment: $${property.totalInitialInvestment?.toLocaleString() || 'N/A'}

🏘️ RENTAL INCOME
─────────────────────────────────────────────────────────────────────────────
Monthly Long-Term Rent:   $${property.monthlyRent?.toLocaleString() || 'N/A'}
Summer Short-Term Rate:   $${property.summerRent?.toLocaleString() || 'N/A'}/month
Summer 3-Month Profit:    $${(property.summerMonthlyNet * 3)?.toLocaleString() || 'N/A'}

💵 PROFIT ANALYSIS
─────────────────────────────────────────────────────────────────────────────
Monthly Net Profit:       $${property.monthlyNetAfterTax?.toLocaleString() || 'N/A'}
Annual Net Profit:        $${property.annualNetAfterTax?.toLocaleString() || 'N/A'}

📈 INVESTMENT METRICS
─────────────────────────────────────────────────────────────────────────────
Cap Rate:                 ${property.capRate}%
Total ROI:                ${property.totalROI}%
Annual Appreciation:      ${property.appreciationRate}%

✅ RECOMMENDATION: ${property.recommendation}

Generated: ${new Date().toLocaleString()}
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', `property-analysis-${Date.now()}.txt`);
    element.click();
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #151b28 100%)', fontFamily: "'Lora', serif"}}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-light text-white mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                Real Estate Analyzer Pro
              </h1>
              <p className="text-slate-400">Idealista • Google • James Edition • Luxury Estate + Archive</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-slate-700/50 mb-8">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'analyzer'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Analyzer
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'archive'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Archive className="w-4 h-4 inline mr-2" />
              Archive ({archive.yesArchive.length + archive.noArchive.length})
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* ANALYZER TAB */}
          {activeTab === 'analyzer' && (
            <>
              {/* Platform Selector */}
              <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  <Globe className="w-5 h-5 inline mr-2" />
                  Select Property Source
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {platforms.map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        if (platform.id === 'manual') setManualInput(true);
                        else setManualInput(false);
                      }}
                      className={`py-3 px-4 rounded-lg font-semibold transition text-sm ${
                        selectedPlatform === platform.id
                          ? 'bg-amber-500/40 border-2 border-amber-400 text-amber-300'
                          : 'bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:border-amber-400/50'
                      }`}
                    >
                      <span className="text-lg">{platform.icon}</span>
                      <div>{platform.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Idealista Search */}
              {selectedPlatform === 'idealista' && (
                <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">🏠 Idealista Property Search</h3>
                  <div className="flex gap-4 mb-6">
                    <input
                      type="text"
                      placeholder="Search: Barcelona apartments 4 bedrooms, Madrid villas, etc..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => searchIdealista(searchQuery)}
                      disabled={loading}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                  </div>

                  {/* Search Results */}
                  {idealistaSearchResults.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {idealistaSearchResults.map(result => (
                        <div
                          key={result.id}
                          className="bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 hover:border-amber-400/50 transition cursor-pointer"
                          onClick={() => analyzeProperty(result)}
                        >
                          <h4 className="text-white font-semibold mb-2">{result.address}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-4">
                            <div>${result.price?.toLocaleString()}</div>
                            <div>{result.bedrooms}B • {result.bathrooms}B</div>
                            <div>{result.squareFeet} sq ft</div>
                            <div>Energy: {result.energyRating}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              analyzeProperty(result);
                            }}
                            className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 py-2 rounded-lg font-semibold transition"
                          >
                            Analyze
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* URL Input */}
              {selectedPlatform !== 'manual' && selectedPlatform !== 'idealista' && (
                <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Paste Property Link</h3>
                  <input
                    type="text"
                    placeholder="https://www.idealista.com/... or https://www.jamesedition.com/..."
                    value={propertyUrl}
                    onChange={(e) => setPropertyUrl(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition mb-4"
                  />
                  {platformInfo && <p className="text-sm text-cyan-400 mb-4">✓ {platformInfo}</p>}
                  <button
                    onClick={() => analyzeProperty()}
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Property'}
                  </button>
                </div>
              )}

              {/* Manual Entry */}
              {selectedPlatform === 'manual' && (
                <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Enter Property Details</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Address"
                      value={manualProperty.address}
                      onChange={(e) => setManualProperty({...manualProperty, address: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Purchase Price ($)"
                        value={manualProperty.purchasePrice}
                        onChange={(e) => setManualProperty({...manualProperty, purchasePrice: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="number"
                        placeholder="Year Built"
                        value={manualProperty.yearBuilt}
                        onChange={(e) => setManualProperty({...manualProperty, yearBuilt: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <input
                        type="number"
                        placeholder="Bedrooms"
                        value={manualProperty.bedrooms}
                        onChange={(e) => setManualProperty({...manualProperty, bedrooms: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Bathrooms"
                        value={manualProperty.bathrooms}
                        onChange={(e) => setManualProperty({...manualProperty, bathrooms: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Square Feet"
                        value={manualProperty.squareFeet}
                        onChange={(e) => setManualProperty({...manualProperty, squareFeet: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Pool Area (sq ft)"
                        value={manualProperty.poolArea}
                        onChange={(e) => setManualProperty({...manualProperty, poolArea: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <select
                        value={manualProperty.condition}
                        onChange={(e) => setManualProperty({...manualProperty, condition: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                        <option>Poor</option>
                      </select>
                      <select
                        value={manualProperty.location}
                        onChange={(e) => setManualProperty({...manualProperty, location: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      >
                        <option>Urban</option>
                        <option>Suburban</option>
                        <option>Rural</option>
                      </select>
                      <select
                        value={manualProperty.propertyType}
                        onChange={(e) => setManualProperty({...manualProperty, propertyType: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      >
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Condo</option>
                        <option>Villa</option>
                        <option>Penthouse</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Garage Spaces"
                        value={manualProperty.garageSpaces}
                        onChange={(e) => setManualProperty({...manualProperty, garageSpaces: e.target.value})}
                        className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white"
                      />
                    </div>

                    <label className="flex items-center gap-3 bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manualProperty.luxuryFeatures}
                        onChange={(e) => setManualProperty({...manualProperty, luxuryFeatures: e.target.checked})}
                      />
                      <span className="text-white">✨ Luxury Property</span>
                    </label>

                    <button
                      onClick={() => analyzeProperty()}
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
                    >
                      {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </div>
                </div>
              )}

              {/* Properties Grid */}
              {properties.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-light text-white">Current Analyses</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {properties.map(property => (
                      <div
                        key={property.id}
                        onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
                        className={`bg-gradient-to-br border rounded-2xl p-8 cursor-pointer transition-all ${
                          selectedProperty?.id === property.id
                            ? 'from-amber-900/30 to-orange-900/30 border-amber-500/50'
                            : 'from-slate-800/30 to-slate-700/30 border-slate-700/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-light text-white">{property.address}</h3>
                            <p className="text-slate-400 text-sm">{property.bedrooms}B/{property.bathrooms}B • {property.location}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProperty(property.id);
                            }}
                            className="p-2 hover:bg-red-500/20 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-slate-900/50 rounded-xl p-4">
                            <p className="text-sm text-slate-400">Purchase Price</p>
                            <p className="text-3xl font-light text-amber-400">${property.purchasePrice?.toLocaleString()}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-900/30 border border-emerald-600/30 rounded-xl p-3">
                              <p className="text-xs text-emerald-300">Monthly Profit</p>
                              <p className="text-lg font-semibold text-emerald-300">${property.monthlyNetAfterTax?.toLocaleString()}</p>
                            </div>
                            <div className="bg-purple-900/30 border border-purple-600/30 rounded-xl p-3">
                              <p className="text-xs text-purple-300">Cap Rate</p>
                              <p className="text-lg font-semibold text-purple-300">{property.capRate}%</p>
                            </div>
                          </div>

                          {selectedProperty?.id === property.id && (
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveToArchive(property, 'yes');
                                }}
                                className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                              >
                                <ThumbsUp className="w-4 h-4" /> YES BUY
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveToArchive(property, 'no');
                                }}
                                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                              >
                                <ThumbsDown className="w-4 h-4" /> NO BUY
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Analysis */}
              {selectedProperty && (
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur border border-slate-600/50 rounded-2xl p-8 mt-8 animate-in">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-4xl font-light text-white mb-2">{selectedProperty.address}</h2>
                      <p className="text-slate-400">Analyzed: {selectedProperty.savedDate}</p>
                    </div>
                    <button
                      onClick={() => downloadReport(selectedProperty)}
                      className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 rounded-lg font-semibold"
                    >
                      <Download className="w-4 h-4" /> Report
                    </button>
                  </div>

                  {/* Financial Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-300 mb-4">Investment</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Purchase Price</span>
                          <span className="text-white">${selectedProperty.purchasePrice?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Closing Costs</span>
                          <span className="text-white">${selectedProperty.closingCosts?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Renovation</span>
                          <span className="text-white">${selectedProperty.renovationCost?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-slate-600/30 font-semibold text-amber-400">
                          <span>Total</span>
                          <span>${selectedProperty.totalInitialInvestment?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-300 mb-4">Profit Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Monthly Rent</span>
                          <span className="text-blue-400">${selectedProperty.monthlyRent?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Expenses</span>
                          <span className="text-red-400">-${selectedProperty.totalMonthlyExpenses?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tax (25%)</span>
                          <span className="text-red-400">-${selectedProperty.monthlyTaxOnRent?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-slate-600/30 font-bold text-emerald-400">
                          <span>Net Monthly</span>
                          <span>${selectedProperty.monthlyNetAfterTax?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-emerald-400">
                          <span>Net Annual</span>
                          <span>${selectedProperty.annualNetAfterTax?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-600/50">
                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <p className="text-sm text-slate-400">Cap Rate</p>
                      <p className="text-3xl font-bold text-blue-400">{selectedProperty.capRate}%</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <p className="text-sm text-slate-400">Total ROI</p>
                      <p className="text-3xl font-bold text-emerald-400">{selectedProperty.totalROI}%</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <p className="text-sm text-slate-400">Appreciation</p>
                      <p className="text-3xl font-bold text-purple-400">{selectedProperty.appreciationRate}%/yr</p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className={`rounded-xl p-6 ${
                    selectedProperty.recommendation === 'Strong Buy' ? 'bg-emerald-900/40 border border-emerald-500/50' : 'bg-blue-900/40 border border-blue-500/50'
                  }`}>
                    <p className="font-bold text-lg mb-2">
                      {selectedProperty.recommendation === 'Strong Buy' ? '✅' : '✓'} {selectedProperty.recommendation}
                    </p>
                    {selectedProperty.recommendationReason?.map((r, i) => (
                      <p key={i} className="text-slate-300 text-sm">• {r}</p>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ARCHIVE TAB */}
          {activeTab === 'archive' && (
            <div className="space-y-8">
              {/* YES BUY Archive */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ThumbsUp className="w-8 h-8 text-emerald-400" />
                  <h2 className="text-3xl font-light text-emerald-400">YES - BUY ({archive.yesArchive.length})</h2>
                </div>
                
                {archive.yesArchive.length === 0 ? (
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-12 text-center">
                    <p className="text-slate-400">No properties in YES BUY archive yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {archive.yesArchive.map(property => (
                      <div key={property.id} className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-600/50 rounded-2xl p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-light text-white">{property.address}</h3>
                            <p className="text-emerald-400 text-sm">✓ Archived: {property.archivedDate}</p>
                          </div>
                          <button
                            onClick={() => deleteArchiveProperty(property.id, 'yes')}
                            className="p-2 hover:bg-red-500/20 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-slate-900/50 rounded-xl p-4">
                            <p className="text-sm text-slate-400">Price</p>
                            <p className="text-2xl font-light text-amber-400">${property.purchasePrice?.toLocaleString()}</p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-slate-400">Monthly</p>
                              <p className="text-emerald-400 font-semibold">${property.monthlyNetAfterTax?.toLocaleString()}</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-slate-400">Cap Rate</p>
                              <p className="text-blue-400 font-semibold">{property.capRate}%</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-slate-400">ROI</p>
                              <p className="text-purple-400 font-semibold">{property.totalROI}%</p>
                            </div>
                          </div>

                          <button
                            onClick={() => downloadReport(property)}
                            className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" /> Download Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* NO BUY Archive */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ThumbsDown className="w-8 h-8 text-red-400" />
                  <h2 className="text-3xl font-light text-red-400">NO - DON'T BUY ({archive.noArchive.length})</h2>
                </div>
                
                {archive.noArchive.length === 0 ? (
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-12 text-center">
                    <p className="text-slate-400">No properties in NO BUY archive yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {archive.noArchive.map(property => (
                      <div key={property.id} className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-600/50 rounded-2xl p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-light text-white">{property.address}</h3>
                            <p className="text-red-400 text-sm">✗ Archived: {property.archivedDate}</p>
                          </div>
                          <button
                            onClick={() => deleteArchiveProperty(property.id, 'no')}
                            className="p-2 hover:bg-red-500/20 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-slate-900/50 rounded-xl p-4">
                            <p className="text-sm text-slate-400">Price</p>
                            <p className="text-2xl font-light text-amber-400">${property.purchasePrice?.toLocaleString()}</p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-slate-400">Monthly</p>
                              <p className="text-red-400 font-semibold">${property.monthlyNetAfterTax?.toLocaleString()}</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-slate-400">Cap Rate</p>
                              <p className="text-blue-400 font-semibold">{property.capRate}%</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-slate-400">ROI</p>
                              <p className="text-purple-400 font-semibold">{property.totalROI}%</p>
                            </div>
                          </div>

                          <button
                            onClick={() => downloadReport(property)}
                            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" /> Download Report
                          </button>
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
