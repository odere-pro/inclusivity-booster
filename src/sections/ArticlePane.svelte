<script>
  import { fade } from 'svelte/transition'
  import StatBadge from '../components/StatBadge.svelte'
  import { getSelectedSource, getSelectedAdaptation } from '../lib/state.svelte.js'

  let adaptationKey = $derived(getSelectedAdaptation()?.id ?? '')
</script>

<div class="pane-wrapper">
  <!-- Original -->
  <div class="pane pane--original">
    <div class="pane__header">
      <span class="pane__label">Original</span>
      <div class="pane__header-stats">
        {#if getSelectedSource()}
          <StatBadge label="Words" value={getSelectedSource().metadata.wordCount} />
          <StatBadge label="Level" value={getSelectedSource().metadata.readingLevel} />
          <StatBadge label="Lang" value={getSelectedSource().metadata.language.toUpperCase()} />
        {/if}
      </div>
    </div>
    {#if getSelectedSource()}
      <article class="pane__content">
        <h2 class="pane__headline">{getSelectedSource().headline}</h2>
        <div class="pane__body">{getSelectedSource().body}</div>
      </article>
    {/if}
  </div>

  <!-- Adapted -->
  <div class="pane pane--adapted" aria-live="polite">
    <div class="pane__header">
      <span class="pane__label pane__label--adapted">Adapted</span>
      <div class="pane__header-stats">
        {#if getSelectedAdaptation()}
          <StatBadge label="Words" value={getSelectedAdaptation().stats.wordCount} variant="accent" />
          <StatBadge label="Level" value={getSelectedAdaptation().stats.readingLevel} variant="accent" />
          <StatBadge label="Lang" value={getSelectedAdaptation().profile.languageLabel} variant="accent" />
        {/if}
      </div>
    </div>
    {#if getSelectedAdaptation()}
      {#key adaptationKey}
        <article class="pane__content" lang={getSelectedAdaptation().profile.language} in:fade={{ duration: 200 }}>
          <h2 class="pane__headline pane__headline--adapted">{getSelectedAdaptation().headline}</h2>
          <div class="pane__body">{getSelectedAdaptation().body}</div>
        </article>
      {/key}
    {/if}
  </div>
</div>

<style>
  .pane-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 0 20px;
  }

  .pane {
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--surface);
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    min-width: 0;
    max-width: 100%;
  }

  .pane--adapted {
    border-color: var(--blue-border);
    box-shadow: 0 2px 16px rgba(96, 165, 250, 0.08);
  }

  .pane__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--border);
  }

  .pane__header-stats {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .pane__header-stats::-webkit-scrollbar {
    display: none;
  }

  .pane__label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-ui-dim);
    flex-shrink: 0;
  }

  .pane__label--adapted {
    color: var(--blue-text);
  }

  .pane__content {
    padding: 16px;
    overflow-y: auto;
  }

  .pane__headline {
    font-size: 17px;
    font-weight: 700;
    color: var(--text-bright);
    margin: 0 0 12px;
    line-height: 1.4;
    overflow-wrap: break-word;
  }

  .pane__headline--adapted {
    color: var(--blue-text);
  }

  .pane__body {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-ui);
    white-space: pre-line;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  @media (max-width: 900px) {
    .pane-wrapper {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 0 12px;
    }
  }

  @media (max-width: 480px) {
    .pane-wrapper {
      padding: 0 8px;
      gap: 8px;
    }

    .pane__content {
      padding: 12px;
    }

    .pane__headline {
      font-size: 15px;
      margin: 0 0 8px;
    }

    .pane__body {
      font-size: 13px;
      line-height: 1.6;
    }

    .pane__header {
      padding: 6px 10px;
    }
  }
</style>
