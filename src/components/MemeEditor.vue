<template>
  <div class="editor">
    <h1 class="title">🎨 Générateur de Mème</h1>

    <div class="editor-body">
      <div class="form-side">
        <label class="file-upload-label">
          <input type="file" accept="image/*" @change="handleImageUpload" hidden />
          <span class="file-upload-btn">📁 Télécharger une image</span>
          <span class="file-name">{{ imageFileName || "Aucune image sélectionnée" }}</span>
        </label>

        <div v-if="imageUrl">
          <div class="inputs">
            <input class="text-input" v-model="topText" placeholder="Texte en haut" />
            <input class="text-input" v-model="bottomText" placeholder="Texte en bas" />

            <div class="options">
              <label>🎨 Couleur :
                <input type="color" v-model="textColor" />
              </label>

              <label>🔠 Taille :
                <input type="range" min="16" max="60" v-model="fontSize" />
              </label>

              <label>✍️ Police :
                <select v-model="fontFamily">
                  <option>Arial</option>
                  <option>Comic Sans MS</option>
                  <option>Impact</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                </select>
              </label>
            </div>

            <div class="buttons">
              <button @click="downloadMeme" class="btn primary">💾 Télécharger</button>
              <button @click="shareMeme" class="btn">📤 Partager</button>
              <button @click="reset" class="btn secondary">♻️ Réinitialiser</button>
            </div>
          </div>
        </div>
      </div>

      <div class="image-side" v-if="imageUrl">
        <div class="meme-container">
          <div class="meme" ref="memeRef">
            <img :src="imageUrl" alt="Meme" />
            <div class="text top" :style="textStyles" contenteditable spellcheck="false">{{ topText }}</div>
            <div class="text bottom" :style="textStyles" contenteditable spellcheck="false">{{ bottomText }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import html2canvas from 'html2canvas'

const imageUrl = ref(null)
const topText = ref('')
const bottomText = ref('')
const textColor = ref('#ffffff')
const fontSize = ref(32)
const fontFamily = ref('Impact')
const imageFileName = ref('')
const memeRef = ref(null)

const textStyles = computed(() => ({
  color: textColor.value,
  fontSize: fontSize.value + 'px',
  fontFamily: fontFamily.value,
  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
}))

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
    imageFileName.value = file.name
  }
}

const reset = () => {
  imageUrl.value = null
  topText.value = ''
  bottomText.value = ''
  imageFileName.value = ''
}

const downloadMeme = async () => {
  if (!memeRef.value) return
  const canvas = await html2canvas(memeRef.value)
  const dataUrl = canvas.toDataURL()
  const link = document.createElement('a')
  link.download = 'meme.png'
  link.href = dataUrl
  link.click()
  const existing = JSON.parse(localStorage.getItem('memes') || '[]')
  existing.push(dataUrl)
  localStorage.setItem('memes', JSON.stringify(existing))
}

const shareMeme = async () => {
  if (!navigator.share || !memeRef.value) {
    alert("Le partage n’est pas supporté sur cet appareil.")
    return
  }
  const canvas = await html2canvas(memeRef.value)
  canvas.toBlob(async (blob) => {
    const file = new File([blob], 'meme.png', { type: blob.type })
    try {
      await navigator.share({
        title: 'Mème',
        files: [file],
      })
    } catch (err) {
      console.error('Erreur de partage :', err)
    }
  })
}
</script>

<style scoped>
.editor {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1f2937;
  text-align: center;
}

.editor-body {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
}

.form-side {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

.image-side {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
  padding: 1rem;
}

.file-upload-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.file-upload-btn {
  background-color: #facc15;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #1f2937;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.file-upload-btn:hover {
  background-color: #eab308;
}

.file-name {
  color: #6b7280;
  font-style: italic;
  font-size: 0.95rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}

.options label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  font-weight: 500;
}

.meme-container {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.meme {
  position: relative;
  max-width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #000;
  overflow: hidden;
}

.meme img {
  display: block;
  max-width: 100%;
  height: auto;
}

.text {
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  user-select: none;
  word-break: break-word;
}

.text[contenteditable] {
  pointer-events: auto;
  user-select: text;
}

.top {
  top: 10px;
}

.bottom {
  bottom: 10px;
}

.buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn.primary {
  background-color: #3b82f6;
  color: white;
}

.btn.primary:hover {
  background-color: #2563eb;
}

.btn.secondary {
  background-color: #6b7280;
  color: white;
}

.btn.secondary:hover {
  background-color: #4b5563;
}

@media screen and (max-width: 768px) {
  .editor-body {
    flex-direction: column;
    align-items: center;
  }

  .form-side,
  .image-side {
    max-width: 100%;
    width: 100%;
  }

  .image-side {
    margin-top: 1.5rem;
    padding: 0.5rem;
  }

  .buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .options {
    flex-direction: column;
    gap: 0.5rem;
  }

  .options label {
    width: 100%;
  }

  .text-input {
    font-size: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
