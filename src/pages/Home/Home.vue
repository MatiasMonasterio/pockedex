<template>
  <div class="container">
    <h1 class="home-title">Pokedex App</h1>

    <div class="pokemon-list">
      <template v-for="pokemon in pokemons" :key="pokemon.name">
        <PokemonCard :name="pokemon.name" />
      </template>
    </div>

    <template v-if="noMorePokemon">
      <span class="message"> There are no more pokemon </span>
    </template>

    <template v-if="pokemons.length !== 0">
      <button @click="loadPokemons" class="load-more-btn" :disabled="noMorePokemon">
        {{ isLoading ? "Loading..." : "Load More" }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "@/types";

import { onMounted, ref, computed } from "vue";
import { PokemonCard } from "@/components";
import { getPokemons } from "@/services";
import { POKEMON_LIMIT } from "@/config/constants";

const params = { offset: 0, limit: 20 };
const pokemons = ref<Pokemon[]>([]);
const isLoading = ref<boolean>(false);

const noMorePokemon = computed(() => {
  return params.offset + params.limit > POKEMON_LIMIT;
});

const loadPokemons = async () => {
  isLoading.value = true;

  try {
    const response = await getPokemons(params);

    pokemons.value.push(...response);
    params.offset += params.limit;
  } catch (error) {
    console.error(error);
  }

  isLoading.value = false;
};

onMounted(() => {
  loadPokemons();
});
</script>

<style scoped>
.home-title {
  text-align: center;
  margin-bottom: 4rem;
}
.pokemon-list {
  display: grid;
  grid-auto-rows: auto;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 2rem;
}

.load-more-btn {
  width: 100%;
}

.message {
  text-align: center;
  width: 100%;
  display: inline-block;
  color: gray;
}
</style>
