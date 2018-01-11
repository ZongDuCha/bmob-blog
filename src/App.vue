<template>
  <div id="app">
    <Login v-if="loginBJ"/>
    <Top v-if="!loginBJ" />
    <router-view v-if="!loginBJ" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Top from './components/top'
import Login from './components/login'
export default {
  name: 'app',
  components:{ Top,Login },
  computed:{
    ...mapState([
      'loginBJ'
    ])
  }
}
</script>

<style lang="scss">
*{
  padding:0;margin:0;
}
body{
  background:#eaeaea;
}
a,li{
  list-style: none;
  color:#1c1d1c;text-decoration: none;
}
img{
  max-width:100%;
}
#app {
    margin-bottom: 0;text-align:center;
}
</style>
