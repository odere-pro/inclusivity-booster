<script>
  let { label, icon, description } = $props()
</script>

<div class="dim-card">
  <div class="dim-card__header">
    <span class="dim-card__icon" aria-hidden="true">{icon}</span>
    <span class="dim-card__label">{label}</span>
  </div>
  <p class="dim-card__desc">{description}</p>
</div>

<style>
  .dim-card {
    padding: 12px 14px;
    border-radius: 10px;
    background: var(--surface-2);
    border: 1px solid var(--border);
  }

  .dim-card__header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
  }

  .dim-card__icon {
    font-size: 14px;
  }

  .dim-card__label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .dim-card__desc {
    margin: 0;
    font-size: 13px;
    color: var(--text-ui);
    line-height: 1.5;
  }
</style>
