<script>
  let { source, stat, label } = $props()
</script>

<div class="ev-card">
  <span class="ev-card__stat">{stat}</span>
  <span class="ev-card__label">{label}</span>
  <span class="ev-card__source">{source}</span>
</div>

<style>
  .ev-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
    border-radius: 10px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    min-width: 0;
  }

  .ev-card__stat {
    font-size: 22px;
    font-weight: 700;
    color: var(--blue-text);
    line-height: 1.1;
  }

  .ev-card__label {
    font-size: 12px;
    color: var(--text-ui);
    line-height: 1.4;
  }

  .ev-card__source {
    font-size: 11px;
    color: var(--text-ui-dim);
    margin-top: 2px;
  }
</style>
