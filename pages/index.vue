<!--<script setup lang="js">
    const items = [{
        label: 'More info',
        icon: 'i-heroicons-link-16-solid',
        defaultOpen: false,
        slot: 'moreinfo'
    }]
</script>-->

<!--<script lang="js">
export default {
    mounted() {
        var w = $(window).width();
        $('.more-info-mobile').css('width', w);
    }
}
</script>
-->
<script setup lang="ts">
    const isOpen = ref(false)
    useSeoMeta({
        
    })
</script>

<template>
    <!-- <div class="menu">
        <UButton
        icon="i-heroicons-bars-3-20-solid"
        color="white"
        @click="isOpen = true"
        size="lg"
        class="transparent-icon"
        />

        <USlideover v-model="isOpen" side="top">
        <UCard
            class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
            side="top">
            
            <template #header>
            <UButton
                color="gray"
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark-20-solid"
                class="flex sm:hidden absolute end-5 top-5 z-10"
                square
                padded
                @click="isOpen = false"
            />

            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
            </template>

            <Placeholder class="h-full" />

            <template #footer>
                <p>Copyright 2024 © All rights reserved - Angel C</p>
            </template>
        </UCard>
        </USlideover>
    </div> -->

    <div class="tContainer">
        <div class="ProfilePicture">
            <NuxtImg format="webp" src="/android-chrome-192x192.png" quality="90" alt="Profile Picture" width="120px" />
        </div>
        <div class="Name">
            <h1 class="NameText">Angel Capra</h1>
        </div>
        <!-- <div class="more-info-mobile">
            <UAccordion :items="items">
                <template #item="{ item }">
                    <p class="italic text-gray-900 dark:text-white text-center">
                        {{ item.description }}
                    </p>
                </template>
                <template #moreinfo>
                    <div class="text-gray-900 dark:text-white text-center">
                        <div class="undertext">
                            <div class="Location">
                                <font-awesome-icon icon="fa-solid fa-location-dot" />
                                <p class="LocationText">Montreal, Quebec</p>
                            </div>
                            <div class="Website">
                                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                                <p class="WebsiteText"><a target="_blank" href="https://angellabs.xyz">https://angellabs.xyz</a></p>
                                <UTooltip text="Ancient website (no longer actively maintained).">
                                    <UBadge color="pink" variant="subtle">Old</UBadge>
                                </UTooltip>
                            </div>
                        </div>
                    </div>
                </template>
            </UAccordion>
        </div> -->
        <div class="undertext">
            <div class="Location">
                <font-awesome-icon icon="fa-solid fa-location-dot" />
                <p class="LocationText">Montreal, Quebec</p>
            </div>
            <div class="Website">
                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                <p class="WebsiteText"><a target="_blank" href="https://angellabs.xyz">https://angellabs.xyz</a></p>
                <UTooltip text="Under development as new website (Coming soon).">
                    <UBadge color="green" variant="outline">Development</UBadge>
                </UTooltip>
            </div>
            <div class="Website">
                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                <p class="WebsiteText"><a target="_blank" href="https://angelscoolstuff.pages.dev">https://angelscoolstuff</a></p>
                <UTooltip text="Old personal website.">
                    <UBadge color="pink" variant="outline">Old</UBadge>
                </UTooltip>
            </div>
        </div>
        <UDivider label="About Me" class="descriptiondivider" />
        <div class="descriptiondiv">
            <div class="Description">
                <h2 class="DescriptionText">I'm Angel, a cybersecurity student fascinated by hacking, IoT, embedded systems, and tech.</h2>
            </div>
            <div class="LinksTitle">
                <p class="linkstitle"></p>
            </div>
            <UDivider label="Socials" class="socialdivider" />
            <p class="linkstitle">follow me on</p>
            <div class="linkscontainer">
                <UTooltip text="YouTube | @angeldev0">
                    <NuxtLink class="link" to="https://youtube.com/@angeldev0" external target="_blank"><font-awesome-icon icon="fas fa-brands fa-youtube" /></NuxtLink>
                </UTooltip>
                <UTooltip text="GitHub | 4ngel2769">
                    <NuxtLink class="link" to="https://github.com/4ngel2769" external target="_blank"><font-awesome-icon icon="fa-brands fa-github" /></NuxtLink>                
                </UTooltip>
                <UTooltip text="Dev.to | @angeldev0">
                    <NuxtLink class="link" to="https://dev.to/angeldev0" external target="_blank"><font-awesome-icon icon="fa-brands fa-dev" /></NuxtLink>
                </UTooltip>
                <UTooltip text="Twitter | @angeldev0">
                    <NuxtLink class="link" to="https://twitter.com/angeldev0" external target="_blank"><font-awesome-icon icon="fa-brands fa-twitter" /></NuxtLink>
                </UTooltip>
                <UTooltip text="LinkedIn | @angelcapra">
                    <NuxtLink class="link" to="http://linkedin.com/in/angelcapra" external target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']" /></NuxtLink>
                </UTooltip>
                <!-- <UTooltip text="Instagram | @piestudios123"> -->
                    <!-- <NuxtLink class="link" to="https://instagram.com/piestudios123" external target="_blank"><font-awesome-icon icon="fa-brands fa-instagram" /></NuxtLink> -->
                <!-- </UTooltip> -->
                <UTooltip text="Email me | angeldevz0@proton.me">
                    <NuxtLink class="link" to="mailto:angeldevz0@proton.me" external><font-awesome-icon icon="fa-solid fa-at" /></NuxtLink>
                </UTooltip>
            </div>
        </div>
        
    </div>
    
    <div class="assets-credits" id="assets-credits">
        <p>Awesome backgrounds by Sébastien Noël's <a href="https://fffuel.co" target="_blank">fffuel.co</a> .</p>
    </div>
