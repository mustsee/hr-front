<template>
  <div class="home">
    <header>
      <b-button @click="handleOpenForm">add advert</b-button>
    </header>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    handleOpenForm() {
      this.$router.push({ path: "/advert" });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 80px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  background-color: #ffdc00;
  border-bottom: 1px solid black;
}
</style>
