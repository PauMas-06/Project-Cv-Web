import type { Locale } from './projects';

// Única fuente del CV: de aquí salen la página web y los PDF (npm run cv:pdf).
// Los campos marcados "solo web" amplían la web con contenido de LinkedIn; el PDF no los usa.

export interface CvItem {
  title: string;
  place?: string;
  period: string;
  bullets?: string[];
  // Solo web (el PDF usa únicamente los campos de arriba).
  intro?: string;
  webBullets?: string[];
  description?: string;
  detail?: string;
  webOnly?: boolean;
}

export interface CvHighlight {
  icon: string;
  title: string;
  detail: string;
  description?: string;
}

export interface CvData {
  page: { metaTitle: string; title: string; lead: string };
  labels: {
    profile: string;
    experience: string;
    education: string;
    skills: string;
    certifications: string;
    awards: string;
    languages: string;
  };
  headline: string;
  contact: { email: string; location: string; linkedinUrl: string; linkedinLabel: string };
  profile: string;
  // Solo web: el Extracto de LinkedIn, por párrafos.
  about: string[];
  experience: CvItem[];
  education: CvItem[];
  // items salen en PDF y web; webItems solo en la web (un grupo sin items no aparece en el PDF).
  skills: { label: string; items: string[]; webItems?: string[] }[];
  // Solo aparecen en el PDF.
  printExtras: string[];
  languagesLine: string;
  // Solo aparecen en la web.
  languages: { name: string; level: string }[];
  certifications: CvHighlight[];
  awards: CvHighlight[];
}

const contact = {
  email: 'paumassa06@gmail.com',
  location: 'Barcelona',
  linkedinUrl: 'https://www.linkedin.com/in/pau-mas-sales-7406pms',
  linkedinLabel: 'linkedin.com/in/pau-mas-sales-7406pms',
};

