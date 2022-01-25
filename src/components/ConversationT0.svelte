<script>
  export let sender;
  export let content;
</script>
{#if content}
<div class="conversationLine isRight">
  <div class="lineSender">{sender}:</div>
  <div class="planText">
    {content}
  </div>
</div>
{/if}
<style>

</style>