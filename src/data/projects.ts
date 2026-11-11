import type { ImageMetadata } from 'astro';
import piscineImg from '../assets/projects/piscine-42.jpg';
import gamedayImg from '../assets/projects/gameday-valencia.jpg';
import gamedayCertImg from '../assets/projects/gameday-certificado.jpg';
import mallorcaImg from '../assets/projects/mallorca-formacion.jpg';

export type Locale = 'es' | 'en' | 'ca';

export interface ProjectImage {
  src: ImageMetadata;
  alt: Record<Locale, string>;
  // Punto del recorte cuando la foto se ajusta a la tarjeta (CSS object-position).
  position?: string;
}

export interface Project {
  slug: string;
  featured: boolean;
  icon: 'cloud' | 'code' | 'lightning';
  color: 'accent-primary' | 'green' | 'orange' | 'purple';
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  highlights?: Record<Locale, string[]>;
  image?: ProjectImage;
  certificate?: ProjectImage;
  tags: string[];
  // Se rellena cuando el repositorio es público; mientras esté vacío no se muestra el botón.
  repoUrl?: string;
  repoLabel?: Record<Locale, string>;
}

export const projects: Project[] = [
  {
    slug: 'portfolio-web',
    featured: true,
    icon: 'cloud',
    color: 'accent-primary',
    title: {
      es: 'Portfolio Web en AWS con Terraform',
      en: 'Portfolio Website on AWS with Terraform',
      ca: 'Portfolio Web a AWS amb Terraform',
    },
    description: {
      es: 'Mi web de CV y portfolio es también mi proyecto de cloud: una web estática en tres idiomas, servida desde AWS, con toda la infraestructura definida como código y desplegada automáticamente en cada cambio.',
      en: 'My CV and portfolio site is also my cloud project: a static website in three languages, served from AWS, with all its infrastructure defined as code and deployed automatically on every change.',
      ca: "La meva web de CV i portfolio és també el meu projecte de cloud: una web estàtica en tres idiomes, servida des d'AWS, amb tota la infraestructura definida com a codi i desplegada automàticament a cada canvi.",
    },
    highlights: {
      es: [
        'Infraestructura como código con Terraform: el bucket, la distribución CloudFront, el certificado, los registros DNS, la API, la base de datos, los permisos y las alertas de coste se crean y versionan desde el repositorio.',
        'Web estática en un bucket S3 privado, accesible solo a través de CloudFront. HTTPS con certificado ACM, cabeceras de seguridad y redirecciones (idioma, www) resueltas en el borde con una CloudFront Function.',
        'Contador de visitas serverless: API Gateway, Lambda (Node.js) y DynamoDB, servidos bajo el mismo dominio en /api y con límite de peticiones.',
        'CI/CD con GitHub Actions y OIDC: cada push a main compila, despliega en S3 e invalida la caché de CloudFront, sin guardar ninguna clave de AWS.',
        'Buenas prácticas: permisos de mínimo privilegio, estado de Terraform remoto en S3 con bloqueo y un presupuesto con alertas para vigilar el coste.',
      ],
      en: [
        'Infrastructure as code with Terraform: the bucket, CloudFront distribution, certificate, DNS records, API, database, permissions and cost alerts are created and versioned from the repository.',
        'Static site in a private S3 bucket, reachable only through CloudFront. HTTPS with an ACM certificate, security headers and redirects (language, www) handled at the edge with a CloudFront Function.',
        'Serverless visit counter: API Gateway, Lambda (Node.js) and DynamoDB, served under the same domain at /api with request throttling.',
        'CI/CD with GitHub Actions and OIDC: every push to main builds, deploys to S3 and invalidates the CloudFront cache, without storing any AWS keys.',
        'Good practices: least-privilege permissions, remote Terraform state in S3 with locking, and a budget with alerts to keep costs in check.',
      ],
      ca: [
        "Infraestructura com a codi amb Terraform: el bucket, la distribució CloudFront, el certificat, els registres DNS, l'API, la base de dades, els permisos i les alertes de cost es creen i es versionen des del repositori.",
        'Web estàtica en un bucket S3 privat, accessible només a través de CloudFront. HTTPS amb certificat ACM, capçaleres de seguretat i redireccions (idioma, www) resoltes a la vora amb una CloudFront Function.',
        'Comptador de visites serverless: API Gateway, Lambda (Node.js) i DynamoDB, servits sota el mateix domini a /api i amb límit de peticions.',
        "CI/CD amb GitHub Actions i OIDC: cada push a main compila, desplega a S3 i invalida la memòria cau de CloudFront, sense desar cap clau d'AWS.",
        'Bones pràctiques: permisos de mínim privilegi, estat de Terraform remot a S3 amb bloqueig i un pressupost amb alertes per vigilar el cost.',
      ],
    },
    tags: [
      'Terraform',
      'AWS S3',
      'CloudFront',
      'API Gateway',
      'Lambda',
      'DynamoDB',
      'GitHub Actions',
      'OIDC',
      'Cloudflare',
      'Astro',
    ],
    repoUrl: 'https://github.com/PauMas-06/Project-Cv-Web',
    repoLabel: {
      es: 'Ver repositorio',
      en: 'View repository',
      ca: 'Veure repositori',
    },
  },
  {
    slug: 'aws-mallorca-ensenyament',
    featured: false,
    icon: 'lightning',
    color: 'purple',
    title: {
      es: 'Enseñanza Práctica de AWS en Mallorca',
      en: 'AWS Practical Teaching in Mallorca',
      ca: "Ensenyament Pràctic d'AWS a Mallorca",
    },
    description: {
      es: 'Experiencia de formación presencial en Mallorca impartiendo clases de AWS a alumnos con demostraciones en directo. Enseñanza práctica de servicios cloud con casos reales.',
      en: 'In-person training experience in Mallorca teaching AWS classes to students with live demonstrations. Hands-on cloud services teaching with real-world scenarios.',
      ca: "Experiència de formació presencial a Mallorca impartint classes d'AWS a alumnes amb demostracions en directe. Ensenyament pràctic de serveis cloud amb casos reals.",
    },
    tags: ['AWS', 'Formación', 'Cloud', 'Demo en Directo', 'Mallorca'],
    image: {
      src: mallorcaImg,
      alt: {
        es: 'Grupo de alumnos tras la formación de AWS en Mallorca',
        en: 'Group of students after the AWS training in Mallorca',
        ca: "Grup d'alumnes després de la formació d'AWS a Mallorca",
      },
    },
    repoUrl: '',
    repoLabel: {
      es: 'Ver código y material',
      en: 'View code and material',
      ca: 'Veure codi i material',
    },
  },
  {
    slug: 'awsgameday',
    featured: false,
    icon: 'lightning',
    color: 'orange',
    title: {
      es: 'AWS GameDay Finalista',
      en: 'AWS GameDay Finalist',
      ca: 'AWS GameDay Finalista',
    },
    description: {
      es: 'Participación como finalista en el campeonato nacional AWS GameDay. Retos técnicos en tiempo real sobre servicios AWS.',
      en: 'Participated as a finalist in the national AWS GameDay championship. Real-time technical challenges on AWS services.',
      ca: 'Participació com a finalista al campionat nacional AWS GameDay. Reptes tècnics en temps real sobre serveis AWS.',
    },
    tags: ['AWS', 'Cloud Computing', 'Teamwork'],
    image: {
      src: gamedayImg,
      position: '50% 52%',
      alt: {
        es: 'Equipo en el campeonato nacional AWS GameDay, en Valencia',
        en: 'Team at the AWS GameDay national championship in Valencia',
        ca: 'Equip al campionat nacional AWS GameDay, a València',
      },
    },
    certificate: {
      src: gamedayCertImg,
      alt: {
        es: 'Certificado de participación en el Campeonato Nacional AWS GameDay',
        en: 'Participation certificate for the AWS GameDay National Championship',
        ca: 'Certificat de participació al Campionat Nacional AWS GameDay',
      },
    },
  },
  {
    slug: 'piscine-42',
    featured: false,
    icon: 'code',
    color: 'green',
    title: {
      es: 'Piscine 42 Barcelona',
      en: '42 Barcelona Piscine',
      ca: 'Piscine 42 Barcelona',
    },
    description: {
      es: 'Proyectos de programación en C durante la Piscine intensiva de 26 días. Algoritmos, gestión de memoria y estructuras de datos.',
      en: 'C programming projects during the intensive 26-day Piscine. Algorithms, memory management, and data structures.',
      ca: 'Projectes de programació en C durant la Piscine intensiva de 26 dies. Algorismes, gestió de memòria i estructures de dades.',
    },
    tags: ['C', 'Algoritmos', 'Shell Scripting'],
    image: {
      src: piscineImg,
      alt: {
        es: 'Participantes de la Piscine en el campus de 42 Barcelona',
        en: 'Piscine participants at the 42 Barcelona campus',
        ca: 'Participants de la Piscine al campus de 42 Barcelona',
      },
    },
    repoUrl: '',
    repoLabel: {
      es: 'Ver código',
      en: 'View code',
      ca: 'Veure codi',
    },
  },
];
