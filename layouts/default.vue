<template>
    <div class="flex flex-col align-center" id="frontGround">
      <!-- <div class="main-menu" id="main-menu">

      </div> -->
      <!-- <div id="btn" class="btn"> -->
        <!-- <font-awesome-icon :icon="['fas', 'compass']" class="menuicon" /> -->
      <!-- </div> -->

      <!-- <nav id="menu" class="main-menu">
        <ul class="navig">
          <li class="nav__item">
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav> -->

      <div class="socialSidebar">
        <div class="subSocial">
          <div class="socialLink">
            <NuxtLink to="https://instagram.com/azdev0"><font-awesome-icon :icon="['fab', 'instagram']" /></NuxtLink>
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
    	<!-- <div class='cursor' id="cursor"></div>
      <div class='cursor2' id="cursor2"></div>
      <div class='cursor3' id="cursor3"></div> -->
</template>

<style scoped>
  .router-link-exact-active {
    color: rgb(34, 240, 195);
  }
  .navbar {
    position: absolute;
    z-index: 30;
  }

  /* Menu Button CSS */

  /* #Cursor
================================================== */

/* #Cursor
================================================== */

/* .cursor,
.cursor2,
.cursor3{
	position: fixed;
	border-radius: 50%;	
	transform: translateX(-50%) translateY(-50%);
	pointer-events: none;
	left: -100px;
	top: 50%;
	mix-blend-mode: difference;
	-webkit-transition: all 300ms linear;
	transition: all 300ms linear;
}
.cursor{
	background-color: #fff;
	height: 0;
	width: 0;
	z-index: 99999;
}
.cursor2,.cursor3{
	height: 36px;
	width: 36px;
	z-index:99998;
	-webkit-transition:all 0.3s ease-out;
	transition:all 0.3s ease-out
}
.cursor2.hover,
.cursor3.hover{
	-webkit-transform:scale(2) translateX(-25%) translateY(-25%);
	transform:scale(2) translateX(-25%) translateY(-25%);
	border:none
}
.cursor2{
	border: 2px solid #fff;
	box-shadow: 0 0 22px rgba(255, 255, 255, 0.6);
}
.cursor2.hover{
	background: rgba(255,255,255,1);
	box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
}

@media screen and (max-width: 1200px){
	.cursor,.cursor2,.cursor3{
		display: none
	}
} */




  /*
 * Menu styles and animation
 */
/* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,900'); */


