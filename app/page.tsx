import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cloud, GitBranch, Server, Shield, Database, Activity, Award, Mail, Linkedin, Github, ExternalLink, ChevronRight, Code, Users, Zap } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('terminal');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [typedText, setTypedText] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const skills = {
    cloud: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
    devops: ['Kubernetes', 'Docker', 'Jenkins', 'GitLab CI', 'ArgoCD'],
    backend: ['Python', 'Go', 'Node.js', 'PostgreSQL', 'Redis'],
    monitoring: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'New Relic']
  };

  const projects = [
    {
      title: 'Multi-Region Kubernetes Platform',
      description: 'Architected resilient K8s infrastructure across 3 AWS regions with automated failover',
      tech: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus'],
      metrics: '99.99% uptime, 50% cost reduction',
      icon: <Cloud className="w-5 h-5" />
    },
    {
      title: 'Zero-Downtime CI/CD Pipeline',
      description: 'Built GitOps-based deployment system handling 500+ daily deployments',
      tech: ['ArgoCD', 'GitHub Actions', 'Docker', 'Helm'],
      metrics: 'Deployment time: 15min → 90sec',
      icon: <GitBranch className="w-5 h-5" />
    },
    {
      title: 'Cloud Cost Optimization Engine',
      description: 'Developed automated resource optimization saving $2M annually',
      tech: ['Python', 'AWS Lambda', 'CloudWatch', 'Terraform'],
      metrics: '40% infrastructure cost reduction',
      icon: <Database className="w-5 h-5" />
    }
  ];

  const certifications = [
    { name: 'AWS Solutions Architect Pro', year: '2024', verified: true },
    { name: 'Certified Kubernetes Admin', year: '2023', verified: true },
    { name: 'HashiCorp Terraform Associate', year: '2023', verified: true },
    { name: 'Google Cloud Architect', year: '2022', verified: true }
  ];

  const commands = {
    help: () => ({
      output: [
        'Available commands:',
        '  about     - Learn about me',
        '  skills    - View technical skills',
        '  projects  - See featured projects',
        '  contact   - Get contact information',
        '  clear     - Clear terminal',
        '  resume    - Download resume',
        '',
        'Pro tip: Try clicking the sections above!'
      ]
    }),
    about: () => ({
      output: [
        'Amro Massalha - Senior DevOps Engineer & Cloud Architect',
        '',
        '🚀 Transforming infrastructure into competitive advantage',
        '💡 8+ years building resilient, scalable systems',
        '🌍 Based in Israel, working globally',
        '',
        'Specializing in:',
        '• Cloud-native architecture & migration',
        '• Infrastructure as Code & GitOps',
        '• Container orchestration at scale',
        '• Site reliability engineering'
      ]
    }),
    skills: () => ({
      output: [
        'Technical Skills Matrix:',
        '',
        '☁️  Cloud Platforms:',
        '   ' + skills.cloud.join(', '),
        '',
        '🔧 DevOps Tools:',
        '   ' + skills.devops.join(', '),
        '',
        '💻 Backend Technologies:',
        '   ' + skills.backend.join(', '),
        '',
        '📊 Monitoring & Observability:',
        '   ' + skills.monitoring.join(', ')
      ]
    }),
    projects: () => ({
      output: projects.map(p => 
        `📁 ${p.title}\n   ${p.description}\n   Tech: ${p.tech.join(', ')}\n   Impact: ${p.metrics}\n`
      )
    }),
    contact: () => ({
      output: [
        'Let\'s connect!',
        '',
        '📧 Email: amr.massalha@gmail.com',
        '💼 LinkedIn: linkedin.com/in/amro-massalha',
        '🐙 GitHub: github.com/amro-massalha',
        '',
        'Currently open to Head of DevOps & Cloud Architect roles'
      ]
    }),
    clear: () => {
      setTerminalHistory([]);
      return { output: [] };
    },
    resume: () => ({
      output: ['Downloading resume... (This would trigger a download in production)']
    })
  };

  useEffect(() => {
    const welcomeMessage = [
      { text: 'Welcome to Amro\'s DevOps Terminal v2.0', delay: 0 },
      { text: 'Initializing systems...', delay: 500 },
      { text: '[OK] Cloud infrastructure loaded', delay: 1000 },
      { text: '[OK] DevOps tools initialized', delay: 1500 },
      { text: '[OK] Portfolio ready', delay: 2000 },
      { text: '', delay: 2200 },
      { text: 'Type "help" for available commands', delay: 2400 }
    ];

    welcomeMessage.forEach(({ text, delay }) => {
      setTimeout(() => {
        setTerminalHistory(prev => [...prev, { type: 'output', text }]);
      }, delay);
    });

    // Focus terminal input
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 2500);
    }
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = currentCommand.trim().toLowerCase();
      setTerminalHistory(prev => [...prev, { type: 'input', text: `$ ${currentCommand}` }]);
      
      if (commands[cmd]) {
        const result = commands[cmd]();
        result.output.forEach(line => {
          setTerminalHistory(prev => [...prev, { type: 'output', text: line }]);
        });
      } else if (cmd) {
        setTerminalHistory(prev => [...prev, { type: 'error', text: `Command not found: ${cmd}. Type "help" for commands.` }]);
      }
      
      setCurrentCommand('');
      
      // Auto-scroll terminal
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-blue-500/30 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Amro Massalha
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {['terminal', 'projects', 'skills', 'about'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`capitalize transition-all duration-300 ${
                    activeSection === section 
                      ? 'text-blue-400 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
              <a 
                href="https://linkedin.com/in/amro-massalha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Terminal Section */}
        {activeSection === 'terminal' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/80 rounded-lg overflow-hidden shadow-2xl border border-blue-500/30 backdrop-blur-sm">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">devops@amro:~</span>
              </div>
              <div 
                ref={terminalRef}
                className="p-6 h-96 overflow-y-auto font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                {terminalHistory.map((line, i) => (
                  <div 
                    key={i} 
                    className={`
                      ${line.type === 'input' ? 'text-green-400' : ''}
                      ${line.type === 'error' ? 'text-red-400' : ''}
                      ${line.type === 'output' ? 'text-gray-300' : ''}
                      mb-1
                    `}
                  >
                    {line.text}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-green-400">$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent outline-none text-gray-300 ml-2"
                    spellCheck="false"
                  />
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: <Cloud />, label: 'Cloud Projects', value: '50+' },
                { icon: <Server />, label: 'Servers Managed', value: '500+' },
                { icon: <Shield />, label: 'Uptime', value: '99.99%' },
                { icon: <Zap />, label: 'Deployments', value: '10K+' }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 flex items-center space-x-3 transform hover:scale-105 transition-all duration-300">
                  <div className="text-blue-400">{stat.icon}</div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <div 
                  key={i} 
                  className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-400">{project.icon}</div>
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <Activity className="w-4 h-4 mr-2" />
                    {project.metrics}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 capitalize flex items-center">
                    {category === 'cloud' && <Cloud className="w-5 h-5 mr-2 text-blue-400" />}
                    {category === 'devops' && <GitBranch className="w-5 h-5 mr-2 text-green-400" />}
                    {category === 'backend' && <Code className="w-5 h-5 mr-2 text-purple-400" />}
                    {category === 'monitoring' && <Activity className="w-5 h-5 mr-2 text-yellow-400" />}
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="space-y-3">
                    {items.map((skill, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-gray-300">{skill}</span>
                        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                            style={{ width: `${85 + Math.random() * 15}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-8 text-white">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300">
                    <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="text-white font-medium">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">{cert.year}</p>
                    {cert.verified && (
                      <p className="text-green-400 text-xs mt-2">✓ Verified</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-8">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Building the Future of Infrastructure
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  As a Senior DevOps Engineer and Cloud Architect with 8+ years of experience, I specialize in transforming complex infrastructure challenges into scalable, automated solutions that drive business growth.
                </p>
                <p className="text-lg leading-relaxed">
                  My journey spans from startup agility to enterprise scale, where I've architected systems handling millions of requests, reduced deployment times by 95%, and saved organizations millions through intelligent automation and optimization.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-400" />
                      Leadership Impact
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Led teams of 5-15 engineers across multiple time zones
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Mentored 20+ junior engineers to senior positions
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Established DevOps culture in traditional enterprises
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-purple-400" />
                      Technical Excellence
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        Architected multi-region, multi-cloud infrastructures
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        Achieved 99.99% uptime for mission-critical systems
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        Reduced infrastructure costs by 40-60% on average
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <p className="text-xl text-center text-white">
                    "Infrastructure should be invisible when it works, and invaluable when it scales."
                  </p>
                  <p className="text-center text-gray-400 mt-2">- My DevOps Philosophy</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-blue-500/30 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2025 Amro Massalha. Built with passion and code.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="mailto:amro@example.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/amro-massalha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/amro-massalha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;