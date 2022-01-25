<script>
import { fade, fly } from 'svelte/transition'
import ShootingStar from '../components/shootingStar.svelte';
import Ability from '../components/Ability.svelte';
import Contact from '../components/Contact.svelte';
import { onMount } from 'svelte';
import { globalConfig, globalConfig_reset, globalConfig_set } from '../store/store';
// let currentTab = -1;
let currentTab = -1;

const d = new Date();
let year = d.getFullYear();

onMount(()=>{})

function changeTab(index) {
  currentTab = index;
  globalConfig_reset()
}
</script>
<link rel="stylesheet" href="./global.css" />
<nav>
  <span class="header-item" class:textShadowAnim={currentTab === 0} on:click={() => changeTab(0)}>Home</span>
  <span class="header-item" class:textShadowAnim={currentTab === 1} on:click={() => changeTab(1)}>Introduction</span>
  <!-- <span class="header-item" on:click={() => currentTab = 2}>Experience & Education</span> -->
  <span class="header-item" class:textShadowAnim={currentTab === 3} on:click={() => changeTab(3)}>Ability</span>
  <span class="header-item" class:textShadowAnim={currentTab === 4} on:click={() => changeTab(4)}>Contact</span>
</nav>
<div id="content">
  <div id="shootingStarSection">
    <ShootingStar duration="3s" rightPosition="0" topPosition="0%"/>
    <ShootingStar duration="4.5s" rightPosition="80%" topPosition="0%"/>
    <ShootingStar duration="2.5s" rightPosition="60%" topPosition="0%"/>
    <ShootingStar duration="5s" rightPosition="50%" topPosition="0%"/>
    <ShootingStar duration="2.8s" rightPosition="30%" topPosition="0%"/>
    <ShootingStar duration="3.6s" rightPosition="40%" topPosition="0%"/>
  </div>
  {#if currentTab === -1}
    <div id="initialOverlay" on:click={() => currentTab = 0}>
      <div in:fade={{ duration: 2000 }} id="initialOverlayText" class="contentText gameFont">
        A meteor has crashed to the surface!<br>
        There is a glowing book-like stuff laying in the middle of rubble?<br>
        I can feel the power from the "book"...what is it actually?<br>
        Would it be some secret messages from the aliens?!<br>
        Or confidential data from the area 51?!<br>
        I should check it out!<br><br>

        For those unreadable sentences,<br>
        Touching it then my translator will make those more readable!
      </div>
    </div>
  {/if}
  {#if currentTab === 0}
    <div in:fade={{ duration: 1000 }} out:fade={{ duration: 500 }} id="home" class="tabContent">
      <div id="homeText" class="contentText textShadowAnim">
          <h1>Ying</h1>
          <h3>A Passionate Programmer</h3>
          <!-- <p>HTML, CSS, JavaScript, PHP, Vue.js, MySQL, MongoDB, basic: Java, Unity(C#)</p> -->
          <!-- <p>Over 2 years working experience as web developer</p> -->
          <p>Start from Web, Go on Everything</p>
          <p>Eager to Learn, Curious to Anything</p>
        </div>
      </div>
  {/if}
  {#if currentTab === 1}
    <div in:fade={{ duration: 1000 }} out:fade={{ duration: 500 }} id="introduction" class="tabContent">
      <div id="introductionText" on:click={() => globalConfig_set({isGameFont : !$globalConfig.isGameFont})} class="contentText" class:gameFont={$globalConfig.isGameFont}>
        <p>HI, This is Ying.<br>
          Programming is my hobby and my way to make a living.<br>
          I have over 3 years working experience as a programmer,<br>
          My responsibilities contains e-commerce system development,<br>
          Including analysis, design, development, QA and maintanence processes on frontend/backend/database.

        </p>
        <br>
        <p>
          I have experiences with PHP, Node.js, Java,<br>
          but I am open to any language or area!
        </p>
        <br>
        <p>I love to make thing simple,<br>
          I have a tendency on designing something reusable in programming way,<br>
          Like implementing a common module or component.<br>
          Also, thinking comprehensive is one of my features,<br>
          I tend to think how the function be developed, used, maintained in the future,<br>
          There will be an initial system floating in my mind, waiting for sculpture.
        </p>
        <br>
        <!-- <p>I am waiting for an IT company<br>
          that it has an open-minded atmosphere, remote working option,<br>
          Allowing me to learn and devote, not limited to web/mobile/game/software.<br>
          I always put 100% effort to what I am working at,<br>
          Please feel free to contact me if you are interested.
        </p> -->
        <p>
          I always put 100% effort to what I am working at,<br>
          Please feel free to contact me if you are interested.
        </p>
        <br>
        <p>By the way,<br>
          Because I live in	Gliese 486b, Work from home will be a better option for me.<br>
          It is too hot to get outside.
        </p>
      </div>
    </div>
  {/if}
  {#if currentTab === 3}
  <div in:fade={{ duration: 1000 }} out:fade={{ duration: 500 }} class="tabContent">
    <Ability />
  </div>
  {/if}
  {#if currentTab === 4}
    <div in:fade={{ duration: 1000 }} out:fade={{ duration: 500 }} class="tabContent">
        <Contact />
    </div>
  {/if}
</div>
<footer>
  Copyright © {year} Ying
  <!-- <a href="#" class="footer-item"><i class="fab fa-instagram"></i></a>
  <a href="#" class="footer-item"><i class="fab fa-facebook"></i></a>
  <a href="#" class="footer-item"><i class="fab fa-twitter"></i></a> -->
</footer>
<style>
  /* @import './global.css'; */
</style>