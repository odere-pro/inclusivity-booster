<script>
  let { persona, selected = false, onclick, tabindex = 0 } = $props()

  const levelColor = {
    simple: 'var(--green-text)',
    standard: 'var(--blue-text)',
    expert: 'var(--purple-text)'
  }

  const formatIcon = {
    article: '📰',
    linkedin: '💼',
    'social-media': '📱',
    newsletter: '📬'
  }

  import { adaptationMap } from '../lib/state.svelte.js'

  let profile = $derived(() => {
    const adaptId = persona.adaptations['housing']
    return adaptationMap.get(adaptId)?.profile ?? null
  })
</script>

<button
  class="persona-card"
  class:persona-card--selected={selected}
  aria-pressed={selected}
  aria-label="{persona.name} — {persona.description}"
  onclick={onclick}
  {tabindex}
>
  <span class="persona-card__avatar" aria-hidden="true">{persona.avatar}</span>
  <div class="persona-card__info">
    <span class="persona-card__name">{persona.name}</span>
    <span class="persona-card__desc">{persona.description}</span>
  </div>
  {#if profile()}
    <div class="persona-card__stats">
      <span class="persona-card__pill" style="color: {levelColor[profile().readingLevel] ?? 'var(--text-ui)'}">
        {profile().readingLevel}
      </span>
      <span class="persona-card__pill">
        {profile().ageGroup === 'young-adult' ? 'young adult' : profile().ageGroup}
      </span>
      {#if persona.gender && persona.gender !== 'neutral'}
        <span class="persona-card__pill">{persona.gender}</span>
      {/if}
      {#if persona.format}
        <span class="persona-card__pill">
          <span aria-hidden="true">{formatIcon[persona.format] ?? ''}</span>
          {persona.format === 'social-media' ? 'social' : persona.format}
        </span>
      {/if}
    </div>
  {/if}
</button>

<style>
  .persona-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 10px 10px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all 0.15s;
    min-width: 130px;
    max-width: 150px;
    flex-shrink: 0;
    text-align: center;
  }

  .persona-card:hover {
    border-color: var(--border-2);
    background: var(--surface-2);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .persona-card--selected {
    border-color: var(--blue-border);
    background: var(--blue-bg);
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.12);
  }

  .persona-card__avatar {
    font-size: 42px;
    line-height: 1;
  }

  .persona-card__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .persona-card__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-bright);
    line-height: 1.2;
  }

  .persona-card__desc {
    font-size: 10px;
    color: var(--text-ui-dim);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 26px;
  }

  .persona-card__stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3px;
    margin-top: 2px;
  }

  .persona-card__pill {
    font-size: 9px;
    font-weight: 500;
    padding: 1px 6px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text-ui);
    text-transform: capitalize;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    line-height: 1.4;
  }

  .persona-card__pill span {
    font-size: 9px;
  }

  @media (max-width: 480px) {
    .persona-card {
      min-width: 110px;
      max-width: 130px;
      padding: 10px 8px 8px;
    }

    .persona-card__avatar {
      font-size: 36px;
    }
  }
</style>
