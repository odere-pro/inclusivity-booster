<script>
  import ArticleToggleButton from '../components/ArticleToggleButton.svelte'
  import sources from '../data/sources.json'
  import { getSelectedSourceId, setSelectedSourceId } from '../lib/state.svelte.js'

  const icons = { housing: '\ud83d\udcf0', immigration: '\ud83d\udccb' }
</script>

<div class="article-toggle" role="group" aria-label="Article selection">
  {#each sources as source}
    <ArticleToggleButton
      icon={icons[source.id] ?? '\ud83d\udcc4'}
      label={source.topic}
      selected={getSelectedSourceId() === source.id}
      onclick={() => setSelectedSourceId(source.id)}
    />
  {/each}
</div>

<style>
  .article-toggle {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    .article-toggle {
      padding: 0 8px;
      gap: 6px;
    }
  }
</style>
