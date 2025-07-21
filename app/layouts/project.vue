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
  min-height: 100vh;
  background: #0c0c0c;
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
