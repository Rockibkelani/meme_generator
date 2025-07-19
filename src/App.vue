<template>
  <div id="app">
    <header class="navbar">
      <div class="brand">
        <span class="icon">🧠</span> MemeGen
      </div>

      <!-- Bouton burger pour mobile -->
      <button class="burger" @click="showMenu = !showMenu">
        ☰
      </button>

      <!-- Navigation responsive -->
      <nav class="nav-links" :class="{ open: showMenu }">
        <router-link to="/" exact-active-class="active">🎨 Générateur</router-link>
        <router-link to="/gallery" exact-active-class="active">🖼️ Galerie</router-link>
      </nav>
    </header>

    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showMenu = ref(false)
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  background-color: #f9fafb;
  color: #111827;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;
}

.brand {
  font-size: 1.6rem;
  font-weight: 600;
  color: #6366f1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.4rem;
}

.burger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* Navigation links */
.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  background-color: #e5e7eb;
  color: #6366f1;
}

.nav-links .active {
  background-color: #6366f1;
  color: white;
}

/* Main container */
.main-container {
  flex-grow: 1;
  padding: 2rem;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Responsive */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    margin-top: 1rem;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 0.7rem 1rem;
  }

  .navbar {
    align-items: flex-start;
  }
}
</style>
