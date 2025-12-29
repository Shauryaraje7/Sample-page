import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Trophy, Zap, BarChart3, Crown, ChevronRight, Search, Filter, Clock, CheckCircle, Activity, TrendingUp as TrendingUpIcon, Globe, Sparkles, Target, Award, Shield, Rocket } from 'lucide-react';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const markets = [
    {
      id: 1,
      icon: '🏛️',
      title: 'Presidential Election Winner 2024',
      category: 'Politics',
      status: 'Active',
      volume: '$1.7B',
      participants: '45.2K',
      trend: 'up',
      options: [
        { name: 'Donald Trump', percentage: 55, change: '+2%', volume: '$1.7b', color: 'red' },
        { name: 'Kamala Harris', percentage: 44, change: '-1%', volume: '$1.5b', color: 'blue' }
      ]
    },
    {
      id: 2,
      icon: '🗳️',
      title: 'Popular Vote Winner 2024',
      category: 'Politics',
      status: 'Active',
      volume: '$341.2M',
      participants: '18.7K',
      trend: 'up',
      options: [
        { name: 'Kamala Harris', percentage: 70, change: '+5%', volume: '$341.2m', color: 'blue' },
        { name: 'Donald Trump', percentage: 29, change: '-3%', volume: '$120m', color: 'red' }
      ]
    },
    {
      id: 3,
      icon: '👔',
      title: 'Democratic VP nominee on election day?',
      category: 'Politics',
      status: 'Settled',
      volume: '$68.7M',
      participants: '8.4K',
      trend: 'neutral',
      options: [
        { name: 'Tim Walz', percentage: 98, change: '—', volume: '$68.7m', color: 'blue' },
        { name: 'Michelle Obama', percentage: 1, change: '—', volume: '$2.1m', color: 'blue' }
      ]
    },
    {
      id: 4,
      icon: '🏈',
      title: 'Super Bowl Champion 2025',
      category: 'Sports',
      status: 'Active',
      volume: '$84.9M',
      participants: '12.3K',
      trend: 'up',
      options: [
        { name: 'Chiefs', percentage: 17, change: '+3%', volume: '$84.9m', color: 'red' },
        { name: 'Ravens', percentage: 11, change: '-2%', volume: '$52.3m', color: 'purple' }
      ]
    },
    {
      id: 5,
      icon: '💰',
      title: 'Fed Interest Rates: November 2024',
      category: 'Finance',
      status: 'Active',
      volume: '$23.0M',
      participants: '3.4K',
      trend: 'up',
      options: [
        { name: '75+ bps decrease', percentage: 1, change: '—', volume: '$23.0m', color: 'green' },
        { name: '50 bps decrease', percentage: 6, change: '+2%', volume: '$18.5m', color: 'green' }
      ]
    },
    {
      id: 6,
      icon: '⚖️',
      title: 'Balance of Power: 2024 Election',
      category: 'Politics',
      status: 'Active',
      volume: '$27.3M',
      participants: '5.8K',
      trend: 'down',
      options: [
        { name: 'Republicans sweep', percentage: 38, change: '+4%', volume: '$27.3m', color: 'red' },
        { name: 'D Prez, D House, R Senate', percentage: 26, change: '-2%', volume: '$19.8m', color: 'purple' }
      ]
    },
    {
      id: 7,
      icon: '🏆',
      title: "Ballon d'Or Winner",
      category: 'Sports',
      status: 'Upcoming',
      volume: '$21.4M',
      participants: '4.2K',
      trend: 'up',
      options: [
        { name: 'Vinicius Jr', percentage: 87, change: '+12%', volume: '$21.4m', color: 'gold' },
        { name: 'Rodri', percentage: 7, change: '-5%', volume: '$3.2m', color: 'gold' }
      ]
    },
    {
      id: 8,
      icon: '⚽',
      title: 'La Liga Winner',
      category: 'Sports',
      status: 'Active',
      volume: '$1.4M',
      participants: '2.1K',
      trend: 'up',
      options: [
        { name: 'Real Madrid', percentage: 58, change: '+3%', volume: '$1.4m', color: 'white' },
        { name: 'Barcelona', percentage: 37, change: '-1%', volume: '$980k', color: 'blue' }
      ]
    },
    {
      id: 9,
      icon: '🌡️',
      title: 'Global Average Temperature 2024',
      category: 'Climate',
      status: 'Active',
      volume: '$12.8M',
      participants: '3.7K',
      trend: 'up',
      options: [
        { name: 'Record High', percentage: 72, change: '+8%', volume: '$8.9m', color: 'orange' },
        { name: 'Below Record', percentage: 28, change: '-2%', volume: '$3.9m', color: 'cyan' }
      ]
    }
  ];

  const categories = ['All', 'Politics', 'Sports', 'Finance', 'Climate', 'Technology'];
  const statusColors = {
    'Active': 'bg-gradient-to-r from-green-400 to-emerald-500 text-white',
    'Settled': 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white',
    'Upcoming': 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
  };

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || market.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`,
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 10 + 10 + 's',
          }}
        />
      ))}
    </div>
  );

  const AnimatedBackground = () => (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `
        }}
      />
    </div>
  );

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-twinkle"
              style={{
                width: '2px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center animate-fade-in">
          <div className="relative mb-12">
            <div className="absolute inset-0 animate-ping-slow opacity-20">
              <div className="w-40 h-40 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl" />
            </div>
            <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl shadow-2xl animate-glow">
              <BarChart3 className="w-16 h-16 text-white animate-float-slow" />
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-xl" />
            </div>
          </div>
          
          <h1 className="text-7xl font-bold text-white mb-6 animate-slide-up tracking-tighter">
            Predict<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">X</span>
            <Sparkles className="inline-block w-10 h-10 ml-3 text-yellow-300 animate-sparkle" />
          </h1>
          
          <div className="relative mb-10 animate-slide-up-delay">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 animate-pulse" />
            <p className="relative text-2xl text-cyan-100 font-semibold bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm px-8 py-4 rounded-lg">
              <Zap className="inline-block w-6 h-6 mr-3 text-yellow-300 animate-bounce" />
              Next-Gen Prediction Markets
              <Zap className="inline-block w-6 h-6 ml-3 text-yellow-300 animate-bounce" />
            </p>
          </div>
          
          <div className="mt-12 animate-slide-up-delay-2">
            <div className="relative inline-block">
              <div className="h-2 w-72 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full animate-loading-bar" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      
      {/* Animated cursor effect */}
      <div 
        className="fixed pointer-events-none z-50 w-96 h-96"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          transition: 'left 0.1s, top 0.1s',
        }}
      />

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-2 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  Predict<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">X</span>
                  <Sparkles className="inline-block w-4 h-4 ml-1 text-yellow-400" />
                </span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                {['Markets', 'Portfolio', 'Leaderboard', 'Insights', 'API'].map((item, idx) => (
                  <a
                    key={item}
                    href="#"
                    className="relative text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300" />
                <button className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                  Connect Wallet
                  <Rocket className="inline-block w-4 h-4 ml-2 animate-bounce-slow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Animated Stats Bar */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3 animate-fade-in-down">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      Prediction Markets
                    </span>
                    <div className="inline-block ml-3">
                      <Target className="w-8 h-8 text-blue-500 animate-pulse" />
                    </div>
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Real-time odds and trading across global events
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto animate-stagger">
                  {[
                    { icon: DollarSign, label: '24h Volume', value: '$2.8B', color: 'green', delay: 0 },
                    { icon: Users, label: 'Traders', value: '128.4K', color: 'blue', delay: 0.1 },
                    { icon: Activity, label: 'Markets', value: '257', color: 'purple', delay: 0.2 },
                    { icon: TrendingUpIcon, label: 'Accuracy', value: '94.2%', color: 'orange', delay: 0.3 }
                  ].map((stat, idx) => (
                    <div 
                      key={idx}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group/stat"
                      style={{ animationDelay: `${stat.delay}s` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r from-${stat.color}-100 to-${stat.color}-50`}>
                          <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                        </div>
                        <span className="text-xs text-gray-500">{stat.label}</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900 group-hover/stat:scale-110 transition-transform">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Search markets by title or category..."
                    className="relative w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                  {categories.map((category, idx) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`relative px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                        filterCategory === category
                          ? 'text-white shadow-lg'
                          : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
                      }`}
                      style={{ animationDelay: `${0.1 * idx}s` }}
                    >
                      {filterCategory === category && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl" />
                      )}
                      <span className="relative font-medium">
                        {category}
                        {filterCategory === category && (
                          <Sparkles className="inline-block w-3 h-3 ml-2" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredMarkets.map((market, index) => (
            <div
              key={market.id}
              className="group animate-card-enter"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedMarket(selectedMarket === market.id ? null : market.id)}
            >
              <div className="relative">
                {/* Card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                
                {/* Main card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                  {/* Trend indicator */}
                  {market.trend === 'up' && (
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse-slow opacity-90">
                      <TrendingUp className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Market Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                          {market.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[market.status]} shadow-md`}>
                              {market.status}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              {market.category}
                            </span>
                          </div>
                          <h3 className="text-gray-900 font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {market.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Market Stats */}
                    <div className="flex items-center justify-between mb-6 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700 font-semibold">{market.volume}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700 font-semibold">{market.participants}</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        selectedMarket === market.id ? 'rotate-90 text-blue-500' : 'group-hover:translate-x-1'
                      }`} />
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                      {market.options.map((option, idx) => (
                        <div
                          key={idx}
                          className="relative group/option bg-gradient-to-br from-gray-50/80 to-white rounded-xl p-4 border border-gray-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                        >
                          {/* Option progress bar animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 rounded-xl opacity-0 group-hover/option:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-gray-900 font-semibold text-sm">{option.name}</span>
                              <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold bg-gradient-to-r ${
                                  option.color === 'red' ? 'from-red-500 to-red-600' :
                                  option.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                  option.color === 'green' ? 'from-green-500 to-green-600' :
                                  option.color === 'purple' ? 'from-purple-500 to-purple-600' :
                                  option.color === 'gold' ? 'from-yellow-500 to-yellow-600' :
                                  option.color === 'orange' ? 'from-orange-500 to-orange-600' :
                                  option.color === 'cyan' ? 'from-cyan-500 to-cyan-600' :
                                  'from-gray-500 to-gray-600'
                                } bg-clip-text text-transparent`}>
                                  {option.percentage}%
                                </span>
                                {option.change !== '—' && (
                                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    option.change.includes('+') 
                                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                                      : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
                                  }`}>
                                    {option.change.includes('+') ? '↑' : '↓'} {option.change}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="relative h-2 bg-gray-300/50 rounded-full overflow-hidden mb-3">
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
                              <div
                                className={`absolute left-0 top-0 h-full rounded-full ${
                                  option.color === 'red' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                                  option.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                  option.color === 'green' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                  option.color === 'purple' ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
                                  option.color === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                                  option.color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                                  option.color === 'cyan' ? 'bg-gradient-to-r from-cyan-400 to-cyan-500' :
                                  'bg-gradient-to-r from-gray-400 to-gray-500'
                                } transition-all duration-1000 ease-out group-hover/option:shadow-lg`}
                                style={{ width: `${option.percentage}%` }}
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {option.volume}
                              </span>
                              <div className="flex gap-2">
                                <button 
                                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Yes
                                </button>
                                <button 
                                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedMarket === market.id && (
                    <div className="px-6 pb-6 border-t border-gray-200/50 pt-4 animate-slide-down bg-gradient-to-r from-gray-50/50 to-blue-50/50">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">Closes in 14 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">Resolution: Reuters</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 text-white overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full translate-y-48 -translate-x-48" />
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
                  <div className="max-w-xl">
                    <h2 className="text-4xl font-bold mb-4">
                      <Award className="inline-block w-10 h-10 mr-3 text-yellow-300 animate-spin-slow" />
                      Join the Future of Prediction Markets
                    </h2>
                    <p className="text-blue-100/90 text-lg">
                      Trade on global events with institutional-grade infrastructure and AI-powered insights
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    {[
                      { value: '250+', label: 'Markets', icon: Trophy },
                      { value: '1.2M+', label: 'Users', icon: Users },
                      { value: '$15B+', label: 'Volume', icon: DollarSign },
                      { value: '99.9%', label: 'Uptime', icon: Zap }
                    ].map((stat, idx) => (
                      <div 
                        key={idx}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 group/stat"
                      >
                        <stat.icon className="w-6 h-6 text-cyan-300 mx-auto mb-2 group-hover/stat:scale-125 transition-transform" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-blue-200/80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:-translate-y-1 group">
                    View All Markets
                    <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-400 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1">
                    Start Trading Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-500" />
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-2 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  Predict<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">X</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  Professional prediction markets since 2020
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {['Terms', 'Privacy', 'Docs', 'Careers', 'Contact'].map((item, idx) => (
                <a 
                  key={item} 
                  href="#"
                  className="hover:text-blue-600 transition-colors hover:scale-105 hover:font-medium"
                  style={{ animationDelay: `${0.1 * idx}s` }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes stagger {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-card-enter {
          animation: card-enter 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-stagger > * {
          animation: stagger 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        /* Glass effect */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Gradient text */
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default App;