<script>
  export let active = false
</script>

<span
  class="transition-colors duration-500"
  style="color: {active ? '#1a1a1a' : '#9ca3af'}"
>
  <slot />
</span>
