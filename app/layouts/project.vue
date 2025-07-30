<template>
  <div class="project-bg">
    <div class="flex navbar" style="justify-content: center;">
      <Header />
    </div>
    <div class="flex projectSlot" style="justify-content: center;">
      <slot />
    </div>
    <div class="flex" style="justify-content: center;">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.project-bg {
  min-height: 100vh;/*
  background: #121212;*/
  width: 100%;
  max-width: 100vw; /* Prevent overflow */
  overflow-x: hidden; /* Prevent horizontal scroll */
  box-sizing: border-box;
}

.projectSlot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100vw; /* Prevent overflow */
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 0; /* Remove any default padding */
}
  
  .navbar {
    position: absolute;
    z-index: 10000;
  }

  nav {
    opacity: 0;
    visibility: hidden;
    width: 100%;
    z-index: 0;
    background: black;
    transition-duration: 0.5s;
    backface-visibility: visible;
  }

  nav ul {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    padding-top: 5%;
    text-align: center;
    list-style: none;
  }

  nav ul li a {
    display: block;
    padding: 10px 0;
    transition-duration: 0.6s;
    font-size: 2rem;
    color: white;
    text-decoration: none;
  }

  nav ul li a:hover {
    cursor: pointer;
    color: gold;
  }

  .open {
    visibility: visible;
    opacity: 1;
  }

/* Mobile-specific fixes */
@media (max-width: 768px) {
  .project-bg {
    padding: 0;
    margin: 0;
  }
  
  .projectSlot {
    padding: 0;
    margin: 0;
    width: 100%;
  }
}
</style>
