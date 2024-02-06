<script setup lang="ts">
const items = [{
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  slot: 'getting-started'
}, {
  label: 'Installation',
  icon: 'i-heroicons-arrow-down-tray',
  defaultOpen: true,
  slot: 'installation'
}, {
  label: 'Theming',
  icon: 'i-heroicons-eye-dropper',
  defaultOpen: true,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Layouts',
  icon: 'i-heroicons-rectangle-group',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Components',
  icon: 'i-heroicons-square-3-stack-3d',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Utilities',
  icon: 'i-heroicons-wrench-screwdriver',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}]
</script>

<template>
    <div class="d">
        <div>bruv</div>
        <div>bruv</div>
        <div>a</div>
        <div>a</div>
        <UAccordion :items="items">
            <template #item="{ item }">
                <p class="italic text-gray-900 dark:text-white text-center">
                    {{ item.description }}
                </p>
            </template>

            <template #getting-started>
                <div class="text-gray-900 dark:text-white text-center">
                    <Logo class="w-auto h-8 mx-auto" />

                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Fully styled and customizable components for Nuxt.
                    </p>
                    
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

            <template #installation="{ description }">
                <div class="flex flex-col justify-center items-center gap-1 mb-4">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    Installation
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                    Install <code>@nuxt/ui</code> dependency to your project:
                    </p>
                    <p>
                    {{ description }}
                    </p>
                </div>

                <div class="flex flex-col items-center">
                    <code>$ npm i @nuxt/ui</code>
                    <code>$ yarn add @nuxt/ui</code>
                    <code>$ pnpm add @nuxt/ui</code>
                </div>
            </template>
        </UAccordion>
    </div>
</template>

<style scoped>
    .d {
        display: flex;
        flex-direction: column;
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
        color: #aaaaaa;
        margin: 5px 0px 25px 0px;
    }
</style>