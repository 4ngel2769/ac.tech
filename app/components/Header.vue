<template>
    <header>
        <div class="navbar" id="navbar">
            <nav class="navTitle navbar-in container mx-auto p-4 flex" id="navTitle" style="max-width: 100%; display: flex; align-items: center; justify-content: space-between; margin: 0 3em 0 3em;">
                <!-- <NuxtLink to="/" class="font-bold flex align-middle"> -->
                <!-- <img src="/src/sy-rsw.png" width="50px"/> -->
                <!-- </NuxtLink> -->
                <!-- <ul class="flex gap-4 navMenu_"> -->
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
                <!-- </ul> -->
                <div class="navbar-center container mx-auto">
                    <a class="navTitle glassy-pill" id="navTitle" href="/">
                        <p>ANGELCAPRA</p><p class="colored-tech">.TECH</p>
                    </a>
                </div>
                
                <!-- Theme Toggle Button -->
                <!-- <div class="theme-toggle-container">
                    <button 
                        @click="toggleTheme" 
                        class="theme-toggle-btn"
                        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                        aria-label="Toggle theme"
                    >
                        <font-awesome-icon 
                            :icon="['fas', isDark ? 'sun' : 'moon']" 
                            class="theme-icon"
                        />
                    </button>
                </div> -->
                <!-- Works but not fully | have to set colors properly -->
            </nav>
        </div>
    </header>
</template>

<script setup>
const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 100%;
    transition: top 0.5s;
    background-color: rgba(114, 114, 114, 0);
    /* backdrop-filter: blur(5px); */
    z-index: 50;
    /* pointer-events: none !important; */
}
.navbar-center {
    position: absolute;
    left: 50%;
    top: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    width: 100vw;
    pointer-events: none;
    z-index: 51;
}
.glassy-pill {
    background: rgba(30, 30, 30, 0.35);
    box-shadow: 0 4px 32px 0 rgba(0,0,0,0.12);
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    border-radius: 999px;
    border: 0px solid rgba(255,255,255,0.18);
    padding: 0.7em 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
}
.navbar-in {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
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
    position: static; /* changed from fixed */
    text-align: center;
    letter-spacing: 3px;
    font-size: 1em;
    font-family: var(--font22);
    height: 40px;
    width: 200px;
    /* top, left, transform, transition, z-index removed for static positioning */
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

/* Theme Toggle Styles */
.theme-toggle-container {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 52;
    pointer-events: auto;
}

.theme-toggle-btn {
    background: rgba(30, 30, 30, 0.35);
    box-shadow: 0 4px 32px 0 rgba(0,0,0,0.12);
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.18);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    pointer-events: auto;
}

.theme-toggle-btn:hover {
    background: rgba(50, 50, 50, 0.45);
    border-color: rgba(255,255,255,0.25);
    transform: scale(1.05);
}

.theme-icon {
    color: #fbbf24;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.theme-toggle-btn:hover .theme-icon {
    color: #f59e0b;
    transform: rotate(15deg);
}

/* Mobile responsive */
@media (max-width: 768px) {
    .theme-toggle-container {
        right: 1rem;
    }
    
    .theme-toggle-btn {
        width: 2rem;
        height: 2rem;
    }
    
    .theme-icon {
        font-size: 0.875rem;
    }
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
                    document.getElementById('navbar').style.top = "0px";
                    if (isRoot && document.getElementById('assets-credits')) {
                        document.getElementById('assets-credits').style.left = '20px';
                    }
                } else {
                    document.getElementById('navbar').style.top = "-80px";
                    if (isRoot && document.getElementById('assets-credits')) {
                        document.getElementById('assets-credits').style.left = '-450px';
                    }
                }
                prevScrollpos = currentScrollPos;
            };
        }
    }
</script>