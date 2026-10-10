import { computed, ref } from 'vue'

type Theme = 'light' | 'dark'
const theme = ref<Theme>(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
let userChoice = false
try { userChoice = ['light', 'dark'].includes(localStorage.getItem('theme') || '') } catch {}

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.classList.toggle('dark', value === 'dark')
  document.documentElement.style.colorScheme = value
}
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
systemTheme.addEventListener('change', event => {
  if (!userChoice) applyTheme(event.matches ? 'dark' : 'light')
})

export function useTheme() {
  const toggleTheme = () => {
    userChoice = true
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
    try { localStorage.setItem('theme', theme.value) } catch {}
  }
  return { theme, toggleTheme, isDark: computed(() => theme.value === 'dark') }
}
