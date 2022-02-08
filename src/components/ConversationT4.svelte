<script>
  
  import {  reCAPTCHA_site_key  } from '../const';
  import { onMount } from 'svelte';
  // import 'https://www.google.com/recaptcha/api.js?render=6Lf4KD8eAAAAAI_Rzp-EnwKUjBgdEW7_N4wkW7RG';

  export let id;
  export let sender;
  export let value;
  export let isValidated;

  function validation(value = null){
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
    Please click the button to validate
  </div>
</div>