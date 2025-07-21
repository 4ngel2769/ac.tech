<template>
    <div class="mxw rounded-xl">
        <NuxtLink :to="post._path">
            <!-- <div class="card text-center rounded-t-xl "> -->
            <div class="card flex rounded-md">
                <img :src="post.img" class="hoverBanner absolute z-20" />

                <!-- <div class="hoverBG"
                :style="{ 
                    backgroundImage: 'url(' + post.img + ')' 
                }" 
                
                style="
                mask-image: linear-gradient(0deg, transparent 2%, black);
                -webkit-mask-image: linear-gradient(0deg, transparent -10%, black);
                transition: transform .8s;
                "></div> -->
                <div class="card-details">
                    <!-- <NuxtLink :to="post._path"> -->
                        <div class="text-center">
                            <p class="text-gray-200 text-lg">
                                {{ post.title }}
                            </p>
                        </div>
                    <!-- </NuxtLink> -->
                </div>
            </div>
        </NuxtLink>
        <div class="postFooter">
            <p class="text-gray-300 textC">
                {{ post.description }}...
            </p>
            <!-- <p class="text-gray-400">
                By {{ post.author }}
            </p> -->
            <div class="postFooterDetails">
                <p class="text-gray-500 textC" style="font-size: .8em;">{{ post.date }}</p>
                <p class="text-gray-100 text-2xl textC">
                    <i :class="'nf fa-solid '+ post.icon"></i>
                    <!-- <span class="material-symbols-outlined">{{ post.icon }}</span> -->
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { post } = defineProps(['post'])
</script>

<style scoped>
    .card {
        text-align: center;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        width: 400px;
        height: 190px;
        margin-top: 0px;
        overflow: hidden;
        background-color: rgb(19, 24, 33);
    }
    .hoverBanner {
        object-fit: contain;
        flex-shrink: 0;
        position: relative;
        min-width: 100%;
        margin: auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .hoverBanner {
        /* filter: blur(1px); */
        mask-image: linear-gradient(0deg, transparent 10%, black);
        -webkit-mask-image: linear-gradient(0deg, transparent 10%, transparent 30% , black);
        transition: transform .8s;
    }
    .hoverBanner:hover {
        transform: scale(1.2);
    }
    
.postFooter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 10px 10px 10px;
}
.textC {
    transform: color 9.4s ease;
}
.card-details {
  z-index: 30; 
  position: absolute;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  row-gap: 10px;
  align-self: flex-end;
  margin: 10px 10px 10px 10px;
  pointer-events: none;
}
.postFooterDetails {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mxw {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: none;
  padding: 0;
  background-color: rgb(12, 15, 18);
  transition: background-color 0.5s ease;
}
.mxw:hover {
    background-color: var(--light-bg);
}
.mxw:hover .postFooter * {
    color: black;
}
</style>