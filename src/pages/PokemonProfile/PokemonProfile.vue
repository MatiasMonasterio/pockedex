<template>
  <div class="container" v-if="pokemon">
    <button class="go-back-btn" type="button" @click="router.push('/')">Go Back</button>

    <div class="profile__container fadeIn">
      <img :src="pokemonImage" width="250px" height="250px" />

      <div class="profile__info">
        <div class="profile__main">
          <span class="profile__id"># {{ pokemon.id }}</span>
          <h1 class="profile__title">{{ pokemon.name }}</h1>

          <div class="profile__types">
            <template v-for="pokemonType in pokemon.types" :key="pokemonType.slot">
              <Badget>{{ pokemonType.type.name }}</Badget>
            </template>
          </div>
        </div>

        <div class="profile__data">
          <div class="text-capitalize profile__details">
            <h2>Details</h2>

            <p class="profile__details-row">
              <span> Species: </span>
              <span>{{ pokemon.species.name }}</span>
            </p>

            <p class="profile__details-row">
              <span> Hieght: </span>
              <span>{{ pokemon.height }}m</span>
            </p>

            <p class="profile__details-row">
              <span> Weight: </span>
              <span>{{ pokemon.weight }}kg</span>
            </p>

            <p class="profile__details-row">
              <span> Abilities: </span>
              <span>
                <template v-for="ability in pokemon.abilities" :key="ability.slot">
                  <span class="ability">{{ ability.ability.name }}</span>
                </template>
              </span>
            </p>
          </div>

          <div>
            <h2>Stats</h2>
            <template v-for="stat in pokemon.stats" :key="stat.stat.name">
              <Stat v-bind="stat" />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="fadeIn">
      <h2>Moves</h2>
      <MoveTable :moves="pokemon.moves" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokedex } from "@/types";

import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Badget, Stat, MoveTable } from "@/components";
import { getPokemonByName } from "@/services";
import { getOficialArtwork } from "@/utils";

const router = useRouter();
const { params } = useRoute();
const pokemon = ref<Pokedex>();

const pokemonImage = computed(() => {
  return pokemon.value ? getOficialArtwork(pokemon.value.sprites.front_default) : "";
});

const getPokemon = async () => {
  const pokemonName = params.name as string;

  try {
    const response = await getPokemonByName(pokemonName);
    pokemon.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPokemon();
});
</script>

<style scoped>
.go-back-btn {
  margin-bottom: 1rem;
}
.profile__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile__container img {
  width: 250px;
  height: 250px;
}

.profile__info {
  width: 100%;
}

.profile__main {
  margin-bottom: 1rem;
  text-align: center;
}

.profile__data {
  display: grid;
  max-width: 100%;
  grid-auto-rows: auto;
  grid-column-gap: 5rem;
  grid-row-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.profile__id {
  color: gray;
  font-size: 0.92rem;
}

.profile__title {
  text-transform: capitalize;
  margin-bottom: 0.8rem;
  margin-top: 0.2rem;
}

.profile__types {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.profile__details {
  font-size: 0.95rem;
}

.profile__details-row {
  display: flex;
  justify-content: space-between;
  margin: 0.95rem 0;
}

.ability {
  margin-left: 0.2rem;
}
.ability::after {
  content: ",";
}

.ability:last-child::after {
  content: "";
}
</style>
