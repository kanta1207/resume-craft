export interface JobDescription {
  id: string;
  title: string;
  company: string;
  companyIcon: string;
  location: string;
  description: string;
  tags: string[];
  dateAdded: string;
  hasResume: boolean; // NEW: Track if resume exists
  resumeVersions?: number; // NEW: Number of resume versions
}

export interface AtsAnalysis {
  overallScore: number;
  keywordMatch: number;
  matchedKeywords: number;
  totalKeywords: number;
  missingKeywords: string[];
  similarityScore: number;
  verbStrength: number;
}

export const mockJobDescriptions: JobDescription[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    companyIcon: '🚀',
    location: 'San Francisco, CA',
    description: 'Build scalable web applications using React, TypeScript, and modern tools. Lead technical initiatives and mentor junior developers.',
    tags: ['React', 'TypeScript', 'Node.js', 'AWS', 'Leadership'],
    dateAdded: '2 days ago',
    hasResume: true,
    resumeVersions: 3,
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    companyIcon: '⚡',
    location: 'Remote',
    description: 'Work on cutting-edge SaaS platform. Fullstack development with React, Next.js, and PostgreSQL.',
    tags: ['React', 'Next.js', 'PostgreSQL', 'Docker', 'API Design'],
    dateAdded: '5 days ago',
    hasResume: true,
    resumeVersions: 1,
  },
  {
    id: '3',
    title: 'React Developer',
    company: 'Digital Agency',
    companyIcon: '🎨',
    location: 'New York, NY',
    description: 'Create beautiful, performant web experiences for Fortune 500 clients. Strong focus on UX and accessibility.',
    tags: ['React', 'CSS', 'Accessibility', 'Performance', 'Design Systems'],
    dateAdded: '1 week ago',
    hasResume: false,
  },
  {
    id: '4',
    title: 'Staff Engineer',
    company: 'MegaCorp Inc',
    companyIcon: '🏢',
    location: 'Seattle, WA',
    description: 'Lead architecture decisions for enterprise-scale applications. Drive technical strategy and innovation.',
    tags: ['Architecture', 'React', 'Microservices', 'Leadership', 'System Design'],
    dateAdded: '3 days ago',
    hasResume: true,
    resumeVersions: 2,
  },
  {
    id: '5',
    title: 'Frontend Lead',
    company: 'FinTech Innovations',
    companyIcon: '💎',
    location: 'Austin, TX',
    description: 'Lead frontend development for financial trading platform. High-performance real-time applications.',
    tags: ['React', 'WebSocket', 'Trading', 'Performance', 'Team Lead'],
    dateAdded: '4 days ago',
    hasResume: false,
  },
  {
    id: '6',
    title: 'Web Developer',
    company: 'Creative Studios',
    companyIcon: '🎬',
    location: 'Los Angeles, CA',
    description: 'Build interactive web experiences and animations. Work with creative team on award-winning projects.',
    tags: ['React', 'Three.js', 'Animation', 'WebGL', 'Creative'],
    dateAdded: '1 week ago',
    hasResume: true,
    resumeVersions: 1,
  },
];

export const mockAtsAnalysis: AtsAnalysis = {
  overallScore: 87,
  keywordMatch: 78,
  matchedKeywords: 23,
  totalKeywords: 29,
  missingKeywords: [
    'Cloud Architecture',
    'Microservices',
    'CI/CD',
    'Kubernetes',
    'GraphQL',
    'Team Leadership',
  ],
  similarityScore: 84,
  verbStrength: 8.2,
};