export const cv: Record<Locale, CvData> = {
  es: {
    page: {
      metaTitle: 'CV — Pau Mas Sales',
      title: 'Mi Currículum',
      lead: 'Visualiza o descarga mi CV actualizado',
    },
    labels: {
      profile: 'Perfil',
      experience: 'Experiencia',
      education: 'Formación',
      skills: 'Competencias',
      certifications: 'Certificaciones',
      awards: 'Premios y reconocimientos',
      languages: 'Idiomas',
    },
    headline: 'Técnico Superior en ASIR | Especialización en Cloud Computing',
    contact,
    profile:
      'Técnico Superior en Administración de Sistemas Informáticos en Red (ASIR), actualmente cursando el Curso de Especialización en Cloud Computing. Experiencia práctica en soporte informático y administración de sistemas en el Ayuntamiento de Barcelona, con conocimientos de Linux, Windows, redes, bases de datos y Cloud Computing. Interesado en orientar mi carrera hacia la infraestructura cloud y la automatización.',
    about: [
      'Soy Pau, administrador de sistemas con formación en redes e infraestructura TIC, y estoy construyendo mi carrera en cloud computing y automatización.',
      'He terminado el Ciclo Formativo de Grado Superior en Administración de Sistemas Informáticos en Red (ASIR), con unas prácticas de FP Dual en el departamento de Sistemas de Información y Telecomunicaciones del Ayuntamiento de Barcelona. Allí adquirí experiencia práctica en soporte técnico, administración de sistemas y gestión de usuarios.',
      'Actualmente curso la Especialización de FP de Grado Superior en Administración de Recursos y Servicios en la Nube, que abarca AWS, Azure, Google Cloud, infraestructura cloud, redes, almacenamiento, bases de datos, automatización y ciberseguridad. Además, estudio en 42 Barcelona, donde desarrollo mis habilidades de programación y resolución de problemas con un aprendizaje basado en proyectos y entre iguales (peer-to-peer).',
      'Mis principales intereses son Linux, la infraestructura cloud y la automatización, con especial interés en cómo se unen en DevOps. Me gusta entender cómo funcionan los sistemas, resolver problemas técnicos y poner en práctica lo que aprendo.',
      'Busco oportunidades junior en infraestructura cloud, administración de sistemas o DevOps, donde pueda aportar, seguir aprendiendo y crecer dentro de un equipo técnico.',
    ],
    experience: [
      {
        title: 'Técnico Informático en Prácticas',
        place: 'Ayuntamiento de Barcelona',
        period: 'Septiembre 2025 – Junio 2026',
        bullets: [
          'Soporte técnico y resolución de incidencias de hardware, software y red en entorno corporativo.',
          'Gestión de usuarios, permisos y recursos en la infraestructura de red municipal.',
          'Administración y configuración de sistemas operativos Windows y Office 365.',
        ],
        intro:
          "Prácticas intensivas de FP Dual integrado en el equipo técnico de la Gerència d'Àrea de Seguretat, Prevenció i Convivència del Ayuntamiento de Barcelona, en un entorno profesional real y exigente, vinculado a los servicios municipales.",
        webBullets: [
          'Soporte técnico y atención directa a usuarios: estaciones de trabajo, herramientas ofimáticas, correo corporativo y Microsoft Teams.',
          'Configuración y despliegue de ordenadores de sobremesa, portátiles y dispositivos móviles corporativos.',
          'Configuración de grupos de usuarios y políticas (GPO), gestión de impresoras y servicios de red.',
          'Resolución de incidencias de hardware y software, gestión de tickets y preparación completa de puestos de trabajo.',
          'Apoyo en la gestión de certificados digitales, permisos y licencias de Microsoft 365 y sistemas audiovisuales.',
        ],
      },
      {
        title: 'Árbitro de fútbol',
        place: 'Federació Catalana de Futbol (FCF) · Comité Técnico de Árbitros',
        period: '2022 – Actualidad',
        bullets: ['Toma de decisiones bajo presión', 'Autocontrol', 'Proactividad'],
        webBullets: [
          'Organización y planificación',
          'Toma de decisiones bajo presión',
          'Resolución de problemas',
          'Autocontrol',
          'Proactividad',
        ],
      },
    ],
    education: [
      {
        title: 'Curso de Especialización en Cloud Computing',
        place: 'Institut TIC de Barcelona',
        period: '2026 – Actualidad',
        description:
          'Curso de especialización de FP de Grado Superior en Administración de Recursos y Servicios en la Nube, centrado en el despliegue, la administración y la operación de infraestructura cloud pública y privada. Abarca fundamentos cloud, recursos de cómputo, redes, almacenamiento, bases de datos, servicios gestionados, automatización y ciberseguridad, con trabajo práctico en AWS, Azure y GCP.',
      },
      {
        title: 'Cursus 42 Barcelona',
        period: '2026 – Actualidad',
        description:
          'Programa de ingeniería de software basado en proyectos y aprendizaje entre iguales (peer-to-peer), con proyectos prácticos de programación, evaluación entre compañeros y resolución autónoma de problemas. Foco actual: programación en C, entornos Unix/Linux, algoritmos, Git, programación de sistemas, depuración y desarrollo colaborativo.',
      },
      {
        title: 'Piscine 42 Barcelona — Proceso de selección',
        period: 'Junio 2026',
        detail: 'Resultado: Apto',
        description:
          'Bootcamp intensivo de programación de 26 días y proceso de selección para acceder al programa principal de 42 Barcelona. Aprendizaje entre iguales, sin instructores, resolviendo retos de programación de dificultad creciente, principalmente en C. Áreas: programación en C, Shell scripting, algoritmos, revisión de código entre compañeros y entorno Unix/Linux.',
        webOnly: true,
      },
      {
        title: 'CFGS Administración de Sistemas Informáticos en Red (ASIR)',
        place: 'Institut TIC de Barcelona',
        period: '2024 – 2026',
        detail: 'Nota: 8,48',
        description:
          'Administración de sistemas Windows y Linux, redes (TCP/IP, DHCP, DNS), virtualización de servidores, Windows Server, LDAP, copias de seguridad y recuperación, y automatización con PowerShell y Bash.',
      },
      {
        title: 'Bachillerato científico',
        place: 'Institut Martí Pous',
        period: '2022 – 2024',
        webOnly: true,
      },
    ],
    skills: [
      {
        label: 'Cloud y DevOps',
        items: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
        webItems: ['Google Cloud', 'Administración en la nube'],
      },
      {
        label: 'Sistemas',
        items: ['Windows', 'Linux', 'CLI avanzada / terminal', 'VirtualBox y virtualización'],
        webItems: [
          'Windows Server',
          'Ubuntu / Debian / Kali',
          'LDAP',
          'Microsoft 365',
          'GPO',
          'Copias de seguridad y recuperación',
          'VMware',
          'Isard',
          'Racks y puntos de red',
        ],
      },
      { label: 'Redes', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Cisco Packet Tracer'] },
      { label: 'Programación', items: ['Python', 'Bash', 'Git', 'VS Code'], webItems: ['C', 'PowerShell'] },
      { label: 'Desarrollo web', items: ['PHP', 'HTML', 'CSS', 'XML', 'JSON'] },
      { label: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'MariaDB'] },
      {
        label: 'Soporte IT',
        items: [],
        webItems: [
          'Soporte técnico a usuarios (helpdesk)',
          'Gestión de tickets',
          'Instalación y configuración de software',
        ],
      },
      {
        label: 'Habilidades',
        items: [],
        webItems: [
          'Organización y planificación',
          'Resolución de problemas',
          'Aprendizaje rápido',
          'Aprendizaje entre iguales (peer learning)',
        ],
      },
    ],
    printExtras: ['Finalista del Campeonato Nacional AWS GameDay (certificado oficial)'],
    languagesLine: 'Bilingüe castellano y catalán · Inglés B1 (High Intermediate)',
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Catalán', level: 'Nativo (bilingüe)' },
      { name: 'Inglés', level: 'B1 – High Intermediate' },
    ],
    certifications: [
      {
        icon: '☁️',
        title: 'AWS Cloud Quest: Cloud Practitioner – Training Badge',
        detail: 'Amazon Web Services (AWS) · Octubre 2026',
      },
      {
        icon: '🎓',
        title: 'AWS Educate Introduction to Cloud 101 – Training Badge',
        detail: 'Amazon Web Services (AWS) · Mayo 2026',
      },
      {
        icon: '☁️',
        title: 'AWS Academy Graduate – Cloud Foundations – Training Badge',
        detail: 'Amazon Web Services (AWS) · Mayo 2026',
      },
    ],
    awards: [
      {
        icon: '🏆',
        title: 'Finalista del Campeonato Nacional AWS GameDay',
        detail: 'Enero 2026 · Institut TIC de Barcelona',
        description:
          'Finalista en una competición nacional de AWS GameDay organizada con SpeedyRails. Trabajo en equipo en un entorno cloud en tiempo real, resolviendo retos técnicos sobre servicios de AWS.',
      },
      {
        icon: '📜',
        title: 'Carta de recomendación – Ajuntament de Barcelona',
        detail: 'Junio 2026 · Responsable de IT y Telecomunicaciones',
        description:
          'Carta del responsable del departamento de IT y Telecomunicaciones del Ayuntamiento de Barcelona que valora positivamente mis prácticas de FP Dual y me recomienda para futuras oportunidades.',
      },
    ],
  },

  en: {
    page: {
      metaTitle: 'Resume — Pau Mas Sales',
      title: 'My Resume',
      lead: 'View or download my updated CV',
    },
    labels: {
      profile: 'Profile',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      certifications: 'Certifications',
      awards: 'Awards & recognition',
      languages: 'Languages',
    },
    headline: 'ASIR Higher Technician | Cloud Computing Specialization',
    contact,
    profile:
      'Higher Technician in Network Systems Administration (ASIR), currently taking the Specialization Course in Cloud Computing. Hands-on experience in IT support and systems administration at Barcelona City Council, with knowledge of Linux, Windows, networking, databases and cloud computing. Looking to steer my career towards cloud infrastructure and automation.',
    about: [
      "I'm Pau, a systems administrator with a background in networking and IT infrastructure, building my career in cloud computing and automation.",
      "I completed my Higher VET qualification in Network Systems Administration (ASIR), including a dual vocational training placement at Barcelona City Council's Information Systems and Telecommunications Department. There, I gained hands-on experience in technical support, systems administration and user management.",
      "I'm currently pursuing an Advanced VET Specialization in Cloud Resource and Services Administration, covering AWS, Azure, Google Cloud, cloud infrastructure, networking, storage, databases, automation and cybersecurity. Alongside this, I'm studying at 42 Barcelona, developing my programming and problem-solving skills through project-based, peer-to-peer learning.",
      'My main interests are Linux, cloud infrastructure and automation, with a particular interest in how these areas come together in DevOps. I enjoy understanding how systems work, troubleshooting technical issues and putting what I learn into practice.',
      "I'm looking for junior opportunities in cloud infrastructure, systems administration or DevOps where I can contribute, keep learning and grow as part of a technical team.",
    ],
    experience: [
      {
        title: 'IT Technician (Internship)',
        place: 'Barcelona City Council',
        period: 'September 2025 – June 2026',
        bullets: [
          'Technical support and troubleshooting of hardware, software and network issues in a corporate environment.',
          'Management of users, permissions and resources on the municipal network infrastructure.',
          'Administration and configuration of Windows operating systems and Office 365.',
        ],
        intro:
          "Intensive Dual VET internship embedded in the technical team of the Security, Prevention and Coexistence Area Management (Gerència d'Àrea de Seguretat, Prevenció i Convivència) at Barcelona City Council, working in a real and demanding professional environment tied to municipal services.",
        webBullets: [
          'Technical support and direct user assistance for workstations, office productivity tools, corporate email and Microsoft Teams.',
          'Setup and deployment of desktop computers, laptops and corporate mobile devices.',
          'Configuration of user groups and policies (GPO), printer management and network services.',
          'Hardware and software incident resolution, ticketing management and full workstation preparation.',
          'Support in the management of digital certificates, Microsoft 365 permissions and licenses, and audiovisual systems.',
        ],
      },
      {
        title: 'Football Referee',
        place: 'Catalan Football Federation (FCF) · Referees Technical Committee',
        period: '2022 – Present',
        bullets: ['Decision-making under pressure', 'Self-control', 'Proactivity'],
        webBullets: [
          'Organization and planning',
          'Decision-making under pressure',
          'Problem solving',
          'Self-control',
          'Proactivity',
        ],
      },
    ],
    education: [
      {
        title: 'Specialization Course in Cloud Computing',
        place: 'Institut TIC de Barcelona',
        period: '2026 – Present',
        description:
          'Advanced VET specialization in Cloud Resource and Services Administration, focused on the deployment, administration and operation of public and private cloud infrastructure. Key areas include cloud foundations, compute resources, networking, storage, databases, managed services, automation and cybersecurity, with hands-on work using AWS, Azure and GCP.',
      },
      {
        title: '42 Barcelona Cursus',
        period: '2026 – Present',
        description:
          'Project-based software engineering programme built around peer-to-peer learning, practical coding projects, peer evaluation and independent problem-solving. Current focus: C programming, Unix/Linux environments, algorithms, Git, systems programming, debugging and collaborative software development.',
      },
      {
        title: '42 Barcelona Piscine — Selection process',
        period: 'June 2026',
        detail: 'Result: Passed',
        description:
          "Intensive 26-day coding bootcamp and selection process for admission to 42 Barcelona's main program. Peer-to-peer learning with no instructors, solving progressively complex programming challenges, primarily in C. Key areas: C programming, Shell scripting, algorithms, peer code review and the Unix/Linux environment.",
        webOnly: true,
      },
      {
        title: 'Higher Vocational Degree in Network Systems Administration (ASIR)',
        place: 'Institut TIC de Barcelona',
        period: '2024 – 2026',
        detail: 'Grade: 8.48',
        description:
          'Windows and Linux systems administration, networking (TCP/IP, DHCP, DNS), server virtualization, Windows Server, LDAP, backup and recovery, and automation with PowerShell and Bash.',
      },
      {
        title: 'Science Baccalaureate',
        place: 'Institut Martí Pous',
        period: '2022 – 2024',
        webOnly: true,
      },
    ],
    skills: [
      {
        label: 'Cloud & DevOps',
        items: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
        webItems: ['Google Cloud', 'Cloud administration'],
      },
      {
        label: 'Systems',
        items: ['Windows', 'Linux', 'Advanced CLI / terminal', 'VirtualBox and virtualization'],
        webItems: [
          'Windows Server',
          'Ubuntu / Debian / Kali',
          'LDAP',
          'Microsoft 365',
          'GPO',
          'Backup and recovery',
          'VMware',
          'Isard',
          'Racks and network points',
        ],
      },
      { label: 'Networking', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Cisco Packet Tracer'] },
      { label: 'Programming', items: ['Python', 'Bash', 'Git', 'VS Code'], webItems: ['C', 'PowerShell'] },
      { label: 'Web development', items: ['PHP', 'HTML', 'CSS', 'XML', 'JSON'] },
      { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MariaDB'] },
      {
        label: 'IT support',
        items: [],
        webItems: [
          'User technical support (helpdesk)',
          'Ticket management',
          'Software installation and configuration',
        ],
      },
      {
        label: 'Soft skills',
        items: [],
        webItems: ['Organization and planning', 'Problem solving', 'Fast learning', 'Peer learning'],
      },
    ],
    printExtras: ['AWS GameDay National Championship finalist (official certificate)'],
    languagesLine: 'Bilingual Spanish and Catalan · English B1 (High Intermediate)',
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'Catalan', level: 'Native (bilingual)' },
      { name: 'English', level: 'B1 – High Intermediate' },
    ],
    certifications: [
      {
        icon: '☁️',
        title: 'AWS Cloud Quest: Cloud Practitioner – Training Badge',
        detail: 'Amazon Web Services (AWS) · October 2026',
      },
      {
        icon: '🎓',
        title: 'AWS Educate Introduction to Cloud 101 – Training Badge',
        detail: 'Amazon Web Services (AWS) · May 2026',
      },
      {
        icon: '☁️',
        title: 'AWS Academy Graduate – Cloud Foundations – Training Badge',
        detail: 'Amazon Web Services (AWS) · May 2026',
      },
    ],
    awards: [
      {
        icon: '🏆',
        title: 'AWS GameDay National Championship Finalist',
        detail: 'January 2026 · Institut TIC de Barcelona',
        description:
          'Finalist in a national-level AWS GameDay competition powered by SpeedyRails. Worked in a team-based, real-time cloud environment solving technical challenges on AWS services.',
      },
      {
        icon: '📜',
        title: 'Letter of Recommendation – Barcelona City Council',
        detail: 'June 2026 · Head of IT and Telecommunications',
        description:
          'Letter from the Head of the IT & Telecommunications Department at Barcelona City Council, positively evaluating my Dual VET internship and recommending me for future opportunities.',
      },
    ],
  },

  ca: {
    page: {
      metaTitle: 'Currículum — Pau Mas Sales',
      title: 'El Meu Currículum',
      lead: 'Visualitza o descarrega el meu CV actualitzat',
    },
    labels: {
      profile: 'Perfil',
      experience: 'Experiència',
      education: 'Formació',
      skills: 'Competències',
      certifications: 'Certificacions',
      awards: 'Premis i reconeixements',
      languages: 'Idiomes',
    },
    headline: 'Tècnic Superior en ASIX | Especialització en Cloud Computing',
    contact,
    profile:
      "Tècnic Superior en Administració de Sistemes Informàtics en Xarxa (ASIX), actualment cursant el Curs d'Especialització en Cloud Computing. Experiència pràctica en suport informàtic i administració de sistemes a l'Ajuntament de Barcelona, amb coneixements de Linux, Windows, xarxes, bases de dades i Cloud Computing. Interessat a orientar la meva carrera cap a la infraestructura cloud i l'automatització.",
    about: [
      'Sóc en Pau, administrador de sistemes amb formació en xarxes i infraestructura TIC, i estic construint la meva carrera en cloud computing i automatització.',
      "He acabat el Cicle Formatiu de Grau Superior en Administració de Sistemes Informàtics en Xarxa (ASIX), amb unes pràctiques de FP Dual al departament de Sistemes d'Informació i Telecomunicacions de l'Ajuntament de Barcelona. Allà vaig adquirir experiència pràctica en suport tècnic, administració de sistemes i gestió d'usuaris.",
      "Actualment curso l'Especialització de FP de Grau Superior en Administració de Recursos i Serveis al Núvol, que abasta AWS, Azure, Google Cloud, infraestructura cloud, xarxes, emmagatzematge, bases de dades, automatització i ciberseguretat. A més, estudio a 42 Barcelona, on desenvolupo les meves habilitats de programació i resolució de problemes amb un aprenentatge basat en projectes i entre iguals (peer-to-peer).",
      "Els meus principals interessos són Linux, la infraestructura cloud i l'automatització, amb un interès especial en com s'uneixen en DevOps. M'agrada entendre com funcionen els sistemes, resoldre problemes tècnics i posar en pràctica el que aprenc.",
      "Busco oportunitats júnior en infraestructura cloud, administració de sistemes o DevOps, on pugui aportar, seguir aprenent i créixer dins d'un equip tècnic.",
    ],
    experience: [
      {
        title: 'Tècnic Informàtic en Pràctiques',
        place: 'Ajuntament de Barcelona',
        period: 'Setembre 2025 – Juny 2026',
        bullets: [
          "Suport tècnic i resolució d'incidències de maquinari, programari i xarxa en un entorn corporatiu.",
          "Gestió d'usuaris, permisos i recursos a la infraestructura de xarxa municipal.",
          'Administració i configuració de sistemes operatius Windows i Office 365.',
        ],
        intro:
          "Pràctiques intensives de FP Dual integrat a l'equip tècnic de la Gerència d'Àrea de Seguretat, Prevenció i Convivència de l'Ajuntament de Barcelona, en un entorn professional real i exigent, vinculat als serveis municipals.",
        webBullets: [
          'Suport tècnic i atenció directa a usuaris: estacions de treball, eines ofimàtiques, correu corporatiu i Microsoft Teams.',
          "Configuració i desplegament d'ordinadors de sobretaula, portàtils i dispositius mòbils corporatius.",
          "Configuració de grups d'usuaris i polítiques (GPO), gestió d'impressores i serveis de xarxa.",
          "Resolució d'incidències de maquinari i programari, gestió de tiquets i preparació completa de llocs de treball.",
          'Suport en la gestió de certificats digitals, permisos i llicències de Microsoft 365 i sistemes audiovisuals.',
        ],
      },
      {
        title: 'Àrbitre de futbol',
        place: "Federació Catalana de Futbol (FCF) · Comitè Tècnic d'Àrbitres",
        period: '2022 – Actualitat',
        bullets: ['Presa de decisions sota pressió', 'Autocontrol', 'Proactivitat'],
        webBullets: [
          'Organització i planificació',
          'Presa de decisions sota pressió',
          'Resolució de problemes',
          'Autocontrol',
          'Proactivitat',
        ],
      },
    ],
    education: [
      {
        title: "Curs d'Especialització en Cloud Computing",
        place: 'Institut TIC de Barcelona',
        period: '2026 – Actualitat',
        description:
          "Curs d'especialització de FP de Grau Superior en Administració de Recursos i Serveis al Núvol, centrat en el desplegament, l'administració i l'operació d'infraestructura cloud pública i privada. Abasta fonaments cloud, recursos de còmput, xarxes, emmagatzematge, bases de dades, serveis gestionats, automatització i ciberseguretat, amb treball pràctic a AWS, Azure i GCP.",
      },
      {
        title: 'Cursus 42 Barcelona',
        period: '2026 – Actualitat',
        description:
          "Programa d'enginyeria de programari basat en projectes i aprenentatge entre iguals (peer-to-peer), amb projectes pràctics de programació, avaluació entre companys i resolució autònoma de problemes. Focus actual: programació en C, entorns Unix/Linux, algorismes, Git, programació de sistemes, depuració i desenvolupament col·laboratiu.",
      },
      {
        title: 'Piscine 42 Barcelona — Procés de selecció',
        period: 'Juny 2026',
        detail: 'Resultat: Apte',
        description:
          "Bootcamp intensiu de programació de 26 dies i procés de selecció per accedir al programa principal de 42 Barcelona. Aprenentatge entre iguals, sense instructors, resolent reptes de programació de dificultat creixent, principalment en C. Àrees: programació en C, Shell scripting, algorismes, revisió de codi entre companys i entorn Unix/Linux.",
        webOnly: true,
      },
      {
        title: 'CFGS Administració de Sistemes Informàtics en Xarxa (ASIX)',
        place: 'Institut TIC de Barcelona',
        period: '2024 – 2026',
        detail: 'Nota: 8,48',
        description:
          'Administració de sistemes Windows i Linux, xarxes (TCP/IP, DHCP, DNS), virtualització de servidors, Windows Server, LDAP, còpies de seguretat i recuperació, i automatització amb PowerShell i Bash.',
      },
      {
        title: 'Batxillerat científic',
        place: 'Institut Martí Pous',
        period: '2022 – 2024',
        webOnly: true,
      },
    ],
    skills: [
      {
        label: 'Cloud i DevOps',
        items: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
        webItems: ['Google Cloud', 'Administració al núvol'],
      },
      {
        label: 'Sistemes',
        items: ['Windows', 'Linux', 'CLI avançada / terminal', 'VirtualBox i virtualització'],
        webItems: [
          'Windows Server',
          'Ubuntu / Debian / Kali',
          'LDAP',
          'Microsoft 365',
          'GPO',
          'Còpies de seguretat i recuperació',
          'VMware',
          'Isard',
          'Racks i punts de xarxa',
        ],
      },
      { label: 'Xarxes', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Cisco Packet Tracer'] },
      { label: 'Programació', items: ['Python', 'Bash', 'Git', 'VS Code'], webItems: ['C', 'PowerShell'] },
      { label: 'Desenvolupament web', items: ['PHP', 'HTML', 'CSS', 'XML', 'JSON'] },
      { label: 'Bases de dades', items: ['PostgreSQL', 'MySQL', 'MariaDB'] },
      {
        label: 'Suport TI',
        items: [],
        webItems: [
          'Suport tècnic a usuaris (helpdesk)',
          'Gestió de tiquets',
          'Instal·lació i configuració de programari',
        ],
      },
      {
        label: 'Habilitats',
        items: [],
        webItems: [
          'Organització i planificació',
          'Resolució de problemes',
          'Aprenentatge ràpid',
          'Aprenentatge entre iguals (peer learning)',
        ],
      },
    ],
    printExtras: ['Finalista del Campionat Nacional AWS GameDay (certificat oficial)'],
    languagesLine: 'Bilingüe castellà i català · Anglès B1 (High Intermediate)',
    languages: [
      { name: 'Castellà', level: 'Natiu' },
      { name: 'Català', level: 'Natiu (bilingüe)' },
      { name: 'Anglès', level: 'B1 – High Intermediate' },
    ],
    certifications: [
      {
        icon: '☁️',
        title: 'AWS Cloud Quest: Cloud Practitioner – Training Badge',
        detail: 'Amazon Web Services (AWS) · Octubre 2026',
      },
      {
        icon: '🎓',
        title: 'AWS Educate Introduction to Cloud 101 – Training Badge',
        detail: 'Amazon Web Services (AWS) · Maig 2026',
      },
      {
        icon: '☁️',
        title: 'AWS Academy Graduate – Cloud Foundations – Training Badge',
        detail: 'Amazon Web Services (AWS) · Maig 2026',
      },
    ],
    awards: [
      {
        icon: '🏆',
        title: 'Finalista del Campionat Nacional AWS GameDay',
        detail: 'Gener 2026 · Institut TIC de Barcelona',
        description:
          "Finalista en una competició nacional d'AWS GameDay organitzada amb SpeedyRails. Treball en equip en un entorn cloud en temps real, resolent reptes tècnics sobre serveis d'AWS.",
      },
      {
        icon: '📜',
        title: 'Carta de recomanació – Ajuntament de Barcelona',
        detail: "Juny 2026 · Responsable d'IT i Telecomunicacions",
        description:
          "Carta del responsable del departament d'IT i Telecomunicacions de l'Ajuntament de Barcelona que valora positivament les meves pràctiques de FP Dual i em recomana per a futures oportunitats.",
      },
    ],
  },
};
