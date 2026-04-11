<script>
  let { persona, selected = false, onclick } = $props()
</script>

<button
  class="persona-card"
  class:persona-card--selected={selected}
  aria-pressed={selected}
  onclick={onclick}
>
  <span class="persona-card__avatar" aria-hidden="true">{persona.avatar}</span>
  <span class="persona-card__info">
    <span class="persona-card__name">{persona.name}</span>
    <span class="persona-card__desc">{persona.description}</span>
  </span>
</button>

<style>
  .persona-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    min-width: 0;
    flex-shrink: 0;
  }

  .persona-card:hover {
    border-color: var(--border-2);
    background: var(--surface-2);
  }

  .persona-card--selected {
    border-color: var(--blue-border);
    background: var(--blue-bg);
  }

  .persona-card__avatar {
    font-size: 24px;
    flex-shrink: 0;
    line-height: 1;
  }

  .persona-card__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .persona-card__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-bright);
    white-space: nowrap;
  }

  .persona-card--selected .persona-card__name {
    color: var(--blue-text);
  }

  .persona-card__desc {
    font-size: 11px;
    color: var(--text-ui-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
