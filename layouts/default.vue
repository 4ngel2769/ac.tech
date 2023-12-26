<template>
    <div class="flex flex-col align-center" id="frontGround">
        <div class="flex navbar" style="justify-content: center;">
            <Header />
        </div>
        <div class="flex theSlot" style="justify-content: center;">
            <slot />
        </div>
        <div class="flex" style="justify-content: center;">
            <Footer />
        </div>
    </div>
</template>

<style scoped>
  .router-link-exact-active {
    color: rgb(34, 240, 195);
  }
  .navbar {
    position: absolute;
  }
  .theSlot {
    padding: 50px 0 50px 0;
    height: 100vh;
  }
</style>