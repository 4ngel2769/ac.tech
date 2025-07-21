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
                <a class="navTitle" id="navTitle" href="/"><p>ANGELCAPRA</p><p class="colored-tech">.TECH</p></a>
            </nav>
        </div>
    </header>
</template>

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
        transition: top 0.5s;
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
        /* a */
    }
    .colored-tech {
        color: hotpink;
    }
</style>

<script>
    export default {
        mounted () {
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                // Only interact with assets-credits on the root page
                const isRoot = window.location.pathname === '/';
                if (prevScrollpos > currentScrollPos) {
                    document.getElementById('navTitle').style.top = "30px";
                    if (isRoot && document.getElementById('assets-credits')) {
                        document.getElementById('assets-credits').style.left = '20px';
                    }
                } else {
                    document.getElementById('navTitle').style.top = "-80px";
                    if (isRoot && document.getElementById('assets-credits')) {
                        document.getElementById('assets-credits').style.left = '-450px';
                    }
                }
                prevScrollpos = currentScrollPos;
            };
        }
    }
</script>