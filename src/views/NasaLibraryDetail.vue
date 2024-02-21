<template>
  <div class="detail-container">
    <h2 id="detail-title">Detaljer för artikel med ID: {{ articleId }} ..den här värdelösa sidan finns för att visa Richard att UNSEEN har adressparameter och jag inte fick in det på ett bättre sätt hehe </h2>
    <button @click="goBack" class="button">Gå tillbaka</button>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { gsap } from 'gsap';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const articleId = ref(route.params.id);

    const goBack = () => {
      router.back();
    };

    onMounted(() => {
      gsap.to(".detail-container h2", { duration: 1, opacity: 1, y: -20, ease: "power3.out" });
    });

    return { articleId, goBack };
  }
};
</script>


<style scoped>
.detail-container {
  padding: 80px;
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.detail-container h2 {
  color: #1E0A0A;
  font-size: 24px;
  margin-bottom: 20px;
  opacity: 0;
}

</style>
