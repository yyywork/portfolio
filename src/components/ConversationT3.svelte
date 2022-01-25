<script>
  import { onMount } from 'svelte';
  export let sender;
  export let id;
  export let content;
  export let options;
  export let value;
  export let isValidated;


  function validation(value){
    isValidated = value?.length?true:false
    isValidated = true
  }

  $: validation(value)

  onMount(async ()=>{
    validation(value)
  })
</script>
<div class="conversationLine isLeft">
  <div class="lineSender">{sender}:</div>
  <div class="planText">
    {content}
  </div>
</div>
<style>

</style>