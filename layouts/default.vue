<template>
    <div class="flex flex-col align-center" id="frontGround">
      <div class="flex navbar" style="justify-content: center;">
        <Header />
      </div>
      <div class="flex theSlot" style="justify-content: center;">
        <slot />
        <div class="footerimg"></div>
      </div>
      <div class="flex" style="justify-content: center;">
        <Footer />
      </div>
    </div>
</template>

<script setup>
// Remove all the JavaScript that was trying to handle menu and cursor
</script>

<style scoped>
  .router-link-exact-active {
    color: rgb(34, 240, 195);
  }
  
  .navbar {
    position: absolute;
    z-index: 0;
  }

  .theSlot {
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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

  nav {
    opacity: 0;
    visibility: hidden;
    width: 100%;
    height: 100vh;
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
</style>