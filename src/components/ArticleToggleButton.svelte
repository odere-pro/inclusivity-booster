<script>
  let { icon, label, selected = false, onclick } = $props()
</script>

<button
  class="toggle-btn"
  class:toggle-btn--selected={selected}
  aria-pressed={selected}
  onclick={onclick}
>
  <span aria-hidden="true">{icon}</span>
  {label}
</button>

<style>
  .toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-ui);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .toggle-btn:hover {
    border-color: var(--border-2);
    background: var(--surface-2);
  }

  .toggle-btn--selected {
    border-color: var(--blue-border);
    background: var(--blue-bg);
    color: var(--blue-text);
  }
</style>
