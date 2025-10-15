import { ref, computed } from 'vue';
import type { Article, Project, Profile } from '@/types';

// 响应式数据存储
const articles = ref<Article[]>([]);
const projects = ref<Project[]>([]);
const profile = ref<Profile | null>(null);

// 加载个人信息
export async function loadProfile(): Promise<Profile> {
  try {
    const response = await fetch('/data/profile.json');
    const data = await response.json();
    profile.value = data;
    return data;
  } catch (error) {
    console.error('Failed to load profile:', error);
    throw error;
  }
}

// 加载文章列表
export async function loadArticles(): Promise<Article[]> {
  try {
    const response = await fetch('/data/articles.json');
    const data = await response.json();
    articles.value = data;
    return data;
  } catch (error) {
    console.error('Failed to load articles:', error);
    throw error;
  }
}

// 加载项目列表
export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/data/projects.json');
    const data = await response.json();
    projects.value = data;
    return data;
  } catch (error) {
    console.error('Failed to load projects:', error);
    throw error;
  }
}

// 根据 slug 获取文章内容
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    // 先加载文章元数据
    if (articles.value.length === 0) {
      await loadArticles();
    }
    
    const article = articles.value.find(a => a.slug === slug);
    if (!article) {
      return null;
    }
    
    // 加载文章内容
    const response = await fetch(`/articles/${slug}.md`);
    const content = await response.text();
    
    return {
      ...article,
      content
    };
  } catch (error) {
    console.error('Failed to load article:', error);
    return null;
  }
}

// 使用数据的 composable
export function useData() {
  // 计算属性
  const featuredArticles = computed(() => 
    articles.value.filter(article => article.featured)
  );
  
  const featuredProjects = computed(() => 
    projects.value.filter(project => project.featured)
  );
  
  const recentArticles = computed(() => 
    articles.value
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 5)
  );
  
  // 按分类获取文章
  const getArticlesByCategory = (category: string) => {
    return articles.value.filter(article => article.category === category);
  };
  
  // 按标签获取文章
  const getArticlesByTag = (tag: string) => {
    return articles.value.filter(article => article.tags.includes(tag));
  };
  
  // 搜索文章
  const searchArticles = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return articles.value.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };
  
  // 获取所有标签
  const getAllTags = () => {
    const tagSet = new Set<string>();
    articles.value.forEach(article => {
      article.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };
  
  // 获取所有分类
  const getAllCategories = () => {
    const categorySet = new Set<string>();
    articles.value.forEach(article => {
      categorySet.add(article.category);
    });
    return Array.from(categorySet);
  };
  
  return {
    // 数据
    articles,
    projects,
    profile,
    
    // 计算属性
    featuredArticles,
    featuredProjects,
    recentArticles,
    
    // 方法
    loadProfile,
    loadArticles,
    loadProjects,
    getArticleBySlug,
    getArticlesByCategory,
    getArticlesByTag,
    searchArticles,
    getAllTags,
    getAllCategories
  };
}