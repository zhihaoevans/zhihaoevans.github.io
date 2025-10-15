// 文章类型定义
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publishDate: string;
  publishedAt: string;
  updateDate?: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured: boolean;
  image?: string;
  coverImage?: string;
}

// 项目类型定义
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  github?: string;
  featured: boolean;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// 个人信息类型定义
export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location?: string;
  website?: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    weibo?: string;
  };
  skills: {
    name: string;
    level: number;
    category?: string;
  }[];
  expertise?: string[];
  experience?: {
    company: string;
    position: string;
    duration: string;
    period?: string;
    description: string;
    achievements?: string[];
  }[];
  education?: {
    school: string;
    degree: string;
    duration: string;
    period?: string;
    major?: string;
    description?: string;
  }[];
  hobbies?: string[];
}

// 技能类型定义
export interface Skill {
  name: string;
  level: number;
}

// 社交媒体类型定义
export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
  weibo?: string;
}

// 导航菜单类型定义
export interface NavItem {
  name: string;
  path: string;
  icon?: string;
}