<script>
	export let duration;
	export let topPosition;
	export let rightPosition;
</script>
<span style="--topPosition:{topPosition};--rightPosition:{rightPosition};--duration:{duration};" class="shootingStar" />
<style>
:root{
  --duration: 5s;
  --topPosition: 0%;
  --rightPosition: 50%;
}
.shootingStar{
  position: absolute;
  top: var(--topPosition);
  right: var(--rightPosition);
  background-color: white;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255,255,255,0.1),
  0 0 0 8px rgba(255,255,255,0.1),
  0 0 20px rgba(255,255,255,1);
  animation: comet var(--duration) linear infinite
}
.shootingStar::before{
  content: '';
  position: absolute;
  width: 300px;
  height: 1px;
  background: linear-gradient(90deg,#fff, transparent)
}
@keyframes comet{
  0%{
    transform: rotate(315deg) translateX(0);
    opacity: 1;
  }
  100%{
    transform: rotate(315deg) translateX(-1000px);
    opacity: 0;
  }
}
</style>