'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cloud, GitBranch, Server, Shield, Database, Activity, Award, Mail, Linkedin, Github, ExternalLink, ChevronRight, Code, Users, Zap } from 'lucide-react';

type TerminalLine = {
  type: 'input' | 'output' | 'error';
  text: string;
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('terminal');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [typedText, setTypedText] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const skills = {
    cloud: ['AWS (EC2, Lambda, EKS, S3)', 'Kubernetes', 'Terraform', 'Crossplane', 'AWS Batch'],
    devops: ['Docker', 'Helm', 'Karpenter', 'KEDA', 'Jenkins', 'GitLab CI', 'ArgoCD'],
    backend: ['Python (my go-to)', 'Go (when speed matters)', 'Bash (when lazy)', 'KCL', 'Linux'],
    monitoring: ['Datadog', 'Prometheus/Grafana', 'CloudWatch', 'ELK Stack', 'Slack Bots']
  };

  const projects = [
    {
      title: 'GPU Spot Instance Revolution',
      description: 'Broke down monolithic app into microservices on GPU spot instances at Beamr',
      tech: ['Kubernetes', 'Karpenter', 'KEDA', 'AWS', 'Go'],
      metrics: '70% compute cost reduction 🎉',
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: 'SOC2 Certification Speedrun',
      description: 'Led Beamr through SOC2 certification on first attempt - auditors were impressed!',
      tech: ['Security Scanning', 'IAM Policies', 'Compliance', 'Documentation'],
      metrics: 'Passed on first try (rare achievement)',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'The $10k/Week CI/CD Rescue',
      description: 'Fixed Minute Media\'s bleeding CI system with smarter build strategies',
      tech: ['Jenkins', 'GitLab CI', 'Python', 'Build Optimization'],
      metrics: 'Saved ~$10k weekly on builds',
      icon: <Database className="w-5 h-5" />
    },
    {
      title: 'Crossplane > Terraform Migration',
      description: 'Convinced skeptical management to switch IaC tools - best decision ever',
      tech: ['Crossplane', 'KCL', 'AWS', 'Custom Operators'],
      metrics: 'Zero-downtime AWS migration',
      icon: <Cloud className="w-5 h-5" />
    },
    {
      title: 'The Slack Bot People Love',
      description: 'Built deployment tracker that makes deployments fun (yes, really)',
      tech: ['Python', 'Slack API', 'ArgoCD', 'Webhooks'],
      metrics: 'Team happiness: 📈',
      icon: <Activity className="w-5 h-5" />
    },
    {
      title: 'From CloudWatch to Datadog',
      description: 'Led observability transformation - now we actually know what\'s happening',
      tech: ['Datadog', 'APM', 'Distributed Tracing', 'Custom Dashboards'],
      metrics: 'MTTR: 4hr → 15min',
      icon: <Activity className="w-5 h-5" />
    },
    {
      title: 'Life/Work Balance Orchestration',
      description: 'Successfully deployed work-life balance using advanced scheduling algorithms',
      tech: ['Family First', 'Weekend Farming', 'Avocado Trees', 'Community Time'],
      metrics: 'Happiness: ∞ | Stress: null',
      icon: <Users className="w-5 h-5" />
    }
  ];

  const certifications = [
    { name: 'AWS Cloud Practitioner', year: '2022', verified: true, note: '(the easy one)' },
    { name: 'Docker + K8s Mastery', year: '2021', verified: true, note: '(actually useful)' },
    { name: 'ISTQB Level 1 & 2', year: '2019', verified: true, note: '(from my QA days)' },
    { name: 'B.Sc Industrial Engineering', year: 'Technion', verified: true, note: '(where I learned to optimize everything)' }
  ];

  const commands: Record<string, () => { output: string[] }> = {
    help: () => ({
      output: [
        'Available commands:',
        '  about     - My story (QA → DevOps transformation)',
        '  skills    - Technical arsenal (the fun stuff)',
        '  projects  - Things I\'ve built/fixed/saved',
        '  work      - Career journey',
        '  life      - Beyond the terminal (family & farm) 🌳',
        '  contact   - Let\'s connect!',
        '  joke      - DevOps humor',
        '  coffee    - Brew some virtual coffee ☕',
        '  ping      - Check system status',
        '  whoami    - Complete system info 😊',
        '  clear     - Clear terminal',
        '  resume    - Download my CV',
        '',
        'Pro tip: Try "life" to see what I do when not debugging! 🚜'
      ]
    }),
    about: () => ({
      output: [
        'Amro Massalha - Head of DevOps @ Beamr',
        '',
        '🚀 8+ years turning infrastructure chaos into scalable solutions',
        '📍 Based in Israel, breaking prod... I mean, fixing infrastructure globally',
        '🔄 Started in QA - now I prevent the bugs before they\'re written',
        '👨‍👩‍👧‍👧 Powered by family love and homegrown avocados',
        '',
        'My approach: "Start simple, iterate fast, measure everything"',
        '',
        'Recent wins:',
        '• Saved 70% on compute with GPU spot instances (CFO loves me)',
        '• Migrated to AWS with ZERO downtime (yes, really)',
        '• Made deployments so smooth, devs actually enjoy them',
        '• Got SOC2 certified on first try (auditors were shocked)',
        '• Built a life where debugging code and growing avocados coexist',
        '',
        'Languages: English, Arabic, Hebrew (easier than Python 2→3 migration)'
      ]
    }),
    skills: () => ({
      output: [
        'Technical Arsenal (aka my daily toolkit):',
        '',
        '☁️  Cloud & Infrastructure:',
        '   ' + skills.cloud.join(', '),
        '',
        '🔧 DevOps Toolchain:',
        '   ' + skills.devops.join(', '),
        '',
        '💻 Languages & Systems:',
        '   ' + skills.backend.join(', '),
        '',
        '📊 Monitoring & Observability:',
        '   ' + skills.monitoring.join(', '),
        '',
        'Special mention: Good networking knowledge (saves you at 3am)'
      ]
    }),
    work: () => ({
      output: [
        'Career Journey:',
        '',
        '🚀 Head of DevOps @ Beamr (2023 - Present)',
        '   Running the cloud show. Inherited basic Lambda setup,',
        '   built full K8s with GPU acceleration. Convinced management',
        '   Crossplane > Terraform (they were skeptical, now believers)',
        '',
        '💰 Senior DevOps @ Minute Media (2021 - 2023)',
        '   Came to fix bleeding CI system. Saved ~$10k/week.',
        '   Also taught teams to actually talk to each other.',
        '',
        '🔧 Automation Engineer @ BMC Software (2019 - 2021)',
        '   Enterprise-scale testing. Learned networking the hard way.',
        '',
        '🐛 QA Engineer @ Galil Software (2015 - 2019)',
        '   Foundation years. Where I learned to break things properly.'
      ]
    }),
    projects: () => ({
      output: projects.flatMap(p => [
        `📁 ${p.title}`,
        `   ${p.description}`,
        `   Tech: ${p.tech.join(', ')}`,
        `   Impact: ${p.metrics}`,
        ''
      ])
    }),
    contact: () => ({
      output: [
        'Let\'s build something awesome together!',
        '',
        '📧 Email: amr.massalha@gmail.com',
        '📱 Phone: +972 54-3987496',
        '💼 LinkedIn: linkedin.com/in/amro-massalha',
        '🐙 GitHub: github.com/AmroMassalha',
        '',
        'Currently: Head of DevOps @ Beamr',
        'Open to: Interesting challenges that break the status quo',
        '',
        'Final thought: "I solve problems. Sometimes with code,',
        'sometimes with architecture, sometimes by just talking to people."'
      ]
    }),
    life: () => ({
      output: [
        '🌟 Life Beyond the Terminal',
        '',
        '👨‍👩‍👧‍👧 Family First:',
        'Married to Noura - fashion designer, salon manager, and the most',
        'beautiful soul who somehow tolerates my "just one more deployment" promises.',
        'Blessed with two amazing daughters:',
        '  • Zeina (7) - Already debugging my excuses better than any QA',
        '  • Lina (5) - Master of asking "why?" (future engineer confirmed)',
        '',
        '🚜 Weekend Warrior:',
        'When I\'m not orchestrating containers, I\'m orchestrating nature.',
        'You\'ll find me in my fields, where "deployment" means planting season:',
        '  • 🥑 Avocado trees (scaling vertically, just like microservices)',
        '  • 🫒 Olive groves (high availability, zero downtime for centuries)',
        '  • 🌾 Helping neighbors with wheat harvest (community > competition)',
        '',
        '🔧 From DevOps to FarmOps:',
        'I maintain my tractor like production servers - regular patches included!',
        'Tools of choice: Tractor, plow, sprayer (the original automation tools)',
        'Even my car gets CI/CD treatment - continuous inspection, delivery guaranteed!',
        '',
        '💚 Life Philosophy:',
        'Whether it\'s Kubernetes pods or avocado trees, growth requires patience,',
        'proper maintenance, and occasionally getting your hands dirty.',
        '',
        'The best systems - technical or natural - are those we nurture with care.'
      ]
    }),
    joke: () => ({
      output: [
        'Random DevOps wisdom:',
        '',
        jokes[Math.floor(Math.random() * jokes.length)],
        '',
        'Type "joke" again for more wisdom/trauma 😅'
      ]
    }),
    whoami: () => ({
      output: [
        'amro@life:~$ whoami --verbose',
        '',
        'uid=1985(amro) gid=1000(devops) groups=1000(devops),',
        '2015(husband),2017(father),2019(farmer),2023(head-of-devops)',
        '',
        'Full Name: Amro Massalha',
        'Roles: Head of DevOps, Husband, Father, Weekend Farmer',
        'Location: /home/israel',
        'Uptime: 8+ years in tech, 40+ years in life',
        'Load Average: Perfectly balanced (work/life/family)',
        '',
        'Current Processes:',
        '  PID 1: Being awesome dad to Zeina & Lina',
        '  PID 2: Supporting Noura\'s fashion empire',
        '  PID 3: Scaling Beamr\'s infrastructure',
        '  PID 4: Growing the best avocados in the region',
        '  PID 5: Helping neighbors with their harvest',
        '',
        'Exit Code: Still running (hopefully for many years) 💚'
      ]
    }),
    family: () => commands.life(),
    farm: () => commands.life(),
    personal: () => commands.life(),
    coffee: () => ({
      output: [
        '☕ Brewing virtual coffee...',
        '',
        '   ( (',
        '    ) )',
        '  ........',
        '  |      |]',
        '  \\      /',
        '   `----\'',
        '',
        'Coffee is ready! Productivity +100% 🚀'
      ]
    }),
    ping: () => ({
      output: [
        'PING amro-massalha.dev (127.0.0.1): 56 data bytes',
        '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms',
        '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.037 ms',
        '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.033 ms',
        '',
        '--- amro-massalha.dev ping statistics ---',
        '3 packets transmitted, 3 packets received, 0.0% packet loss',
        'round-trip min/avg/max/stddev = 0.033/0.037/0.042/0.004 ms',
        '',
        'Status: All systems operational! 🟢'
      ]
    }),
    clear: () => {
      setTerminalHistory([]);
      return { output: [] };
    },
    resume: () => ({
      output: ['Opening CV... (In real deployment, this downloads PDF)']
    })
  };

  const jokes: string[] = [
    '"It works on my machine" - Ancient DevOps Proverb',
    'There\'s no place like 127.0.0.1',
    'To err is human, to really mess up requires Kubernetes',
    'I don\'t always test my code, but when I do, I do it in production',
    '99 little bugs in the code, 99 little bugs... Fix one bug, compile again, 117 little bugs in the code',
    'DevOps: Turning "It\'s not my problem" into "It\'s everyone\'s problem"',
    'My code doesn\'t have bugs, it just develops random features',
    'DNS: It\'s always DNS. Even when it\'s not DNS, it\'s DNS.',
    'My avocado trees have better uptime than most production servers',
    'Teaching my daughters about Git: "No sweetie, you can\'t just force push to daddy\'s branch"',
    'Wife asked why I name my servers. I said it\'s easier to mourn them when they die.',
    'I treat my tractor like my servers: regular maintenance, monitoring, and prayer'
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    const day = new Date().getDay();
    
    // Weekend check (Friday evening to Saturday in Israel)
    if ((day === 5 && hour >= 18) || day === 6) {
      return "Shabbat Shalom! 🕯️ Farm mode activated";
    }
    
    if (hour < 6) return "Burning the midnight oil? 🌙";
    if (hour < 9) return "Good morning! Getting kids ready? ☕";
    if (hour < 12) return "Good morning! Time to break prod... I mean, build! 🚀";
    if (hour < 17) return "Good afternoon! Peak productivity hours ⚡";
    if (hour < 19) return "Good evening! Family time approaching 👨‍👩‍👧‍👧";
    if (hour < 22) return "Good evening! Kids asleep? Back to coding? 🌆";
    return "Late night debugging? 🦉";
  };

  useEffect(() => {
    const welcomeMessage = [
      { text: `${getGreeting()} Welcome to Amro's DevOps Terminal v2.0 🚀`, delay: 0 },
      { text: 'Initializing systems... (unlike my first production deploy)', delay: 500 },
      { text: '[OK] Kubernetes clusters online', delay: 1000 },
      { text: '[OK] Coffee levels optimal ☕', delay: 1500 },
      { text: '[OK] Spot instances running (70% cheaper!)', delay: 2000 },
      { text: '[OK] All systems green... for now 😅', delay: 2500 },
      { text: '', delay: 2700 },
      { text: 'Type "help" for commands or "joke" for DevOps wisdom', delay: 2900 }
    ];

    welcomeMessage.forEach(({ text, delay }) => {
      setTimeout(() => {
        setTerminalHistory(prev => [...prev, { type: 'output', text }]);
      }, delay);
    });

    const input = inputRef.current;
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 3000);
    }
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = currentCommand.trim().toLowerCase();
      setTerminalHistory(prev => [...prev, { type: 'input', text: `$ ${currentCommand}` }]);
      
      if (commands[cmd]) {
        const result = commands[cmd]();
        result.output.forEach((line: string) => {
          setTerminalHistory(prev => [...prev, { type: 'output', text: line }]);
        });
      } else if (cmd) {
        const responses = [
          `Command not found: ${cmd}. Try "help" for available commands.`,
          `bash: ${cmd}: command not found. Maybe try sudo? (just kidding)`,
          `'${cmd}' is not recognized. Did you mean "coffee"? ☕`,
          `Error: ${cmd} not found. Have you tried turning it off and on again?`
        ];
        setTerminalHistory(prev => [...prev, { type: 'error', text: responses[Math.floor(Math.random() * responses.length)] }]);
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
              <span className="text-gray-400 text-sm hidden md:block">Head of DevOps @ Beamr</span>
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
                { icon: <Cloud />, label: 'Cloud Costs Saved', value: '70%', detail: 'GPU spot instances FTW' },
                { icon: <Server />, label: 'Years Breaking/Fixing', value: '8+', detail: 'Started in QA, now we here' },
                { icon: <Shield />, label: 'SOC2 Attempts', value: '1', detail: 'Passed first try! 🎉' },
                { icon: <Users />, label: 'Life Balance', value: '100%', detail: 'DevOps by day, FarmOps by weekend' }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 flex items-center space-x-3 transform hover:scale-105 transition-all duration-300 group">
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors">{stat.icon}</div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Things I've Built, Fixed & Saved 💰
            </h2>
            <p className="text-center text-gray-400 mb-12">Real impact, real numbers, real stories</p>
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
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Arsenal 🛠️
            </h2>
            <p className="text-center text-gray-400 mb-12">The tools I use to turn chaos into scalable infrastructure</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 capitalize flex items-center">
                    {category === 'cloud' && <Cloud className="w-5 h-5 mr-2 text-blue-400" />}
                    {category === 'devops' && <GitBranch className="w-5 h-5 mr-2 text-green-400" />}
                    {category === 'backend' && <Code className="w-5 h-5 mr-2 text-purple-400" />}
                    {category === 'monitoring' && <Activity className="w-5 h-5 mr-2 text-yellow-400" />}
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                    {category === 'cloud' && ' ☁️'}
                    {category === 'devops' && ' 🔧'}
                    {category === 'backend' && ' 💻'}
                    {category === 'monitoring' && ' 📊'}
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
              <h3 className="text-2xl font-semibold text-center mb-8 text-white">Education & Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 group">
                    <Award className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:text-green-300 transition-colors" />
                    <h4 className="text-white font-medium">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">{cert.year}</p>
                    <p className="text-green-400 text-xs mt-2">{cert.note}</p>
                    {cert.verified && (
                      <p className="text-green-500 text-xs mt-1">✓ Verified</p>
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
                From QA to Cloud Infrastructure Hero
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Started my career finding bugs, now I prevent them at scale. With 8+ years in the trenches, 
                  I've transformed from a QA engineer breaking things to a DevOps leader who (mostly) keeps 
                  things running. Currently heading DevOps at Beamr, where I turned a basic Lambda setup into 
                  a full-blown Kubernetes empire with GPU acceleration.
                </p>
                <p className="text-lg leading-relaxed">
                  My superpower? Making infrastructure decisions that save money AND improve performance. 
                  Like that time I switched us to GPU spot instances and cut compute costs by 70%. Or when 
                  I convinced skeptical management that Crossplane &gt; Terraform (spoiler: I was right). 
                  These days, I apply the same optimization mindset to my avocado farm - turns out trees 
                  scale better than microservices!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-400" />
                      Leadership Style
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Start simple, iterate fast, measure everything
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Communication fixes more than fancy tools
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Make deployments so smooth, devs enjoy them
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                        Good networking knowledge saves you at 3am
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-purple-400" />
                      Recent Victories
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        Zero-downtime AWS migration (yes, really!)
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        SOC2 certified on first attempt 🎉
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        Saved Minute Media ~$10k/week on CI
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                        Built a Slack bot people actually like
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <p className="text-xl text-center text-white mb-4">
                    "I solve problems. Sometimes with code, sometimes with architecture, 
                    sometimes by just talking to people."
                  </p>
                  <p className="text-center text-gray-400 text-sm">
                    If your infrastructure is held together with duct tape and prayers, let's chat.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <div className="px-4 py-2 bg-purple-900/30 rounded-full text-purple-300">
                    🌐 English, Arabic, Hebrew
                  </div>
                  <div className="px-4 py-2 bg-blue-900/30 rounded-full text-blue-300">
                    📍 Israel
                  </div>
                  <div className="px-4 py-2 bg-green-900/30 rounded-full text-green-300">
                    🎓 Technion Graduate
                  </div>
                  <div className="px-4 py-2 bg-yellow-900/30 rounded-full text-yellow-300">
                    👨‍👩‍👧‍👧 Father of 2
                  </div>
                  <div className="px-4 py-2 bg-emerald-900/30 rounded-full text-emerald-300">
                    🚜 Weekend Farmer
                  </div>
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
            <p className="text-gray-400">© 2025 Amro Massalha. Built with passion, code, and love from my family 💚</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="mailto:amr.massalha@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/amro-massalha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/AmroMassalha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
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