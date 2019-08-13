<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img alt="logo" src="../../../public/logo.png"/>
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  components: {

  },
  props: {
    title: {
      type: String,
      default: 'APP',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
