<template>
  <div>
    <MainTop v-bind:if_logo="true" v-bind:user_type="'0'"></MainTop>
    <MainBottom></MainBottom>
  </div>
</template>

<script>
import MainTop from "../MainTop";
import MainBottom from "../MainBottom";

export default {
  components: {MainTop, MainBottom},
  name: "ProjectList"
}
</script>

<style scoped>

</style>
