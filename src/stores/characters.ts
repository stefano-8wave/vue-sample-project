import { defineStore } from 'pinia'
import { RepositoryHttpReadOptions } from '~/common/RepositoryHttp'
import { ParamMap } from '~/common/types'
import { useRepositoryHttp } from '~/composables/useRepositoryHttp'
import { Character } from '~/models/Character'
import { Response } from '~/models/Response'

export const useCharactersStore = defineStore('characters', () => {
    const characters: Ref<Character[]> = ref([])
    const hasError = ref(false)
    const isLoading = ref(false)

    const { repository: charactersRepository } = useRepositoryHttp<
        Character,
        Response<Character>
    >('api/character', { responseAdapter: (response) => response.results })

    /**
     * fetch characters with fetch API
     */
    async function fetchCharacters(
        params: ParamMap = {},
        options: RepositoryHttpReadOptions = {},
    ) {
        isLoading.value = true
        const { responsePromise } = charactersRepository.read(params, options)
        const { data, ok } = await responsePromise
        characters.value = data ?? []
        hasError.value = !ok
        isLoading.value = false
    }

    return { characters, hasError, isLoading, fetchCharacters }
})
