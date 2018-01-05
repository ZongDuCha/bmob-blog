<template>
  <div id="app">
    <Top/>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Top from './components/top'
import { logo } from './components/api.js'
export default {
  name: 'app',
  components:{ Top },
  mounted:function(){
    logo('q7150849514c91ed37625710a29c91139','243c886d51cc5d468ccef730afe00cba')
  }
}
</script>

<style lang="scss">
*{
  padding:0;margin:0;
}
img{
  max-width:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
