import { defineStore } from 'pinia'
import { Character } from '~/models/Character'

export const useCounterStore = defineStore('characters', () => {
    const characters: Ref<Character[]> = ref([])
    const hasError = ref(false)

    /**
     * fetch characters with fetch API
     */
    async function fetchCharacters(query) {
        await fetch('https://rickandmortyapi.com/api/character')
            .then((response) => response.json())
            .then((data) => {
                characters.value = data.results
            })
            .catch((error) => {
                hasError.value = true
                console.error(error)
            })
    }

    return { characters, hasError, fetchCharacters }
})
