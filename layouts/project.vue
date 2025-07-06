<template>
  <div class="project-bg">
    <div class="flex navbar" style="justify-content: center;">
      <Header />
    </div>
    <div class="flex projectSlot" style="justify-content: center;">
      <slot />
      <div class="footerimg"></div>
    </div>
    <div class="flex" style="justify-content: center;">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.project-bg {
  min-height: 100vh;
  background: #0c0c0c; /* <-- Your custom color or image here */
}
.projectSlot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* Optionally add a custom background image here */
  /* background-image: url('/your-custom-bg.svg'); */
  /* background-size: cover; */
  /* background-position: center; */
}
.footerimg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 100vmax;
  margin: 0 auto;
  background-image: url('/wave-haikei4.svg');
  background-position: bottom !important;
  background-repeat: repeat-x !important;
  background-clip: inherit;
}
</style>
