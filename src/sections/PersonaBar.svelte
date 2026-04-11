<script>
  import PersonaCard from '../components/PersonaCard.svelte'
  import personas from '../data/personas.json'
  import { getSelectedPersonaId, setSelectedPersonaId } from '../lib/state.svelte.js'

  const categoryLabels = {
    language: 'Language',
    generation: 'Generation',
    role: 'Role',
    baseline: 'Baseline'
  }

  const grouped = Object.groupBy
    ? Object.groupBy(personas, p => p.category)
    : personas.reduce((acc, p) => {
        ;(acc[p.category] ??= []).push(p)
        return acc
      }, {})

  const categories = ['language', 'generation', 'role', 'baseline']
</script>

<div class="persona-bar" role="group" aria-label="Persona selection">
  {#each categories as cat}
    {#if grouped[cat]?.length}
      <div class="persona-group">
        <span class="persona-group__label">{categoryLabels[cat]}</span>
        <div class="persona-group__cards">
          {#each grouped[cat] as persona}
            <PersonaCard
              {persona}
              selected={getSelectedPersonaId() === persona.id}
              onclick={() => setSelectedPersonaId(persona.id)}
            />
          {/each}
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  .persona-bar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px 20px 16px;
  }

  .persona-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .persona-group__label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-ui-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    min-width: 80px;
    flex-shrink: 0;
  }

  .persona-group__cards {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .persona-group__cards::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    .persona-group {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .persona-group__label {
      min-width: unset;
    }
  }
</style>
