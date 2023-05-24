<script setup lang="ts">
    import { Location } from '~/models/Location'

    const props = defineProps<{
        locationUrl: string
    }>()

    const location: Ref<Location | undefined> = ref()
    const hasError = ref(false)

    /**
     * fetch location data using fetch API
     * no auth token
     */
    const fetchLocation = () => {
        fetch(props.locationUrl)
            .then((response) => response.json())
            .catch((e) => {
                hasError.value = true
                console.error(e)
            })
            .then((data) => {
                location.value = data
            })
    }

    watch(
        () => props.locationUrl,
        () => {
            fetchLocation()
        },
        { immediate: true },
    )
</script>

<template>
    <div class="preflight">
        <h3>Location: {{ location?.name }}</h3>
        <h4>Dimension: {{ location?.dimension }}</h4>
        <h4>Type: {{ location?.type }}</h4>
        <h2 v-if="hasError">An error occurred</h2>
    </div>
</template>
