<template>
  <div id="app">
    <Top/>
    <router-view/>
  </div>
</template>

<script>
import Top from './components/top'
export default {
  name: 'app',
  components:{ Top }
}
</script>

<style lang="scss">
$color:#fff;
*{
  padding:0;margin:0;
}
a,li{
  list-style: none;
  color:#1c1d1c;text-decoration: none;
}
img{
  max-width:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color;
}
</style>
