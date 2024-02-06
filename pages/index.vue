<template>
    <div class="mainVue">
        <!-- <call-to-action /> -->
    </div>
    <div class="tContainer">
        <div class="ProfilePicture">
            <img src="/android-chrome-512x512.png" alt="Profile Picture" width="120px" />
        </div>
        <div class="Name">
            <p class="NameText" >Angel Capra</p>
        </div>
        <div class="undertext">
            <div class="Location">
                <font-awesome-icon icon="fa-solid fa-location-dot" />
                <p class="LocationText">Montreal, Quebec</p>
            </div>
            <div class="Website">
                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                <p class="WebsiteText"><a target="_blank" href="https://angellabs.xyz">https://angellabs.xyz</a></p>
            </div>
        </div>
        <div class="Description">
            <p class="DescriptionText">Cybersecurity student fascinated by the Internet of Things and embedded systems</p>
        </div>
        <div class="LinksTitle">
            <p class="linkstitle"></p>
        </div>
        <p class="linkstitle">follow me on</p>
        <div class="linkscontainer">
            <NuxtLink class="link" to="https://youtube.com/@angeldev0" external target="_blank"><font-awesome-icon icon="fa-brands fa-youtube" /></NuxtLink>
            <NuxtLink class="link" to="https://github.com/4ngel2769" external target="_blank"><font-awesome-icon icon="fa-brands fa-github" /></NuxtLink>
            <NuxtLink class="link" to="https://dev.to/angeldev0" external target="_blank"><font-awesome-icon icon="fa-brands fa-dev" /></NuxtLink>
            <NuxtLink class="link" to="https://twitter.com/angeldev0" external target="_blank"><font-awesome-icon icon="fa-brands fa-twitter" /></NuxtLink>
            <NuxtLink class="link" to="mailto:angel@angellabs.xyz" external><font-awesome-icon icon="fa-solid fa-at" /></NuxtLink>
            <NuxtLink class="link" to="https://instagram.com/azdev0" external target="_blank"><font-awesome-icon icon="fa-brands fa-instagram" /></NuxtLink>
        </div>
    </div>
    <div class="assets-credits">
        <p>Awesome backgrounds by Sébastien Noël's <a href="https://fffuel.co" target="_blank">fffuel.co</a> .</p>
    </div>
    <div class="wave">
        <img src="/public/wave-haikei4.svg" alt="wave">
    </div>
</template>

<style scoped>
    .link {
        font-size: 20px;
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
    .undertext {
        color: #aaaaaa;
    }
    .Description, .DescriptionText {
        /* font-family: var(--font22); */
        font-size: 18px;
    }
    .linkstitle {
        margin: 15px 0px 0px 0px;
        /* font-family: var(--font29); */
        /* font-weight: normal; */
        /* font-style: round; */
    }
    .linkscontainer {
        margin: 10px 0px 10px 0px;
    }
    .link {
        padding: 0px 10px 0px 10px;
    }
    .Location {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        margin: 0px 0px 0px 0px;
    }
    .Location p {
        /* font-family: var(--font29); */
        /* font-weight: bold; */
    }
    .Website {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        margin: 0px 0px 0px 0px;
    }
    .Website p {

    }
    .undertext {
        display: flex;
        flex-direction: row;
        gap: 25px;
        margin: 5px 0px 25px 0px;
    }
    .mainVue {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
    .assets-credits {
        position: absolute;
        bottom: 20px;
        left: 20px;
        border-radius: 18px;
        padding: 10px;
        background-color: #3535353d;
        z-index: 100;
    }
    .assets-credits a {
        color: var(--l-green);
    }
    .assets-credits p {
        color: var(--main-details);
    }
    .assets-credits a, p {
    }
    .wave {
        position: absolute;
        bottom: 0vh;
        z-index: 50;
    }
</style>