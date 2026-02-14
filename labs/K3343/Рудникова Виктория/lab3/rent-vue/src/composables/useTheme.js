import { ref, computed, onMounted, watch } from 'vue'

const STORAGE_KEY = 'theme'
const LIGHT = 'light'
const DARK = 'dark'

function getStored() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function applyToDocument(theme) {
  const html = document.documentElement
  if (theme === DARK) {
    html.setAttribute('data-theme', DARK)
  } else {
    html.removeAttribute('data-theme')
  }
}

export function useTheme() {
  const theme = ref(getStored() === DARK ? DARK : LIGHT)

  const isDark = computed(() => theme.value === DARK)

  const toggleLabel = computed(() =>
    isDark.value ? 'Включить светлую тему' : 'Включить тёмную тему'
  )

  /** id иконки в спрайте: солнце или луна */
  const iconId = computed(() => (isDark.value ? 'icon-moon' : 'icon-sun'))

  function setTheme(value) {
    if (value !== LIGHT && value !== DARK) return
    theme.value = value
    applyToDocument(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {}
  }

  function toggle() {
    setTheme(theme.value === LIGHT ? DARK : LIGHT)
  }

  onMounted(() => {
    applyToDocument(theme.value)
  })

  watch(theme, (value) => {
    applyToDocument(value)
  })

  return {
    theme,
    isDark,
    toggleLabel,
    iconId,
    setTheme,
    toggle,
  }
}
