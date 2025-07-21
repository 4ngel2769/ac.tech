<template>
    <div class="MainBox flex">
        <div class="LinkWrap">
            <div class="LinkBox">
                <div class="Line">
                    <p class="Number">01 </p>
                    <p class="Divider">// </p>
                    <p class="Linkp">instagram.com/ </p>
                    <NuxtLink to="https://instagram.com/@azdev0">
                        <p class="Linkm">@azdev0</p>
                    </NuxtLink>
                </div>
                <div class="Line">
                    <p class="Number">02 </p>
                    <p class="Divider">// </p>
                    <p class="Linkp">github.com/ </p>
                    <NuxtLink to="https://github.com/4ngel2769">
                        <p class="Linkm">4ngel2769</p>
                    </NuxtLink>
                </div>
                <div class="Line">
                    <p class="Number">03 </p>
                    <p class="Divider">// </p>
                    <p class="Linkp">youtube.com/ </p>
                    <NuxtLink to="https://youtube.com/@angeldev0">
                        <p class="Linkm">@angeldev0</p>
                    </NuxtLink>
                </div>
                <div class="Line">
                    <p class="Number">04 </p>
                    <p class="Divider">// </p>
                    <p class="Linkp">twitter.com/ </p>
                    <NuxtLink to="https://twitter.com/angeldev0">
                        <p class="Linkm">angeldev0</p>
                    </NuxtLink>
                </div>
                <div class="Line">
                    <p class="Number">05 </p>
                    <p class="Divider">// </p>
                    <p class="Linkp"></p>
                    <NuxtLink to="">
                        <p class="Linkm"></p>
                    </NuxtLink>
                </div>
                <div class="Line">
                    <p class="Number">06 </p>
                    <p class="Divider">// </p>
                    <p class="Linkp"></p>
                    <NuxtLink to="">
                        <p class="Linkm"></p>
                    </NuxtLink>
                </div>
                <!-- <div class="Line"><p class="Number">01.</p><p class="Divider"></p><NuxtLink to="" class="Link"></NuxtLink></div> -->
                <!-- <p class="Number"></p><p class="Divider"></p><NuxtLink to="" class="Link"></NuxtLink> -->
            </div>
        </div>
    </div>
</template>

<style>
    p {
        font-family: var(--font2);
    }
    .Number {
        color: #777777;
    }
    /* .Divider {
        font-family: var(--font17);
    } */
    .Line {
        display: flex;
        flex-direction: row;
        white-space: pre;
    }
    .LinkBox {
        display: flex;
        flex-direction: column;
    }
    .LinkWrap {
        min-width: 700px;
    }
    .NL {
        flex-wrap: nowrap;
    }
</style>