<script>
  import PersonaCard from '../components/PersonaCard.svelte'
  import { getSelectedPersonaId, setSelectedPersonaId, getFilteredPersonas } from '../lib/state.svelte.js'

  let filteredPersonas = $derived(getFilteredPersonas())

  function handleKeydown(e) {
    const cards = [...e.currentTarget.querySelectorAll('button')]
    const currentIndex = cards.findIndex(btn => btn === document.activeElement)
    if (currentIndex === -1) return

    let nextIndex
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % cards.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + cards.length) % cards.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = cards.length - 1
    }

    if (nextIndex !== undefined) {
      cards[nextIndex].focus()
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="persona-bar" role="group" aria-label="Persona selection" onkeydown={handleKeydown}>
  {#if filteredPersonas.length === 0}
    <p class="persona-bar__empty">No readers match these filters. Try removing a filter.</p>
  {:else}
    <div class="persona-bar__chips">
      {#each filteredPersonas as persona}
        <PersonaCard
          {persona}
          selected={getSelectedPersonaId() === persona.id}
          onclick={() => setSelectedPersonaId(persona.id)}
          tabindex={getSelectedPersonaId() === persona.id ? 0 : -1}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .persona-bar {
    padding: 2px 20px 10px;
  }

  .persona-bar__chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border-2) transparent;
  }

  .persona-bar__chips > :global(*) {
    scroll-snap-align: start;
  }

  .persona-bar__empty {
    margin: 0;
    font-size: 12px;
    color: var(--text-ui-dim);
    font-style: italic;
    padding: 4px 0;
  }

  @media (max-width: 480px) {
    .persona-bar {
      padding: 2px 8px 6px;
    }
  }
</style>
