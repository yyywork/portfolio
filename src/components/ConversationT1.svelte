<script>
  export let sender;
  // export let id;
  export let content;
  // export let options;
</script>
<div class="conversationLine isLeft">
  <div class="lineSender">{sender}:</div>
  <div class="planText">
    {#if Array.isArray(content)}
      {#each content as value}
        {@html value}<br>
      {/each}
    {:else}
      {content}
    {/if}
  </div>
</div>
<style>

</style>