<script>
  import { getSelectedAdaptation, getSelectedPersonaId } from '../lib/state.svelte.js'

  const dimensionKeys = [
    { key: 'tone', label: 'Tone' },
    { key: 'vocabulary', label: 'Vocabulary' },
    { key: 'format', label: 'Format' },
    { key: 'culturalFraming', label: 'Cultural Framing' }
  ]

  let isBaseline = $derived(getSelectedPersonaId() === 'default')
  let inclusivityMeta = $derived(getSelectedAdaptation()?.inclusivityMeta ?? [])
</script>

{#if getSelectedAdaptation()}
  <section class="changes" aria-label="What changed across four dimensions">
    <h3 class="changes__title" class:changes__title--baseline={isBaseline}>What Changed</h3>
    <ul class="changes__list">
      {#each dimensionKeys as dim}
        {@const desc = getSelectedAdaptation().dimensions[dim.key]}
        {@const isUnchanged = desc?.startsWith('Unchanged')}
        <li class="changes__item" class:changes__item--unchanged={isUnchanged}>
          <span class="changes__label">{dim.label}</span>
          <span class="changes__desc">{desc}</span>
        </li>
      {/each}
    </ul>
  </section>

  {#if inclusivityMeta.length > 0}
    <section class="inclusivity" aria-label="Inclusivity changes and rationale">
      <h3 class="inclusivity__title">Inclusivity Changes</h3>
      <ul class="inclusivity__list">
        {#each inclusivityMeta as entry}
          <li class="inclusivity__item">
            <span class="inclusivity__change">{entry.change}</span>
            <span class="inclusivity__reason">{entry.reason}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
{/if}

<style>
  .changes {
    padding: 8px 20px 12px;
  }

  .changes__title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--blue-text);
    margin: 0 0 6px;
  }

  .changes__title--baseline {
    color: var(--text-ui-dim);
  }

  .changes__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .changes__item {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 5px 10px;
    border-radius: 6px;
    background: rgba(96, 165, 250, 0.06);
    border-left: 3px solid var(--blue-text);
  }

  .changes__item--unchanged {
    background: transparent;
    border-left-color: var(--border);
  }

  .changes__label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--blue-text);
    min-width: 64px;
    flex-shrink: 0;
  }

  .changes__item--unchanged .changes__label {
    color: var(--text-ui-dim);
  }

  .changes__desc {
    font-size: 12px;
    color: var(--text-ui);
    line-height: 1.4;
  }

  .changes__item--unchanged .changes__desc {
    color: var(--text-ui-dim);
  }

  /* Inclusivity Changes */
  .inclusivity {
    padding: 4px 20px 12px;
  }

  .inclusivity__title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--green-text, #4ade80);
    margin: 0 0 6px;
  }

  .inclusivity__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .inclusivity__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 6px 10px;
    border-radius: 6px;
    background: rgba(74, 222, 128, 0.06);
    border-left: 3px solid var(--green-text, #4ade80);
  }

  .inclusivity__change {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-bright);
    line-height: 1.4;
  }

  .inclusivity__reason {
    font-size: 11px;
    color: var(--text-ui);
    line-height: 1.4;
    font-style: italic;
  }

  @media (max-width: 480px) {
    .changes {
      padding: 6px 8px 10px;
    }

    .changes__item {
      flex-direction: column;
      gap: 1px;
      padding: 4px 8px;
    }

    .changes__label {
      min-width: unset;
    }

    .inclusivity {
      padding: 4px 8px 10px;
    }

    .inclusivity__item {
      padding: 4px 8px;
    }
  }
</style>
