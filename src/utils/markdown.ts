import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

// 添加自定义渲染规则
md.renderer.rules.heading_open = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx];
  const level = token.tag;
  const titleToken = tokens[idx + 1];
  
  if (titleToken && titleToken.type === 'inline') {
    const title = titleToken.content;
    const anchor = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
    return `<${level} id="${anchor}">`;
  }
  
  return renderer.renderToken(tokens, idx, options);
};

// 自定义链接渲染，外部链接添加 target="_blank"
md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx];
  const href = token.attrGet('href');
  
  if (href && (href.startsWith('http') || href.startsWith('//'))) {
    token.attrSet('target', '_blank');
    token.attrSet('rel', 'noopener noreferrer');
  }
  
  return renderer.renderToken(tokens, idx, options);
};

// 渲染 Markdown 内容
export function renderMarkdown(content: string): string {
  return md.render(content);
}

// 提取文章目录
export function extractToc(content: string): Array<{ level: number; title: string; anchor: string }> {
  const tokens = md.parse(content, {});
  const toc: Array<{ level: number; title: string; anchor: string }> = [];
  
  tokens.forEach((token) => {
    if (token.type === 'heading_open') {
      const level = parseInt(token.tag.substring(1));
      const titleToken = tokens[tokens.indexOf(token) + 1];
      if (titleToken && titleToken.type === 'inline') {
        const title = titleToken.content;
        const anchor = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
        toc.push({ level, title, anchor });
      }
    }
  });
  
  return toc;
}

// 计算阅读时间（基于中文字符数和英文单词数）
export function calculateReadingTime(content: string): number {
  // 移除 Markdown 标记
  const plainText = content.replace(/[#*`_~\[\]()]/g, '');
  
  // 计算中文字符数
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
  
  // 计算英文单词数
  const englishWords = plainText.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(word => word.length > 0).length;
  
  // 中文阅读速度约 300 字/分钟，英文约 200 词/分钟
  const readingTime = Math.ceil((chineseChars / 300) + (englishWords / 200));
  
  return Math.max(1, readingTime);
}