<script setup lang="ts">
    import { Character } from '~/models/Character'

    const props = defineProps<{
        character: Character
    }>()

    const emit = defineEmits<{
        clickCharacter: [clickCharacter: Character]
    }>()

    const hasModifiers = computed(() => {
        const toReturn: string[] = []
        if (props.character.status === 'Alive') {
            toReturn.push('success')
        }
        if (props.character.status === 'Dead') {
            toReturn.push('danger')
        }
        return toReturn
    })
</script>

<template>
    <VvCard @click="emit('clickCharacter', character)">
        <template #header>
            <div class="truncate">{{ character.name }}</div>
        </template>
        <picture>
            <img class="h-100" :src="character.image" :alt="character.name" />
        </picture>
        <template #footer>
            <div class="mb-5 flex justify-between">
                {{ character.species }}
                <VvBadge :value="character.status" :modifiers="hasModifiers" />
            </div>
        </template>
    </VvCard>
</template>