</template>

<style scoped>
    .menu {
        z-index: 0;
    }
    .transparent-icon {
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .transparent-button .icon {
        width: 4rem; /* Adjust size as needed */
        height: 4rem; /* Adjust size as needed */
    }

    .tContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 80px 0px 0px 0px;
        left: 10px;
        max-width: 700px;
        /* background-color: #101417e2; */
        /* backdrop-filter: blur(5px); */
        /* padding: 15px; */
        /* border-radius: 5px; */
    }
    .Name, .NameText {
        /* font-family: var(--font19); */
        font-family: var(--font29);
        font-size: 2em;
    }
    .Description, .DescriptionText {
        /* font-family: var(--font22); */
        font-size: 18px;
    }
    .descriptiondiv {
        display: flex;
        flex-direction: column;
    }
    /* .more-info-mobile { */
        /* display: none; */
        /* visibility: hidden; */
        /* width: ; */
    /* } */
    .linkstitle {
        margin: 15px 0px 0px 0px;
        /* font-family: var(--font29); */
        /* font-weight: normal; */
        /* font-style: round; */
    }
    .linkscontainer {
        margin: 10px 0px 10px 0px;
        display: flex;
    }
    .link {
        font-size: 20px;
        padding: 0px 10px 0px 10px;
    }
    .Location {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        margin: 0px 0px 0px 0px;
    }
    .Website {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        margin: 0px 0px 0px 0px;
    }
    .more-info-mobile {
        display: none;
        visibility: hidden;
    }
    .undertext {
        display: flex;
        flex-direction: row;
        gap: 25px;
        color: #aaaaaa;
        margin: 5px 0px 25px 0px;
        font-size: 0.9em;
    }
    .descriptiondivider {
        display: none;
        visibility: hidden;
    }
    .socialdivider {
        display: none;
        visibility: hidden;
    }
    .assets-credits {
        position: fixed;
        bottom: 20px;
        left: 20px;
        border-radius: 12px;
        padding: 10px;
        background-color: #3535352f;
        z-index: 1;
        border: 2px solid #a4a4a482;
        transition: left 1.3s;
        backdrop-filter: blur(5px);
    }
    .assets-credits a {
        color: var(--l-green);
    }
    .assets-credits p {
        color: var(--main-details);
    }
    .bottomImg {
        position: absolute;
        /* left: -10px; */
        right: 0px;
        bottom: 0px;
        z-index: -200;
        min-width: 110vh;
    }
    body {
        overflow-x: hidden;
    }

    @media only screen and (max-width: 768px) {
        
        .tContainer {
            margin: 80px 40px 40px 40px;
        }
        .descriptiondivider {
            display: flex;
            visibility: visible;
            margin: 0 0 10px 0;
        }
        .socialdivider {
            display: flex;
            visibility: visible;
            margin: 20px 0 0 0;
        }
        .linkstitle {
            display: none;
        }
        .linkscontainer {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
        .linkscontainer .link {
            font-size: 30px;
        }
        /* .more-info-mobile {
            display: flex;
            visibility: visible;
            height: auto;
        } */
        .undertext {
            /* display: none; */
            /* visibility: hidden; */
            flex-direction: column;
            gap: 5px;
            margin: 0px 0 25px 0;
        }
        .assets-credits {
            visibility: hidden;
            display: none;
        }
    }
    @media only screen and (min-width: 769px) {
        .tContainer {
            padding: 0 10px 0 10px;
            max-width: 700px;
        }
    }
    @media only screen and (max-width: 410px) {
        
    }
</style>

<script lang="ts">
    export default {
        mounted() {
            useSeoMeta({
                title: 'Angel Capra | Portfolio 🚀',
                ogTitle: 'Angel Capra | Portfolio 🚀',
                description: 'Explore Angel Capra\'s projects in cybersecurity, IoT development, and embedded systems. As a passionate cybersecurity student, I showcase a diverse portfolio from hacking devices with ESP32 and Arduino to creating innovative tech solutions. Discover the intersection of cybersecurity and IoT technology, and find fascinating projects that push the boundaries of tech innovation.',
                ogDescription: 'Explore Angel Capra\'s projects in cybersecurity, IoT development, and embedded systems. As a passionate cybersecurity student, I showcase a diverse portfolio from hacking devices with ESP32 and Arduino to creating innovative tech solutions. Discover the intersection of cybersecurity and IoT technology, and find fascinating projects that push the boundaries of tech innovation.',
                ogImage: '',
                twitterCard: 'summary_large_image',
            })
        }
    }
// export default {
//     mounted () {
        
//     }
// }
</script>
