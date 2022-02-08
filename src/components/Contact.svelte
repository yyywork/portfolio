<script>
  import { onMount, tick } from 'svelte';
  import { Grid, Row, Column } from "carbon-components-svelte";
  import ConversatT0 from './ConversationT0.svelte';
  import ConversatT1 from './ConversationT1.svelte';
  import ConversatT2 from './ConversationT2.svelte';
  import ConversatT3 from './ConversationT3.svelte';
  import { globalConfig, globalConfig_set } from '../store/store';
  
  let fetchJson = [];
  let currentSender = null
  let currentLine = {}
  let currentInputValidation = true
  let historyLine = []
  let inputVal = {}

  async function GetAPI(){
    let tempJson = await fetch('json/Conversation.json')
    fetchJson = await tempJson.json()
    currentSender = 0
    currentLine = fetchJson[currentSender].dialogue[0]
    historyLine.push(currentLine)
    getUntilInput()
  }

  async function getUntilInput(){
    if(currentLine.id === 6){
      send()
    }
    const result = getNextOne()
    currentLine = result
    historyLine.push(currentLine)
    historyLine = historyLine
    await tick()
    scrollToBottom()
    if(result?.type===1){
      getUntilInput()
    }
  }

  function scrollToBottom(){
    document.getElementById("lineContainer").scrollTop = document.getElementById("lineContainer").scrollHeight
  }

  function getNextOne(id = null){
    if(!id){
      id = currentLine.id
    }
    let result = findByRelative(id)
    if(result){
      return result
    }else{
      result = findById(++id)
      if(result){
        return result
      }
    }
    return null
  }

  function findByRelative(id){
    return fetchJson[currentSender].dialogue.find((val, index)=>{
      return val.options?.relativeFrom?.find((relativeVal, index2) => {
        if(relativeVal.selection){
          const curLine = findById(id)
          const res = relativeVal.selection.find((val, i)=>{
            return inputVal["input"+curLine?.options?.name] === val
          })
          return res
        }else{
          return relativeVal.id === id
        }
      })
    })
  }

  function findById(id){
    return fetchJson[currentSender].dialogue.find((val, index)=>{
      return val.id === id
    })
  }

  function setAns(val){
    historyLine.push(
      {
        type: 0,
        content: val
      }
    )
    getUntilInput()
  }

  function checkIfMove(val){
    if(currentInputValidation){
      setAns(val)
    }
  }

  // $: send(inputVal)

  async function send(){
    if(inputVal['inputactionRequest_1'] === "(Wave at Ying)" && inputVal['inputsendConfirm'] === "Transmit signal"){
      
      const contactAns = inputVal['inputcontactRequest']
      const orgAns = inputVal['inputorganizationRequest']
      const nameAns = inputVal['inputnameRequest']
      /* const res = await fetch('/apis/getToken', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }) */
      /* const res = await fetch('/apis/signal', {
        method: 'post',
        body: JSON.stringify({ contactAns, orgAns, nameAns }),
        headers: {
          'Content-Type': 'application/json'
        }
      }) */
      
      // const json = await res.json()
    }
  }

  onMount(async ()=>{
    GetAPI();
  })

  let contactSelected = 1
</script>
<div id="contactContainer">
  {#await fetchJson}
  {:then fetchJson}
  <Grid narrow>
    <Row>
      <Column id="contactList" sm={0} md={0} lg={4}>
        <div class="contactPerson" class:selected={contactSelected === 1}>
          Pilly
        </div>
      </Column>
      <Column id="conversation" sm={16} md={16} lg={12}>
        <div id="lineContainer" class:gameFont={$globalConfig.isGameFont} on:click={() => globalConfig_set({isGameFont : !$globalConfig.isGameFont})} >
          {#each historyLine as value}
            {#if value.type === 0}
              <ConversatT0 sender="You" content="{value.content}"/>
            {:else if value.type === 1}
              <ConversatT1 sender="{fetchJson[0].sender}" id="{value.id}" content="{value.content}" options="{value.options}"/>
            {:else if value.type === 3}
              <ConversatT2 sender="{fetchJson[0].sender}" id="{value.id}" content="{value.content}" options="{value.options}" bind:isValidated="{currentInputValidation}" value="{inputVal['input'+value.options.name]}"/>
            {:else if value.type === 2}
            <ConversatT3 sender="{fetchJson[0].sender}" id="{value.id}" content="{value.content}" options="{value.options}" bind:isValidated="{currentInputValidation}" value="{inputVal['input'+value.options.name]}"/>
            
            {/if}
          {/each}
        </div>

      <div  class:gameFont={$globalConfig.isGameFont} class="inputLine">
      {#if currentLine.type === 3}
          <input type="text" name="{currentLine.options.name}" bind:value={inputVal['input'+currentLine.options.name]} />
          <div class="textSend" autofocus on:click={checkIfMove(inputVal['input'+currentLine.options.name])}>Send</div>
      {:else if currentLine.type === 2}
          {#each currentLine.options.selection as selectList}
          <label>
            <input type="button" name="{currentLine.options?.name}" on:click="{()=>{inputVal['input'+currentLine.options.name] = selectList;checkIfMove(inputVal['input'+currentLine.options.name])}}" value="{selectList}"/>
          </label>
          {/each}
      {/if}
      </div>

      </Column>
    </Row>
  </Grid>
  {/await}
</div>
<style global>
</style>