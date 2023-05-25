<script setup lang="ts">
    defineProps<{
        msg: string
    }>()
</script>

<template>
    <div class="flex flex-col items-center preflight">
        <h1 class="mt-5">{{ msg }}</h1>
        <h3>
            Here an example App with
            <a href="https://vuejs.org/" target="_blank">Vue</a>
            +
            <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a>
        </h3>
    </div>
</template>
