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
    title = 'xzh · Dev Notes',
    description = 'Linux、C/C++、网络工程与 AI 独立开发实践',
    keywords = 'Linux,C++,DPDK,AI辅助开发,独立开发,开源项目',
    image = 'https://avatars.githubusercontent.com/u/55485233?v=4',
    url = 'https://zhihaoevans.github.io',
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'xzh',
    section,
    tags = []
  } = options

  const fullTitle = title === 'xzh · Dev Notes' ? title : `${title} - xzh · Dev Notes`
  const fullUrl = url.startsWith('http') ? url : `https://zhihaoevans.github.io${url === '/' || url.startsWith('/#/') ? url : '/#' + url}`
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
    { property: 'og:site_name', content: 'xzh · Dev Notes' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary' },
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
        name: 'xzh · Dev Notes',
        description: 'Linux、C/C++、网络工程与 AI 独立开发实践',
        url: baseUrl,
        author: {
          '@type': 'Person',
          name: 'xzh',
          url: baseUrl
        }
      }
    
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: data.coverImage ? (data.coverImage.startsWith('http') ? data.coverImage : `${baseUrl}${data.coverImage}`) : 'https://avatars.githubusercontent.com/u/55485233?v=4',
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          '@type': 'Person',
          name: 'xzh',
          url: baseUrl
        },
        publisher: {
          '@type': 'Person',
          name: 'xzh',
          url: baseUrl
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/#/blog/${data.slug}`
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
        image: data.avatar ? (data.avatar.startsWith('http') ? data.avatar : `${baseUrl}${data.avatar}`) : undefined,
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