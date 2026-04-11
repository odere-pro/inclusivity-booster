<script>
  import DimensionCard from '../components/DimensionCard.svelte'
  import { getSelectedAdaptation } from '../lib/state.svelte.js'

  const dimensionMeta = {
    tone: { label: 'Tone', icon: '\ud83c\udfa4' },
    vocabulary: { label: 'Vocabulary', icon: '\ud83d\udcdd' },
    format: { label: 'Format', icon: '\ud83d\udcd0' },
    culturalFraming: { label: 'Cultural Framing', icon: '\ud83c\udf0d' }
  }
</script>

{#if getSelectedAdaptation()}
  <section class="breakdown" aria-label="What changed across four dimensions">
    <h3 class="breakdown__title">What Changed</h3>
    <div class="breakdown__grid">
      {#each Object.entries(dimensionMeta) as [key, meta]}
        <DimensionCard
          label={meta.label}
          icon={meta.icon}
          description={getSelectedAdaptation().dimensions[key]}
        />
      {/each}
    </div>
  </section>
{/if}

<style>
  .breakdown {
    padding: 16px 20px 20px;
  }

  .breakdown__title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-ui-dim);
    margin: 0 0 12px;
  }

  .breakdown__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (max-width: 900px) {
    .breakdown__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .breakdown__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
