<script>
  import { Grid, Row, Column } from "carbon-components-svelte";
  import { onMount, tick } from 'svelte';
  import { globalConfig, globalConfig_set } from '../store/store';

  export let data = null;
  let selectedArea = [0, 0];
  onMount(()=>{
  })

</script>
<div class="swiperInnerText noBackdrop" class:gameFont={$globalConfig.isGameFont}>
  <div class="topLeftCorner borderCorner"></div>
  <div class="topRightCorner borderCorner"></div>
  <div class="bottomLeftCorner borderCorner"></div>
  <div class="bottomRightCorner borderCorner"></div>
  <Grid class="content" narrow>
    <Row class="content">
      <Column class="abilityRel abilityCol" sm={16} md={8} lg={8}>
        <div on:click={() => globalConfig_set({isGameFont : !$globalConfig.isGameFont})} class="ability shrinkFont">
          {data.name}
        </div>
      </Column>
      <Column class="abilityRel abilitySelectionCol" sm={16} md={8} lg={8}>
        <div class="abilitySelection">
          <div class="framework">
            {#each data.value as value, index }
            <span class="selectionAbility" class:selectedAbility="{selectedArea[0] === index}" on:click={() => selectedArea = [index, 0]}>{value.framework}</span>
            {#if index !== data.value.length - 1}<span class="slash">/ </span>{/if}
            {/each}
          </div>
          <div class="role">
            {data.value[selectedArea[0]].role}
          </div>
          <div class="area">
            {#each data.value[selectedArea[0]].category as value, index }
              <span class="selectionAbility" class:selectedAbility="{selectedArea[1] === index}" on:click={() => selectedArea[1] = index}>{value.name}</span>
              {#if index !== data.value[selectedArea[0]].category.length - 1}<span class="slash">/ </span>{/if}
            {/each}
          </div>
        </div>
      </Column>
      <Column class="resCol" sm={16} md={16} lg={16}>
        <div class="responsibility" on:click={() => globalConfig_set({isGameFont : !$globalConfig.isGameFont})}>
          {#if data.value[selectedArea[0]].category[selectedArea[1]]}
            <span class="resContent" id="{data.name + 'Cont'}">
              {#if Array.isArray(data.value[selectedArea[0]].category[selectedArea[1]].content)}
                {#each data.value[selectedArea[0]].category[selectedArea[1]].content as value, index }
                  {@html value}<br><br>
                {/each}
              {:else}
                {@html data.value[selectedArea[0]].category[selectedArea[1]].content}
              {/if}
            </span>
          {/if}

        </div>
      </Column>
    </Row>
  </Grid>
</div>
<style :global>
  :global(.content){
    width: 100%;
    height: 100%;
    padding: 25px;
  }
  :global(.abilityRel){
    position: relative;
  }
  .ability{
    font-size: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    text-shadow: 10px 20px 20px white;
    transform: translate(-50%, -50%);
  }
  .ability, .slash, .resContent{
    cursor: default;
  }
  .abilitySelection{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
  .abilitySelection div{
    margin: 3vh 0px;
    text-align: left;
  }
  .responsibility{
    line-height: 1.2em;
    text-align: left;
    padding: 25px;
    position: absolute;
    width: 100%;
  }
  .resContent{
    animation: startRes 1s ease-in-out 0s;
  }
  .selectionAbility{
    animation: endSelection 1s ease-in-out 0s;
    cursor: pointer;
  }
  .selectionAbility.selectedAbility{
    opacity: 1;
    filter: none;
    animation: startSelection 0.5s linear 0s;
  }
  .selectionAbility, .slash{
    opacity: 0.6;
    text-shadow: 0px 3px 10px rgb(255 255 255 / 80%);
    filter: blur(1px);
  }
  :global(.contentLeft){
    float: right;
  }
  :global(.resCol){
    max-height: 40%;
    height: 15vh;
    position: relative;
  }
@media screen and (max-width: 1056px) {
  .abilitySelection{
    width: 100%;
  }
  .abilitySelection div, .swiperInnerText{
    text-align: center;
  }
  :global(.abilityCol){
    height: 20%;
  }
  :global(.abilitySelectionCol){
    height: 35%;
  }
  :global(.resCol){
    overflow-y: scroll;
    width: 100%;
    padding: 0;
    height: 40%;
    max-height: initial;
    text-align: center;
  }
  .responsibility{
    text-align: center;
    padding: 25px 0;
  }
  .ability{
    font-size: 80px;
  }
  :global(.contentLeft){
    float: initial;
  }
}

@keyframes startSelection {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes endSelection {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0.6;
  }
}
@keyframes startRes {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>