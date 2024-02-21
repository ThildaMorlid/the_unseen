<!-- INFORMATION OM DEN HÄR KODDELEN
Interaktiv "Ficklampa" ned dold textkomponent

-->

<template>
  <!-- Mörk bakgrund för hela komkonenten -->
  <div class="dark-background">
    <!-- Bakgrundselemtent som innhåller spacebakgrund -->
    <div id="space-background" ref="spaceBackground"></div>
    <!-- "Ficklampa" som följer muspekaren för att avslöja text -->
    <div class="flashlight" ref="flashlight"></div>
    <!-- Text som är vit som syns när muspekaren dras över texten -->
    <div class="hidden-text">UNSEEN</div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import backgroundImg from '@/assets/img/inverted-sky-background.jpg';

export default {
  setup() {
    const spaceBackground = ref(null);
    const flashlight = ref(null);

    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const bgPosX = ((mouseX / width) * 100) - 50;
      const bgPosY = ((mouseY / height) * 100) - 50;

      if (spaceBackground.value) {
        spaceBackground.value.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
      }

      if (flashlight.value) {
        flashlight.value.style.left = `${e.pageX - (flashlight.value.offsetWidth / 2)}px`;
        flashlight.value.style.top = `${e.pageY - (flashlight.value.offsetHeight / 2)}px`;
      }
    };

    onMounted(() => {
      document.addEventListener('mousemove', handleMouseMove);

      // Skapar en djupare "åka inåt"-effekt genom att animera skalningen av bakgrundselementet
      gsap.to(spaceBackground.value, {
        duration: 20, // Längden på animationen
        scale: 2.0, // Ökar skalan lite för att skapa en känsla av djup

        ease: "linear", // Använder en linjär easing för en jämn animation
        repeat: -1, // Upprepar animationen i oändlighet
        yoyo: true // Går tillbaka till ursprungsskalan för att skapa en loop-effekt
      });

      // Animerar in texten med en fördröjning
      gsap.from('.hidden-text', { duration: 1, delay: 0.5, y: 20, opacity: 0, ease: 'power2.out' });
      gsap.to(flashlight.value, { duration: 2, opacity: 0.5, repeat: -1, yoyo: true });


    });

    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', handleMouseMove);
    });

    return { spaceBackground, flashlight, backgroundImage: backgroundImg };
  }
};
</script>

<style scoped>
/* CSS för bakgrundselement som visar stjärnhimlen */
#space-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/inverted-sky-background.jpg');
  background-size: cover;
  background-position: center;
  transform-origin: center center;
  transform: scale();

  /* Initial skala satt till 1 */
}


/* Grundläggade stil för den inverterade, mörka bakgrunden */
.dark-background {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}

/* Pseudo-element för att justera opacitet & kontrast för bakgrundsbidlen */
.dark-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/inverted-sky-background.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  /* Justera denna värde för att kontrollera opaciteten för bakgrundsbilden */
  pointer-events: none;
  /* Säkerställer att pseudo-elementet inte hindrar musinteraktion */
  z-index: -1;
  /* Se till att bakgrundsbilden ligger under annat innehåll */
  filter: contrast(50%)
}

/* CSS för ficklampan som visar den dolda texten */
.flashlight {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 80%;
  background-color: rgba(255, 255, 255, 0.95);
  pointer-events: none;
  /* Gör så att muspekaren inte interagerar med div-en */
  mix-blend-mode: difference;
  /* Nyckeln till effekten */
  filter: blur(100px);
}

/* Stilar för den dolda texten */
.hidden-text {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: 700;
}
</style>
