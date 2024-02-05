<template>
    <header>
        <div class="navbar" id="navbar">
            <nav class="container mx-auto p-4 flex justify-between" style="max-width: 100%; display: flex; align-items: center; justify-content: space-between; margin: 0 3em 0 3em;">
                <NuxtLink to="/" class="font-bold flex align-middle">
                <!-- <img src="/src/sy-rsw.png" width="50px"/> -->
                </NuxtLink>
                <ul class="flex gap-4 navMenu_">
                    <!-- <div class="burgerMenu">
                        <font-awesome-icon :icon="['fas', 'bars']" />
                        <div class="burgerMenuIcon"></div>
                    </div> -->
                    <!-- <div class="navMenu">
                        <li><NuxtLink to="/">Home</NuxtLink></li>
                        <li><NuxtLink to="/about">About</NuxtLink></li>
                        <li><NuxtLink to="/posts">Posts</NuxtLink></li>
                    </div> -->
                    <!-- <li><NuxtLink to="/contact" class="callToActionNavBtn">Get in touch</NuxtLink></li> -->
                </ul>
                <a class="navTitle" href="/"><p>ANGELCAPRA</p><p class="colored-tech">.TECH</p></a>
            </nav>
        </div>
    </header>
</template>


<!--<script>
    export default {
        mounted () {
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    document.getElementById('navbar').style.top = "0px";
                } else {
                    document.getElementById('navbar').style.top = "-140px";
                }
                prevScrollpos = currentScrollPos;
            };

            $('.burgermenu').click(function(){
                $('.fullMenu').toggleClass('open');
            });
            $('.fullMenu ul li').click(function(){
                $('.fullMenu').toggleClass('open');
            })
        }
    }
</script>-->

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 80px;
        width: 100%;
        transition: top 0.5s;
        background-color: rgba(114, 114, 114, 0);
        /* backdrop-filter: blur(5px); */
        z-index: 50;
        /* pointer-events: none !important; */
    }
    .navMenu_ {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .burgerMenu {
        z-index:999;  
        cursor:pointer;
    }
    .navTitle {
        display: flex;
        flex-direction: row;
        position: fixed;
        text-align: center;
        letter-spacing: 3px;
        font-size: 1em;
        font-family: var(--font22);
        height: 40px;
        width: 200px;
        top: 30px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 30;
    }
    .router-link-exact-active {
      color: rgb(46, 93, 175);
      color: var(--accent);
      text-decoration: underline;
    }
    .callToActionNavBtn {
        display: flex;
        color: black;
        background-color: var(--accent);
        padding: 8px;
        border-radius: 25px;
        border-style: dashed;
        position: absolute;
        top: 2em;
        right: 3em;
        /* justify-self: start; */
    }
    .colored-tech {
        color: hotpink;
    }
</style>