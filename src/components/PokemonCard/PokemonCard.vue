<template>
  <router-link :to="`/${props.name}`" class="pokemon-card fadeIn" v-if="pokemon">
    <div class="pokemon-card__image-container">
      <img width="170px" height="170px" :src="pokemonImage" />
    </div>

    <div class="pokemon-card__types">
      <template v-for="pokemonType in pokemon.types" :key="pokemonType.slot">
        <span class="pokemon-card__type">{{ pokemonType.type.name }}</span>
      </template>
    </div>

    <h2 class="pokemon-card__title">{{ pokemon.name }}</h2>
    <span class="pokemon-card__weight">weight: {{ pokemon.weight }}</span>
  </router-link>
</template>

<script setup lang="ts">
import type { Pokedex } from "@/types";

import { onMounted, ref, computed } from "vue";
import { getPokemonByName } from "@/services";
import { getOficialArtwork } from "@/utils";

const props = defineProps<{ name: string }>();
const pokemon = ref<Pokedex>();

const pokemonImage = computed(() => {
  return pokemon.value ? getOficialArtwork(pokemon.value.sprites.front_default) : "";
});

onMounted(() => {
  getPokemonByName(props.name).then((response) => {
    pokemon.value = response;
  });
});
</script>

<style scoped>
.pokemon-card {
  background-color: lightblue;
  border-radius: 10px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
}

.pokemon-card img {
  width: 170px;
  height: 170px;
  position: relative;
  z-index: 1;
  transition: transform 0.2s;
}

.pokemon-card:hover img {
  transform: translateY(-4px);
  transform: scale(1.04);
}

.pokemon-card__image-container {
  position: relative;
}

.pokemon-card__image-container::after {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 7%;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.pokemon-card__title {
  text-transform: capitalize;
  font-weight: 500;
  margin-bottom: 0.1rem;
}

.pokemon-card__types {
  display: flex;
  gap: 0.5rem;
}

.pokemon-card__type {
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0.1rem 0.9rem;
  border-radius: 100px;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 600;
}

.pokemon-card__weight {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
