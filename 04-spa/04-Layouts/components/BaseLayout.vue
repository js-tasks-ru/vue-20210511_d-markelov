<template>
  <div class="wrapper bg-grey">
    <the-header />
    <main class="main"><slot /></main>
    <the-footer />
  </div>
</template>

<script>
import TheFooter from './TheFooter.vue';
import TheHeader from './TheHeader.vue';
export default {
  name: 'BaseLayout',
  components: { TheHeader, TheFooter },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
