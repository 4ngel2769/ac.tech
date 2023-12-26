<template>
    <div class="flex flex-col align-center" id="frontGround">
        <div class="socialSidebar">
          <div class="subSocial">
            <div class="socialLink">
              <NuxtLink to="https://instagram.com/piestudios123"><font-awesome-icon :icon="['fab', 'instagram']" /></NuxtLink>
            </div>
            <div class="socialLink">
              <NuxtLink to="https://twitter.com/angeldev0"><font-awesome-icon :icon="['fab', 'x-twitter']" /></NuxtLink>
            </div>
            <div class="socialLink">
              <NuxtLink to="https://github.com/4ngel2769"><font-awesome-icon :icon="['fab', 'github']" /></NuxtLink>
            </div>
            <div class="socialLink">
              <NuxtLink to="https://youtube.com/@4ngel2769"><font-awesome-icon :icon="['fab', 'youtube']" /></NuxtLink>
            </div>
          </div>
        </div>
        <div class="menuDiv" id="menuDiv">
          <div class="bread"></div>
          <div class="bread"></div>
        </div>
        <nav>
          <ul>
            <li><a href="#!">Home</a></li>
            <li><a href="#!">About</a></li>
            <li><a href="#!">Services</a></li>
            <li><a href="#!">Blog</a></li>
            <li><a href="#!">Contact</a></li>
          </ul> 
        </nav>
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
    z-index: 30;
  }




  .menuDiv {
    position: absolute;
    left: 0;
    margin: 40px;
    border: 0;
    z-index: 999;
    cursor: pointer;
    outline: none;
  }
  .menuDiv .bread {
    width: 40px;
    height: 5px;
    background-color: gold;
    margin: 10px 0;
    transition: .2s;
  }  
  nav {
	 opacity: 0;
	 visibility: hidden;
	 width: 100%;
	 height: 100vh;
	 z-index: 999;
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





  .theSlot {
    padding: 50px 0 50px 0;
    height: 100vh;
  }
  .socialSidebar {
    position: fixed;
    z-index: 40;
    top: 50vh;
    transform: translate(0, -50%);
    right: 0;
    margin: 25px;
    font-size: 1.2em;
  }
  .socialSidebar a {
    transition: 0.2s ease-in-out;
  }
  .socialSidebar a:hover {
    color: var(--dark-alt1);
  }
  .subSocial {
    display: flex;
    flex-direction: column;
  }
  .socialLink {
    margin: 10px 0 10px 0;
  }
</style>

<script>
export default {
  mounted() {
    $(document).ready(function () {
      $('.btn-close').click(function () {
        $('.menu').toggleClass('active');
      });
    });
    $(document).ready(function () {
      $('.menu-btn').click(function () {
        $('.menu').toggleClass('active');
      });
    });
  }
}
</script>