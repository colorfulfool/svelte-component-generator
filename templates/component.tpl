<script>
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<style>
</style>

<h1>{{  pascalCase c }}</h1>
<button on:click="{() => dispatch('notify', 'detail value')}">Fire Event</button>
