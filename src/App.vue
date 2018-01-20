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
  padding:0;margin:0;outline: none;
}
body{
  background:#f7f7f7;
}
a,li{
  list-style: none;
  color:#1c1d1c;text-decoration: none;
}
a{
  cursor: pointer;
}
img{
  max-width:100%;
}
#app {
    margin-bottom: 0;text-align:center;
}
::selection { background:rgb(58, 247, 90); color:#fff; } 
::-moz-selection { background:rgb(58, 247, 90); color:#fff; } 
::-webkit-selection { background:rgb(58, 247, 90); color:#fff; }
</style>
