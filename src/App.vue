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
