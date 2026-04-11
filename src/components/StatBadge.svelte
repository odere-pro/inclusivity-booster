<script>
  let { icon, label, value, variant = 'default' } = $props()
</script>

<span class="stat-badge" class:stat-badge--accent={variant === 'accent'}>
  <span class="stat-badge__icon" aria-hidden="true">{icon}</span>
  <span class="stat-badge__value">{value}</span>
  <span class="stat-badge__label">{label}</span>
</span>

<style>
  .stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    color: var(--text-ui);
    background: var(--surface-2);
    border: 1px solid var(--border);
  }

  .stat-badge--accent {
    background: var(--blue-bg);
    border-color: var(--blue-border);
    color: var(--blue-text);
  }

  .stat-badge__icon {
    font-size: 13px;
  }

  .stat-badge__value {
    font-weight: 600;
    color: var(--text-bright);
  }

  .stat-badge--accent .stat-badge__value {
    color: var(--blue-text);
  }

  .stat-badge__label {
    opacity: 0.8;
  }
</style>
