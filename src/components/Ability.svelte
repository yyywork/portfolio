<script>
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import SwiperCore, {Pagination, EffectCreative} from 'swiper';
  import { onMount } from 'svelte';
  import AbilityInner from '../components/AbilityInner.svelte';
  import { globalConfig_reset } from '../store/store';
  
  import "carbon-components-svelte/css/white.css";
  
  import 'swiper/css';
  import "swiper/css/pagination";

  SwiperCore.use([Pagination, EffectCreative]);

  const creativeEffect = {
    "prev": {
      "shadow": false,
      "translate": [
        0,
        0,
        -400
      ]
    },
    "next": {
      "translate": [
        "100%",
        0,
        0
      ]
    }
  };

  let innerWidth;
  let innerHeight;


  let fetchJson = [];

  async function GetAPI(){
    let tempJson = await fetch('json/Ability.json')
    fetchJson = await tempJson.json()
  }

  onMount(async ()=>{
    GetAPI();
  })

</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>
<Swiper observer="{true}" effect="{'creative'}" creativeEffect="{creativeEffect}" on:slideChange={() => globalConfig_reset()} pagination="{true}" class="swiper">
  {#await fetchJson}
  {:then fetchJson}
    {#each fetchJson as value  }
      <SwiperSlide>
        <AbilityInner bind:data="{value}" />
      </SwiperSlide>
    {/each}
  {/await}
</Swiper>
