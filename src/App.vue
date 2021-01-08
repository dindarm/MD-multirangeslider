<template>
  <md-multi-range-selector v-model:min="minimum" v-model:max="maximum"  />
  <div>
    {{minimum}} - {{maximum}}
  </div>
</template>

<script lang="ts">
import { defineComponent,
  ref } from 'vue'
import MdMultiRangeSelector from './components/MdMultiRangeSelector/MdMultiRangeSelector.vue'

export default defineComponent({
  name: 'App',

  components: {
    MdMultiRangeSelector
  },

  setup () {
    const minimum = ref(-30)
    const maximum = ref(80)

    return {
      minimum,
      maximum
    }
  }
})

</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    padding: 300px;
  }

</style>
