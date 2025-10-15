import { useHead } from '@vueuse/head'

export interface SEOOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function useSEO(options: SEOOptions = {}) {
  const {
    title = '张志豪的个人博客',
    description = '分享前端开发、技术见解和项目经验',
    keywords = '前端开发,Vue.js,React,TypeScript,个人博客,技术分享',
    image = '/images/og-image.jpg',
    url = 'https://zhihaoevans.github.io',
    type = 'website',
    publishedTime,
    modifiedTime,
    author = '张志豪',
    section,
    tags = []
  } = options

  const fullTitle = title === '张志豪的个人博客' ? title : `${title} - 张志豪的个人博客`
  const fullUrl = url.startsWith('http') ? url : `https://zhihaoevans.github.io${url}`
  const fullImage = image.startsWith('http') ? image : `https://zhihaoevans.github.io${image}`

  const meta = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: author },
    
    // Open Graph
    { property: 'og:type', content: type },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: fullImage },
    { property: 'og:url', content: fullUrl },
    { property: 'og:site_name', content: '张志豪的个人博客' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: fullImage },
    
    // Additional meta for articles
    ...(type === 'article' ? [
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(author ? [{ property: 'article:author', content: author }] : []),
      ...(section ? [{ property: 'article:section', content: section }] : []),
      ...tags.map(tag => ({ property: 'article:tag', content: tag }))
    ] : [])
  ]

  useHead({
    title: fullTitle,
    meta
  })

  return {
    title: fullTitle,
    description,
    keywords,
    image: fullImage,
    url: fullUrl
  }
}

export function generateStructuredData(type: 'website' | 'article' | 'person', data: any) {
  const baseUrl = 'https://zhihaoevans.github.io'
  
  switch (type) {
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '张志豪的个人博客',
        description: '分享前端开发、技术见解和项目经验',
        url: baseUrl,
        author: {
          '@type': 'Person',
          name: '张志豪',
          url: baseUrl
        }
      }
    
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: data.coverImage ? `${baseUrl}${data.coverImage}` : `${baseUrl}/images/og-image.jpg`,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          '@type': 'Person',
          name: '张志豪',
          url: baseUrl
        },
        publisher: {
          '@type': 'Person',
          name: '张志豪',
          url: baseUrl
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${data.slug}`
        },
        keywords: data.tags?.join(', '),
        articleSection: data.category
      }
    
    case 'person':
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        jobTitle: data.title,
        description: data.bio,
        url: baseUrl,
        image: data.avatar ? `${baseUrl}${data.avatar}` : undefined,
        sameAs: data.social ? Object.values(data.social).filter(Boolean) : [],
        knowsAbout: data.expertise || [],
        alumniOf: data.education?.map((edu: any) => ({
          '@type': 'EducationalOrganization',
          name: edu.school
        })) || [],
        worksFor: data.experience?.map((exp: any) => ({
          '@type': 'Organization',
          name: exp.company
        })) || []
      }
    
    default:
      return null
  }
}