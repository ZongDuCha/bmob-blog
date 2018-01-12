<template>
  <div id="app">
    <Message/>
    <Login v-if="!loginBJ"/>
    <Top v-if="loginBJ" />
    <router-view v-if="loginBJ" />
  </div>
</template>

<script>
import Top from './components/top'
import Login from './components/login'
import Message from './components/message'
import { mapState,store} from 'vuex'
export default {
  name: 'app',
  components:{ Top,Login,Message },
  computed:{
    ...mapState([
      'loginBJ'
    ])
  },
  mounted:function(){
    this.$store.commit('local')
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
