<script setup lang="ts">
    import { useRepositoryHttp } from '~/composables/useRepositoryHttp'
    import { Location } from '~/models/Location'

    const props = defineProps<{
        characterId: number
    }>()

    const location: Ref<Location | undefined> = ref()
    const hasError = ref(false)

    watch(
        () => props.characterId,
        async (newValue) => {
            const { repository: locationsRepository } =
                useRepositoryHttp<Location>('api/location/:id')

            const { responsePromise } = locationsRepository.read({
                id: newValue,
            })
            const { data, ok } = await responsePromise
            location.value = data?.[0]
            hasError.value = !ok
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
