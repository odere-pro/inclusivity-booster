<script>
  import HeroQuote from './sections/HeroQuote.svelte'
  import ArticleToggle from './sections/ArticleToggle.svelte'
  import PersonaBar from './sections/PersonaBar.svelte'
  import ArticlePane from './sections/ArticlePane.svelte'
  import DimensionBreakdown from './sections/DimensionBreakdown.svelte'
  import EvidenceStrip from './sections/EvidenceStrip.svelte'
  import Footer from './sections/Footer.svelte'
  import { getSelectedPersona, getSelectedAdaptation } from './lib/state.svelte.js'

  let announcement = $state('')

  export function announce(message) {
    announcement = ''
    requestAnimationFrame(() => { announcement = message })
  }
</script>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
>
  Skip to main content
</a>

<div role="status" aria-live="assertive" aria-atomic="true" class="sr-only">{announcement}</div>

<div class="app-shell">
  <header class="app-header">
    <div class="app-header__left">
      <h1 class="app-header__title">inclusivity-booster</h1>
    </div>
    <nav class="app-header__nav">
      <a
        href="https://medium.com/@alex-derechei"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="About — read on Medium (opens in new tab)"
      >
        About
      </a>
      <a
        href="https://github.com/odere-pro/inclusivity-booster"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository (opens in new tab)"
      >
        GitHub
      </a>
    </nav>
  </header>

  <main id="main-content" class="app-main">
    <HeroQuote />
    <ArticleToggle />
    <PersonaBar />
    <ArticlePane />
    <DimensionBreakdown />
    <EvidenceStrip />
  </main>

  <Footer />
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    max-width: 1280px;
    margin: 0 auto;
  }

  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }

  .app-header__title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-bright);
  }

  .app-header__nav {
    display: flex;
    gap: 16px;
  }

  .app-header__nav a {
    font-size: 13px;
    color: var(--text-ui);
    text-decoration: none;
    transition: color 0.2s;
  }

  .app-header__nav a:hover {
    color: var(--blue-text);
  }

  .app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
  }
</style>
