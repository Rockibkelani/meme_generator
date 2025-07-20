<template>
  <div id="app">
    <header class="navbar">
      <div class="brand">
        <FontAwesomeIcon icon="brain" class="logo" />
        <span class="brand-text">MemeGen</span>
      </div>

      <button class="burger" @click="showMenu = !showMenu">
        <FontAwesomeIcon icon="bars" />
      </button>

      <nav :class="['nav-links', { open: showMenu }]">
        <router-link to="/" exact-active-class="active" @click="closeMenu">
          <FontAwesomeIcon icon="pen-nib" /> Générateur
        </router-link>
        <router-link to="/gallery" exact-active-class="active" @click="closeMenu">
          <FontAwesomeIcon icon="images" /> Galerie
        </router-link>
      </nav>
    </header>

    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const showMenu = ref(false)
const closeMenu = () => {
  showMenu.value = false
}
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

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo {
  font-size: 1.5rem;
  color: #6366f1;
}

.brand-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #6366f1;
}

.burger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #374151;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  color: #374151;
  transition: background-color 0.2s, color 0.2s;
}

.nav-links a:hover {
  background-color: #e5e7eb;
  color: #6366f1;
}

.nav-links .active {
  background-color: #6366f1;
  color: white;
}

.main-container {
  flex-grow: 1;
  padding: 2rem;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .navbar {
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .burger {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    padding: 0.75rem 1rem;
  }
}

</style>
