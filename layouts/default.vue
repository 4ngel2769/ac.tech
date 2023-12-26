<template>
    <div class="flex flex-col align-center">
        <div class="flex" style="justify-content: center;">
            <Header />
        </div>
        <div class="flex" style="justify-content: center;">
            <slot />
        </div>
        <div class="flex" style="justify-content: center;">
            <Footer />
        </div>
    </div>
</template>