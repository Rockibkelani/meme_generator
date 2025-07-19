<template>
  <div id="app">
    <header class="navbar">
      <div class="brand">
        <span class="icon">🧠</span> MemeGen
      </div>
      <nav class="nav-links">
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
// aucune logique ici pour l’instant
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

.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
</style>
