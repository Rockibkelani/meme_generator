<template>
  <div class="gallery-wrapper">
    <h2>🖼️ Galerie de Mèmes</h2>

    <div v-if="memes.length === 0" class="empty">Aucun mème pour l’instant.</div>

    <div class="actions" v-if="memes.length">
      <button @click="clearGallery">🗑️ Vider la galerie</button>
    </div>

    <div class="gallery">
      <div v-for="(meme, index) in memes" :key="index" class="meme-card">
        <img :src="meme" @click="openPreview(meme)" />
        <button class="delete-btn" @click="removeMeme(index)">✖</button>
      </div>
    </div>

    <div v-if="previewImage" class="lightbox" @click="previewImage = null">
      <img :src="previewImage" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const memes = ref([])
const previewImage = ref(null)

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('memes') || '[]')
  memes.value = saved
})

const removeMeme = (index) => {
  memes.value.splice(index, 1)
  localStorage.setItem('memes', JSON.stringify(memes.value))
}

const clearGallery = () => {
  if (confirm('Supprimer tous les mèmes ?')) {
    memes.value = []
    localStorage.removeItem('memes')
  }
}

const openPreview = (src) => {
  previewImage.value = src
}
</script>

<style scoped>
.gallery-wrapper {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

.empty {
  font-style: italic;
  color: #888;
}

.actions {
  margin-bottom: 1rem;
}

button {
  padding: 8px 16px;
  background-color: #d9534f;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.meme-card {
  position: relative;
  border: 1px solid #ddd;
  padding: 4px;
  border-radius: 5px;
  background: #fff;
  transition: transform 0.2s ease;
}

.meme-card:hover {
  transform: scale(1.03);
}

.meme-card img {
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
}

.delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: rgba(255, 0, 0, 0.8);
  border: none;
  color: white;
  padding: 4px 7px;
  font-size: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
  border: 5px solid white;
  border-radius: 10px;
}
</style>
