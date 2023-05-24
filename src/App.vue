<script setup lang="ts">
    import { RouterView } from 'vue-router'
</script>

<template>
    <div class="h-screen w-screen p-lg">
        <header class="flex flex-col items-center theme theme--dark">
            <div class="mb-lg grid grid-cols-2 gap-lg">
                <a href="https://github.com/volverjs/data" target="_blank">
                    <img
                        alt="logo-data"
                        src="https://raw.githubusercontent.com/volverjs/data/develop/docs/static/volverjs-data.svg"
                        width="125"
                        height="125" />
                </a>
                <a href="https://github.com/volverjs/query-vue" target="_blank">
                    <img
                        alt="logo-query"
                        src="https://raw.githubusercontent.com/volverjs/query-vue/develop/docs/static/volverjs-query.svg"
                        width="125"
                        height="125" />
                </a>
            </div>

            <WelcomeItem msg="Welcome!" />
        </header>

        <RouterView />
    </div>
</template>
