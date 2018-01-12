<template>
  <div class="message" v-if="mesState" :class="mesState">
      <i class="fa" :class="mesState == 'err' ? 'fa-info  faa-horizontal animated' : 'fa-check  faa-horizontal animated'"></i>
      {{mesTitle}}
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'message',
    computed:{
    ...mapState([
      'mesState',
      'mesTitle'
    ])
  }
}
</script>

<style lang="scss">
.message{
    z-index: 9999;
    position: fixed;
    width: 250px;
    background: #fff;
    left: 0;
    right: 0;
    -webkit-transition: .5s;
    transition: .5s;
    top: 40px;
    opacity: 0;
    margin: auto;
    padding: 10px 0;
    border-radius: 1px;
    -webkit-box-shadow: -2px 3px 2px rgba(87, 85, 85, 0.05);
    box-shadow: 0px 3px 8px rgba(87, 85, 85, 0.05);
    border: 1px solid #ffffff20;
    font-size: 13px;letter-spacing: 2px;
}
.err,.suc{
    color: rgb(250, 248, 248);animation:stateAni 4s;
}
.err{
    background: -webkit-gradient(linear, right top, left top, from(#ff0000), to(#fff));
    background: linear-gradient(to left, rgba(234, 13, 13, 0.87), rgba(241, 68, 68, 0.84));
    
}
.suc{
    background: linear-gradient(to left, #30bd14, #08ce33);
}
@keyframes stateAni{
    0%{
        opacity: 0;top:0px;
    }
    6%,95%{
        opacity: 1;top:40px;
    }
    100%{
        opacity: 0;top:0px;
    }
}
</style>
