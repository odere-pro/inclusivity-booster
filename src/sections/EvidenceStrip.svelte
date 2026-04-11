<script>
  import { getSelectedSource, getSelectedAdaptation, getSelectedPersonaId } from '../lib/state.svelte.js'

  const readingLevelScale = { 'Simple': 1, 'Standard': 2, 'Advanced': 3, 'Expert': 4 }

  let source = $derived(getSelectedSource())
  let adaptation = $derived(getSelectedAdaptation())
  let isBaseline = $derived(getSelectedPersonaId() === 'default')

  let metrics = $derived.by(() => {
    if (!source || !adaptation) return []

    const origWords = source.metadata.wordCount
    const adaptWords = adaptation.stats.wordCount
    const wordDelta = adaptWords - origWords
    const wordPct = origWords > 0 ? Math.round((wordDelta / origWords) * 100) : 0

    const origSentLen = source.metadata.avgSentenceLength
    const adaptSentLen = adaptation.stats.avgSentenceLength
    const sentDelta = adaptSentLen - origSentLen
    const sentPct = origSentLen > 0 ? Math.round((sentDelta / origSentLen) * 100) : 0

    const origLevel = source.metadata.readingLevel
    const adaptLevel = adaptation.stats.readingLevel
    const origLevelNum = readingLevelScale[origLevel] ?? 4
    const adaptLevelNum = readingLevelScale[adaptLevel] ?? 4
    const levelDiff = adaptLevelNum - origLevelNum

    return [
      {
        label: 'Word count',
        original: origWords,
        adapted: adaptWords,
        origPct: Math.min(100, (origWords / Math.max(origWords, adaptWords)) * 100),
        adaptPct: Math.min(100, (adaptWords / Math.max(origWords, adaptWords)) * 100),
        delta: `${wordDelta > 0 ? '+' : ''}${wordDelta} (${wordPct > 0 ? '+' : ''}${wordPct}%)`
      },
      {
        label: 'Avg sentence',
        original: origSentLen,
        adapted: adaptSentLen,
        origPct: Math.min(100, (origSentLen / Math.max(origSentLen, adaptSentLen)) * 100),
        adaptPct: Math.min(100, (adaptSentLen / Math.max(origSentLen, adaptSentLen)) * 100),
        delta: `${sentDelta > 0 ? '+' : ''}${sentDelta} words (${sentPct > 0 ? '+' : ''}${sentPct}%)`
      },
      {
        label: 'Reading level',
        original: origLevel,
        adapted: adaptLevel,
        origPct: (origLevelNum / 4) * 100,
        adaptPct: (adaptLevelNum / 4) * 100,
        delta: levelDiff === 0 ? 'No change' : `${levelDiff > 0 ? '+' : ''}${levelDiff} ${Math.abs(levelDiff) === 1 ? 'step' : 'steps'}`
      }
    ]
  })
</script>

{#if metrics.length > 0}
  <section class="comparison" aria-label="Adaptation statistics">
    <h3 class="comparison__title">Comparison</h3>
    <div class="comparison__bars">
      {#each metrics as m}
        <div class="bar-group" class:bar-group--unchanged={m.original === m.adapted}>
          <div class="bar-group__header">
            <span class="bar-group__label">{m.label}</span>
            <span class="bar-group__delta" class:bar-group__delta--changed={m.original !== m.adapted}>
              {m.delta}
            </span>
          </div>
          <div class="bar-group__tracks">
            <div class="bar-track">
              <div class="bar bar--original" style="width: {m.origPct}%"></div>
              <span class="bar__val">{m.original}</span>
            </div>
            <div class="bar-track">
              <div class="bar bar--adapted" style="width: {m.adaptPct}%"></div>
              <span class="bar__val bar__val--adapted">{m.adapted}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/if}

<style>
  .comparison {
    padding: 8px 20px 16px;
    border-top: 1px solid var(--border);
  }

  .comparison__title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-ui-dim);
    margin: 0 0 8px;
  }

  .comparison__bars {
    display: flex;
    gap: 12px;
  }

  .bar-group {
    flex: 1;
    min-width: 0;
  }

  .bar-group__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
    gap: 6px;
  }

  .bar-group__label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-bright);
    white-space: nowrap;
  }

  .bar-group__delta {
    font-size: 10px;
    color: var(--text-ui-dim);
    white-space: nowrap;
  }

  .bar-group__delta--changed {
    color: var(--blue-text);
  }

  .bar-group__tracks {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .bar-track {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 14px;
  }

  .bar {
    height: 8px;
    border-radius: 4px;
    transition: width 0.4s ease-out;
    min-width: 4px;
  }

  .bar--original {
    background: var(--border-2);
  }

  .bar--adapted {
    background: var(--blue-text);
  }

  .bar__val {
    font-size: 10px;
    font-weight: 600;
    color: var(--text-ui-dim);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .bar__val--adapted {
    color: var(--blue-text);
  }

  @media (max-width: 900px) {
    .comparison {
      padding: 8px 12px 12px;
    }
  }

  @media (max-width: 480px) {
    .comparison {
      padding: 6px 8px 10px;
    }

    .comparison__bars {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
