<script setup lang="ts">
    import { useCharactersStore } from '~/stores/characters'
    import { vIntersectionObserver } from '@vueuse/components'
    import { Character } from '~/models/Character'
    import { storeToRefs } from 'pinia'

    const openDialog = ref(false)
    const page = ref(1)
    const currentCharacter: Ref<Character | undefined> = ref()

    const characterStore = useCharactersStore()
    const { fetchCharacters } = useCharactersStore()
    const { characters, isLoading } = storeToRefs(characterStore)
    characterStore.fetchCharacters()

    const onIntersectionObserver = () => {
        if (!isLoading.value) {
            page.value++
        }
    }

    watch(page, (newValue) => {
        fetchCharacters({ page: newValue })
    })

    const onClickChar = (character: Character) => {
        currentCharacter.value = character
        openDialog.value = true
    }
</script>

<template>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-md mt-lg">
        <CharacterItem
            v-for="character in characters"
            :key="character.id"
            v-bind="{ character }"
            @click-character="onClickChar" />
        <CardSkeleton v-intersection-observer="onIntersectionObserver" />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
    </div>
    <VvDialog
        id="dialog"
        v-model="openDialog"
        :title="currentCharacter?.name"
        transition="fade-block"
        size="standard"
        default="Default slot content">
        <LocationComponent
            v-if="currentCharacter"
            :location-url="currentCharacter.location.url" />
    </VvDialog>
</template>
