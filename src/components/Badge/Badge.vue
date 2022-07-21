<template>
  <span class="badge">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0.1rem 0.9rem;
  border-radius: 100px;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
}
</style>
