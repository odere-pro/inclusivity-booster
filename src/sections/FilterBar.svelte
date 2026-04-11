<script>
  import { getActiveFilters, setFilter, clearFilters, getFilterOptions, getFilteredPersonas } from '../lib/state.svelte.js'

  const filterMeta = [
    { key: 'language', label: 'Language' },
    { key: 'readingLevel', label: 'Level' },
    { key: 'ageGroup', label: 'Age' },
    { key: 'culturalLens', label: 'Lens' }
  ]

  let options = getFilterOptions()
  let filters = $derived(getActiveFilters())
  let activeCount = $derived(Object.keys(filters).length)
  let matchCount = $derived(getFilteredPersonas().length)
</script>

<div class="filter-bar">
  <div class="filter-bar__row">
    {#each filterMeta as fm}
      <div class="filter-select">
        <select
          aria-label="Filter by {fm.label}"
          value={filters[fm.key] ?? ''}
          onchange={(e) => setFilter(fm.key, e.target.value || null)}
        >
          <option value="">{fm.label}</option>
          {#each options[fm.key] as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    {/each}
    {#if activeCount > 0}
      <button class="filter-clear" onclick={clearFilters}>Clear</button>
    {/if}
  </div>
  {#if activeCount > 0}
    <span class="filter-bar__count">{matchCount} of 8 readers match</span>
  {/if}
</div>

<style>
  .filter-bar {
    padding: 4px 20px 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .filter-bar__row {
    display: flex;
    gap: 6px;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .filter-bar__row::-webkit-scrollbar {
    display: none;
  }

  .filter-select select {
    appearance: none;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 4px 24px 4px 10px;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-ui);
    cursor: pointer;
    white-space: nowrap;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%234a5a6e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    transition: all 0.15s;
  }

  .filter-select select:hover {
    border-color: var(--border-2);
    color: var(--text-bright);
  }

  .filter-select select:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
  }

  .filter-clear {
    background: none;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-ui-dim);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
  }

  .filter-clear:hover {
    color: var(--text-bright);
    border-color: var(--border-2);
  }

  .filter-bar__count {
    font-size: 11px;
    color: var(--text-ui-dim);
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    .filter-bar {
      padding: 4px 8px 6px;
    }
  }
</style>
