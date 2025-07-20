<template>
  <div class="gallery-wrapper">
    <h2 class="title">
      <FontAwesomeIcon icon="images" class="icon" />
      Galerie de Mèmes
    </h2>

    <div v-if="memes.length === 0" class="empty">
      Aucun mème pour l’instant.
    </div>

    <div class="actions" v-if="memes.length">
      <button class="btn danger" @click="clearGallery">
        <FontAwesomeIcon icon="trash-alt" />
        Vider la galerie
      </button>
    </div>

    <div class="gallery">
      <div v-for="(meme, index) in memes" :key="index" class="meme-card">
        <img :src="meme" @click="openPreview(meme)" />
        <button class="delete-btn" @click="removeMeme(index)">
          <FontAwesomeIcon icon="times-circle" />
        </button>

      </div>
    </div>

    <div v-if="previewImage" class="lightbox" @click="previewImage = null">
      <img :src="previewImage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
  max-width: 1200px;
  margin: auto;
  padding: 3rem;
  font-family: 'Inter', sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.icon {
  color: #2563eb;
}

.empty {
  font-style: italic;
  color: #64748b;
  text-align: center;
  margin-top: 1rem;
}

.actions {
  text-align: center;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8fafc;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #e2e8f0;
}

.btn.danger {
  background-color: #ef4444;
  color: white;
}

.btn.danger:hover {
  background-color: #dc2626;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.meme-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}

.meme-card:hover {
  transform: scale(1.03);
}

.meme-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  background: rgba(255,255,255,0.0);
  border: none;
  color: #ef4444;
  font-size: 22px;
  cursor: pointer;
  border-radius: 50%;
  padding: 4px 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s;
  top: 2px;
  right: 2px;
}

.delete-btn:hover {
  transform: scale(1.2);
  color: #dc2626;
  background: rgba(255,255,255,0.0);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
  border: 6px solid white;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

@media screen and (max-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .meme-card img {
    height: 200px;
  }
}

@media screen and (max-width: 768px) {
  .gallery-wrapper {
    padding: 2rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.65rem 1rem;
  }

  .meme-card img {
    height: 180px;
  }
}

@media screen and (max-width: 480px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .meme-card img {
    height: 160px;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .actions {
    margin-bottom: 1rem;
  }
}

</style>
