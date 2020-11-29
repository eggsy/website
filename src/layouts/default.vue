<template>
  <div :class="{ 'bg-gray-100': $route.path === '/' }">
    <Nuxt class="min-h-screen container mx-auto" />
  </div>
</template>
