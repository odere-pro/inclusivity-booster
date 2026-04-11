<script>
  import { fade } from 'svelte/transition'
  import StatBadge from '../components/StatBadge.svelte'
  import { getSelectedSource, getSelectedAdaptation } from '../lib/state.svelte.js'
  import { typewriter } from '../lib/typewriter.js'

  let adaptationKey = $derived(getSelectedAdaptation()?.id ?? '')
</script>

<div class="pane-wrapper">
  <!-- Original -->
  <div class="pane">
    <div class="pane__header">
      <span class="pane__label" aria-hidden="true">Original</span>
    </div>
    {#if getSelectedSource()}
      <article class="pane__content">
        <h2 class="pane__headline">{getSelectedSource().headline}</h2>
        <div class="pane__body">{getSelectedSource().body}</div>
        <div class="pane__stats">
          <StatBadge icon="\ud83d\udcca" label="words" value={getSelectedSource().metadata.wordCount} />
          <StatBadge icon="\ud83c\udf93" label="" value={getSelectedSource().metadata.readingLevel} />
          <StatBadge icon="\ud83c\udf10" label="" value={getSelectedSource().metadata.language.toUpperCase()} />
        </div>
      </article>
    {/if}
  </div>

  <!-- Adapted -->
  <div class="pane pane--adapted" aria-live="polite">
    <div class="pane__header">
      <span class="pane__label pane__label--adapted" aria-hidden="true">Adapted</span>
    </div>
    {#if getSelectedAdaptation()}
      {#key adaptationKey}
        <article class="pane__content" in:fade={{ duration: 200 }}>
          <h2 class="pane__headline pane__headline--adapted">{getSelectedAdaptation().headline}</h2>
          <div class="pane__body" use:typewriter={{ speed: 10 }}>{getSelectedAdaptation().body}</div>
          <div class="pane__stats">
            <StatBadge icon="\ud83d\udcca" label="words" value={getSelectedAdaptation().stats.wordCount} variant="accent" />
            <StatBadge icon="\ud83c\udf93" label="" value={getSelectedAdaptation().stats.readingLevel} variant="accent" />
            <StatBadge icon="\ud83c\udf10" label="" value={getSelectedAdaptation().profile.languageLabel} variant="accent" />
          </div>
        </article>
      {/key}
    {/if}
  </div>
</div>

<!-- Mobile: collapsible original -->
<details class="mobile-original">
  <summary>View original article</summary>
  {#if getSelectedSource()}
    <article class="pane__content">
      <h2 class="pane__headline">{getSelectedSource().headline}</h2>
      <div class="pane__body">{getSelectedSource().body}</div>
      <div class="pane__stats">
        <StatBadge icon="\ud83d\udcca" label="words" value={getSelectedSource().metadata.wordCount} />
        <StatBadge icon="\ud83c\udf93" label="" value={getSelectedSource().metadata.readingLevel} />
        <StatBadge icon="\ud83c\udf10" label="" value={getSelectedSource().metadata.language.toUpperCase()} />
      </div>
    </article>
  {/if}
</details>

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
  }

  .pane--adapted {
    border-color: var(--blue-border);
  }

  .pane__header {
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
  }

  .pane__label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-ui-dim);
  }

  .pane__label--adapted {
    color: var(--blue-text);
  }

  .pane__content {
    padding: 16px;
  }

  .pane__headline {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-bright);
    margin: 0 0 12px;
    line-height: 1.4;
  }

  .pane__headline--adapted {
    color: var(--blue-text);
  }

  .pane__body {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-ui);
    white-space: pre-line;
    margin-bottom: 16px;
  }

  .pane__stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  .mobile-original {
    display: none;
    margin: 0 20px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
  }

  .mobile-original summary {
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-ui);
    cursor: pointer;
  }

  .mobile-original .pane__content {
    border-top: 1px solid var(--border);
  }

  @media (max-width: 768px) {
    .pane-wrapper {
      grid-template-columns: 1fr;
    }

    .pane-wrapper .pane:first-child {
      display: none;
    }

    .mobile-original {
      display: block;
    }
  }
</style>
