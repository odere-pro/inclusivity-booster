<script>
  import EvidenceCard from '../components/EvidenceCard.svelte'
  import evidence from '../data/evidence.json'
</script>

<section class="evidence" aria-label="Evidence from real-world deployments">
  <h3 class="evidence__title">Evidence</h3>
  <div class="evidence__scroll">
    {#each evidence as item}
      <EvidenceCard source={item.source} stat={item.stat} label={item.label} />
    {/each}
  </div>
</section>

<style>
  .evidence {
    padding: 16px 20px 20px;
    border-top: 1px solid var(--border);
  }

  .evidence__title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-ui-dim);
    margin: 0 0 12px;
  }

  .evidence__scroll {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border-2) transparent;
  }
</style>
