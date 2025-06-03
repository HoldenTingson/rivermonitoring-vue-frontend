<template>
  <div class="gallery">
    <div class="gallery-header">
      <div class="text">
        <h2>Galeri</h2>
        <h3>
          Lihat foto seputar aktivitas penanggulangan banjir di Kota Pekanbaru
        </h3>
      </div>
    </div>
    <div class="gallery-page">
      <div class="gallery-panel" v-for="photo in gallery" :key="photo.id">
        <img :src="thumbUrl(photo.image)" class="gallery-photo" />
        <div class="gallery-overlay">
          <div class="overlay-content">
            <h5>{{ photo.date }}</h5>
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Gallery",
  setup() {
    const gallery = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/gallery"
        );
        const data = await response.json();
        gallery.value = data;
      } catch (error) {
        console.error(error);
      }
    });

    // Move thumbUrl here inside setup
    const thumbUrl = (filename) => {
      return new URL(`../assets/gallery/${filename}`, import.meta.url).href;
    };

    return {
      gallery,
      thumbUrl,
    };
  },
};
</script>

<style scoped>
.gallery-header {
  background-color: #24262b;
  padding: 60px;
  margin-bottom: 30px;
  color: white;
}

.text {
  margin-left: 15%;
}

.gallery-header h2 {
  margin: 0;
  font-size: 50px; /* Adjust the value as needed */
  font-weight: 700;
  margin-bottom: 15px;
}

.gallery-header h3 {
  margin: 0;
  font-size: 16px; /* Adjust the value as needed */
  font-weight: 300;
}

.gallery-page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 1.5rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 9.2rem;
}

.gallery-panel img {
  width: 100%;
  height: 20vw;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.gallery-panel {
  position: relative;
}

.gallery-photo {
  width: 100%;
  height: 20vw;
  object-fit: cover;
  border-radius: 0.75rem;
  transition: filter 0.3s;
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 1rem;
}

.overlay-content h5 {
  margin-top: 1rem;
}

.gallery-panel:hover .gallery-overlay {
  opacity: 1;
}
</style>
