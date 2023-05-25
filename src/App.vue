<script setup lang="ts">
    import { RouterView } from 'vue-router'
</script>

<template>
    <div class="h-screen w-screen p-lg">
        <header class="flex flex-col items-center theme theme--dark">
            <div class="mb-lg grid grid-cols-2 gap-lg">
                <a href="https://vuejs.org/" target="_blank">
                    <img
                        alt="logo-data"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1920px-Vue.js_Logo_2.svg.png"
                        width="125"
                        height="125" />
                </a>
                <a href="https://pinia.vuejs.org/" target="_blank">
                    <img
                        alt="logo-query"
                        src="https://pinia.vuejs.org/logo.svg"
                        width="125"
                        height="125" />
                </a>
            </div>

            <WelcomeItem msg="Welcome!" />
        </header>

        <RouterView />
    </div>
</template>
