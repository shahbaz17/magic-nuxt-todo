<template>
  <div id="app">
    <atom-spinner
      id="inner-center"
      :animation-duration="1000"
      :size="300"
      :color="'#3b8070'"
    />
  </div>
</template>
<style scoped>
#app {
  width: 100%;
  text-align: center;
  margin: 200px auto;
}
#inner-center {
  display: inline-block;
  margin: 0 auto;
  padding: 3px;
}
</style>

<script>
import { AtomSpinner } from 'epic-spinners'
export default {
  components: {
    AtomSpinner,
  },
  mounted() {
    if (localStorage.getItem('auth._token.local')) {
      this.$router.push('/')
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
