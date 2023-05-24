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
            <a href="https://github.com/volverjs/data" target="_blank"
                >@volverjs/data</a
            >
            +
            <a href="https://github.com/volverjs/query-vue" target="_blank"
                >@volverjs/query-vue</a
            >
        </h3>
    </div>
</template>
