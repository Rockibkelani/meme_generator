<template>
  <div class="editor">
    <h1 class="title">
      <FontAwesomeIcon icon="image" class="icon" />
      Générateur de Mème
    </h1>

    <div class="editor-body">
      <div class="form-side">
        <label class="file-upload-label">
          <input type="file" accept="image/*" @change="handleImageUpload" hidden />
          <span class="file-upload-btn">
            <FontAwesomeIcon icon="image" class="icon" />
            Choisir une image
          </span>
        </label>

        <div v-if="imageUrl">
          <div class="inputs">
            <input class="text-input" v-model="topText" placeholder="Texte en haut" />
            <input class="text-input" v-model="bottomText" placeholder="Texte en bas" />
          </div>

          <div class="options">
            <label>Couleur :
              <input type="color" v-model="textColor" />
            </label>
            <label>Taille :
              <input type="range" min="16" max="60" v-model="fontSize" />
            </label>
            <label>Police :
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
            <button @click="downloadMeme" class="btn primary">
              <FontAwesomeIcon icon="download" class="icon" />
              Télécharger
            </button>
            <button @click="shareMeme" class="btn">
              <FontAwesomeIcon icon="share-alt" class="icon" />
              Partager
            </button>
            <button @click="reset" class="btn secondary">
              <FontAwesomeIcon icon="redo" class="icon" />
              Réinitialiser
            </button>
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
    imageFileName.value = file.name.replace(/\.[^/.]+$/, "")
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
  link.download = `${imageFileName.value || 'meme'}-meme.png`
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
    const file = new File([blob], `${imageFileName.value || 'meme'}-meme.png`, { type: blob.type })
    try {
      await navigator.share({ title: 'Mème', files: [file] })
    } catch (err) {
      console.error('Erreur de partage :', err)
    }
  })
}
</script>

<style scoped>
.editor {
  max-width: 1280px;
  margin: auto;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 1rem;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.04);
  font-family: 'Inter', sans-serif;
}

.title {
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: 2rem;
  color: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}

.icon {
  margin-right: 0.4rem;
}

.editor-body {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

.form-side,
.image-side {
  flex: 1;
  min-width: 320px;
  max-width: 600px;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 2rem;
}

.file-upload-label {
  display: block;
  text-align: center;
  background-color: #e0f2fe;
  border: 2px dashed #38bdf8;
  color: #0369a1;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.3s;
}

.file-upload-label:hover {
  background-color: #bae6fd;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-input {
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f8fafc;
  transition: all 0.3s ease;
}

.text-input:focus {
  border-color: #2563eb;
  background-color: #fff;
  outline: none;
}

.options {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.options label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  flex: 1;
  min-width: 120px;
}

.buttons {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.primary {
  background-color: #2563eb;
  color: white;
}

.btn.primary:hover {
  background-color: #1e40af;
}

.btn.secondary {
  background-color: #e2e8f0;
  color: #1e293b;
}

.btn.secondary:hover {
  background-color: #cbd5e1;
}

.meme-container {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}

.meme {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #cbd5e1;
  background: #000;
  max-width: 100%;
}

.meme img {
  width: 100%;
  height: auto;
  display: block;
}

.text {
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 900;
  text-align: center;
  pointer-events: none;
  user-select: none;
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

@media screen and (max-width: 900px) {
  .editor-body {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .form-side,
  .image-side {
    max-width: 100%;
    padding: 1.2rem;
  }
  .meme-container {
    margin-top: 0.5rem;
  }
  .buttons {
    flex-direction: column;
    gap: 0.7rem;
    margin-top: 1.2rem;
  }
  .title {
    font-size: 1.4rem;
    flex-direction: column;
    gap: 0.2rem;
  }
}

@media screen and (max-width: 600px) {
  .editor {
    padding: 1rem;
  }
  .title {
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }
  .form-side,
  .image-side {
    padding: 0.7rem;
  }
}

</style>
