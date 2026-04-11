<script>
  let { persona, selected = false, onclick, tabindex = 0 } = $props()
</script>

<button
  class="persona-chip"
  class:persona-chip--selected={selected}
  aria-pressed={selected}
  aria-label="{persona.name} — {persona.description}"
  onclick={onclick}
  {tabindex}
>
  <span class="persona-chip__name">{persona.name}</span>
</button>

<style>
  .persona-chip {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-ui);
  }

  .persona-chip:hover {
    border-color: var(--border-2);
    background: var(--surface-2);
    color: var(--text-bright);
  }

  .persona-chip--selected {
    border-color: var(--blue-border);
    background: var(--blue-bg);
    color: var(--blue-text);
    font-weight: 600;
  }

  .persona-chip__name {
    line-height: 1;
  }
</style>