/* .menuicon {
  font-size: 4.04em;
}

.main-menu {
  position: fixed;
  top: -50%;
  left: -50%;
  height: 200%;
  width: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  visibility: hidden;
  z-index: 2;
  transform: rotate(-15deg) translate3d(0, 0, 0);
}
.main-menu::before, .main-menu::after {
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  width: 100%;
  height: 80%;
  background-color: #0b0e12;
  transform-origin: center center;
  transition: all 500ms ease;
  will-change: transform;
  z-index: -1;
}
.main-menu::before {
  top: 51%;
  transform: translate(100%, -100%) translate3d(0, 0, 0);
}
.main-menu::after {
  top: 49%;
  transform: translate(-150%, 0%) translate3d(0, 0, 0);
  transition-delay: 100ms;
}
.main-menu .navig {
  position: relative;
  display: inline-block;
  padding: 0px;
  list-style: none;
  counter-reset: menu-counter;
  transform: rotate(15deg);
}
.main-menu .nav__item {
  margin-bottom: 10px;
  opacity: 0;
  transform: translateX(-15px) translate3d(0, 0, 0);
  transition: all 100ms ease 100ms;
  user-select: none;
}
.main-menu .nav__item a {
  color: white;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}
.main-menu .nav__item a::before {
  content: counter(menu-counter,decimal-leading-zero) "//";
  counter-increment: menu-counter;
}
.main-menu.open {
  visibility: visible;
}
.main-menu.open::before {
  animation: menu-in-left 500ms ease;
  transform: translate(-50%, -100%) translate3d(0, 0, 0);
  transition-duration: 0ms;
}
.main-menu.open::after {
  animation: menu-in-right 500ms ease 100ms;
  transform: translate(-50%, 0%) translate3d(0, 0, 0);
  transition-duration: 0ms;
}
.main-menu.open .nav__item {
  opacity: 1;
  transform: translateX(0px) translate3d(0, 0, 0);
  transition: all 250ms ease;
}
.main-menu.open .nav__item:nth-child(0n) {
  transition-delay: 250ms;
}
.main-menu.open .nav__item:nth-child(1n) {
  transition-delay: 300ms;
}
.main-menu.open .nav__item:nth-child(2n) {
  transition-delay: 350ms;
}
.main-menu.open .nav__item:nth-child(3n) {
  transition-delay: 400ms;
}
.main-menu.open .nav__item:nth-child(4n) {
  transition-delay: 450ms;
}
.main-menu.open .nav__item:nth-child(5n) {
  transition-delay: 500ms;
}
.main-menu.open .nav__item:nth-child(6n) {
  transition-delay: 550ms;
}
.main-menu.open .nav__item:nth-child(7n) {
  transition-delay: 600ms;
}
.main-menu.open .nav__item:nth-child(8n) {
  transition-delay: 650ms;
}
.main-menu.open .nav__item:nth-child(9n) {
  transition-delay: 700ms;
}
.main-menu.open .nav__item:nth-child(10n) {
  transition-delay: 750ms;
}
.main-menu.open .nav__item:nth-child(11n) {
  transition-delay: 800ms;
}
.main-menu.open .nav__item:nth-child(12n) {
  transition-delay: 850ms;
}
.main-menu.open .nav__item:nth-child(13n) {
  transition-delay: 900ms;
}
.main-menu.open .nav__item:nth-child(14n) {
  transition-delay: 950ms;
}
.main-menu.open .nav__item:nth-child(15n) {
  transition-delay: 1000ms;
}
.main-menu.open .nav__item:nth-child(16n) {
  transition-delay: 1050ms;
}
.main-menu.open .nav__item:nth-child(17n) {
  transition-delay: 1100ms;
}
.main-menu.open .nav__item:nth-child(18n) {
  transition-delay: 1150ms;
}
.main-menu.open .nav__item:nth-child(19n) {
  transition-delay: 1200ms;
}
.main-menu.open .nav__item:nth-child(20n) {
  transition-delay: 1250ms;
}
.main-menu.open .nav__item a {
  transition: all 250ms ease;
}
@keyframes menu-in-left {
  0% {
    transform: translate(-150%, -100%) translate3d(0, 0, 0);
  }
  100% {
    transform: translate(-50%, -100%) translate3d(0, 0, 0);
  }
}
@keyframes menu-in-right {
  0% {
    transform: translate(100%, 0%) translate3d(0, 0, 0);
  }
  100% {
    transform: translate(-50%, 0%) translate3d(0, 0, 0);
  }
} */
/*
 * Misc styles
 */
/* html, body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  background-color: #0e0c0e;
  font-family: "Source Sans Pro", sans-serif;
  overflow: hidden;
} */
.content {
  max-width: 400px;
}
.content h1 {
  font-size: 1.6em;
}
.content p {
  line-height: 1.5;
}
.btn {
  position: fixed;
  top: 3em;
  left: 45px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: white;
  color: #0e0c0e;
  text-align: center;
  font-size: 10px;
  font-weight: 900;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
  z-index: 3000;
}
/*
 * More from me link 🔥
 */
.more {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 7px 21px;
  border-radius: 8px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
  animation: reveal 5000ms cubic-bezier(0.87, -0.41, 0.19, 1.44);
}
.more::before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 20%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
  transition: max-width 0ms ease 250ms, background-color 250ms ease;
  transform: translate(-50%, -50%);
  z-index: -1;
}
.more:hover::before {
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 250ms ease;
}
@keyframes reveal {
  0%, 90% {
    bottom: -30px;
  }
  100% {
    bottom: 15px;
  }
}


  /* ######### */


  /* .menuDiv {
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
  }   */
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
  /* padding: 50px 0 50px 0; */
  height: 100vh;
  width: 100%;
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
    //Page cursors

    // document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
    //     t.style.left = n.clientX + "px", 
		// t.style.top = n.clientY + "px", 
		// e.style.left = n.clientX + "px", 
		// e.style.top = n.clientY + "px", 
		// i.style.left = n.clientX + "px", 
		// i.style.top = n.clientY + "px"
    // });
    // var t = document.getElementById("cursor"),
    //     e = document.getElementById("cursor2"),
    //     i = document.getElementById("cursor3");
    // function n(t) {
    //     e.classList.add("hover"), i.classList.add("hover")
    // }
    // function s(t) {
    //     e.classList.remove("hover"), i.classList.remove("hover")
    // }
    // s();
    // for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
    //     o(r[a])
    // }
    // function o(t) {
    //     t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    // }

    //Page menu

    var btn = document.getElementById('btn')
    var menu = document.getElementById('menu')

    //Toggle
    btn.addEventListener('click', function (e) {
      menu.classList.toggle('open')
    }, false)

    //Preview
    window.onload = function() {
      setTimeout(function(){
        menu.classList.add('open')
        
        setTimeout(function(){
          menu.classList.remove('open')
        }, 1200 )
      }, 600 )
    }


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