<template>
  <div class="login">
      <div class="login-container">
          <div class="login-title">
              ZongDuSir
          </div>

          <div class="statsMenu">
              <li :class="clickMenu ? 'active' : ''" @click="clickMenu = true;errState()">Sign in</li>
              <li :class="!clickMenu ? 'active' : ''" @click="clickMenu = false;errState()">Sign up</li>
          </div>

          <div class="in"  v-show="clickMenu">
              <div class="user">
                    <div class="user-i">
                        <i class="fa fa-user"></i>
                    </div>

                    <div class="user-input">
                        <input 
                            type="text" @blur="inUser()" 
                            :class="!err ? 'err' : ''" 
                            ref="inStats">
                    </div>
                </div>

                <div class="password">
                    <div class="password-i">
                        <i class="fa fa-unlock-alt"></i>
                    </div>

                    <div class="password-input">
                        <input type="password" ref="inPass" @keyup.enter="signIn()">
                    </div>
                </div>

                <button @click="signIn()">
                        登录
                </button>
          </div>

          <div class="up" v-show="!clickMenu">
              <div class="user">
                    <div class="user-i">
                        <i class="fa fa-user"></i>
                    </div>

                    <div class="user-input">
                        <!-- :value 点击注册清除内容 -->
                        <input 
                            type="text"
                            :value="mesState ? '' : ''"
                            ref="upStats" 
                            :class="!err ? 'err' : ''">
                    </div>
                </div>

                <div class="password">
                    <div class="password-i">
                        <i class="fa fa-unlock-alt"></i>
                    </div>

                    <div class="password-input">
                        <input type="password" 
                                ref="upPass" 
                                :value="mesState ? '' : ''"
                                @keyup.enter="signUp()">
                    </div>
                </div>

                <button @click="signUp()">注册</button>
          </div>
          <a class="skip" @click="skip()">随便看看</a>
      </div>
  </div>
</template>

<script>
import { mapAction,mapState } from 'vuex'
import store from 'vuex'
export default {
    name: 'login',
    data(){
        return{
            clickMenu: true
        }
    },
    computed:{
        ...mapState([
            'err',
            'inputState',
            'loginBJ',
            'mesState'
        ])
    },
   methods:{
       // 登录
       inUser:function (){
           this.$store.dispatch('inStats',{
               inUser: this.$refs.inStats.value,
           })
       },
       signIn:function (){
           this.$store.dispatch('inStats',{
               inUser: this.$refs.inStats.value,
                inPassword: this.$refs.inPass.value
           })
       },
       // 注册
       signUp:function(){
           this.$store.dispatch('signUp',{
               upUser:this.$refs.upStats.value,
               upPass:this.$refs.upPass.value
           })
       },
       // 随便看看
       skip:function(){
           this.$store.commit('skip')
       },
       // 重置 err状态
       errState:function(){
           this.$store.commit('errState')
       }
   }
}
</script>

<style lang='scss'>
.skip{
    text-decoration: underline;display: block;font-size: 13px;cursor: pointer;
    margin-top:20px;text-align: center;padding-bottom:5px;letter-spacing: 2px;
}
.close{
    display: none;
}
.login{
    position:fixed;background:#fff;text-align:left;
    width:100%;z-index: 2;display: block;height:100%;
    background: linear-gradient(to left, #f55bf0, #56cef3);

    .login-container{
        width: 360px;
        height: 530px;
        max-width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.1490196);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 3px;
        border-top: 4px solid $color;
        box-sizing:border-box;
        padding:10px;
        background: rgba(188, 245, 227, 0.27);
        box-shadow: -2px 7px 15px rgba(63, 63, 63, 0.04);

        *{
            color:#fff;letter-spacing: 1px;
        }

        .login-title{
            margin-top:60px;
            font-size: 18px;
            margin-bottom: 10px;
            color: #e00b0b;
            font-weight: 900;
            text-shadow: 0 1px 15px #fff;
        }

        .statsMenu{
            display: flex;

            li{
                flex:50%;text-align:center;
                font-weight: 900;
                margin:5px 0;
                padding:15px 0;
                font-size: 19px;
                cursor: pointer;
                position:relative;
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;transition:.3s;
                user-select:none;

                &::after{
                    position: absolute;transition:.3s;
                    bottom:0;left:0;right:0;margin:auto;
                    width:0%;height:2px;background:$color;
                }
            }

            .active{
                color:$color;

                &::after{
                    width:60%;
                }

            }
        }
        .open{
            display:block;
        }

        .in,.up{
            
            box-sizing:border-box;padding:0 20px;text-align:center;
        }

        .user,.password{
            display:flex;
            .user-i,.password-i{
                flex: 0 0 55px;
            }
            .user-input,.password-input{
                flex:1;
            }
        }

        .user-i,.password-i,.user-input,.password-input{
            float:left;
            margin:20px 0;font-size: 35px;text-align:center;
        }

        input{
            height: 15px;background:transparent;border:none;
            border-bottom:0.7px solid #fff;outline: none;
            vertical-align: middle;width:100%;
            box-sizing: border-box;
            padding: 15px 0;transition:.3s;
            margin-top: -7px;
            font-size: 16px;
        }
        button{
            border: none;transition:.3s;
            width: 80%;
            padding: 12px 0;
            margin-top: 20px;
            border-radius: 20px;
            color: #fff;outline:none;cursor:pointer;
            background: rgba(0, 0, 0, 0.4);
            box-shadow: -2px 2px 2px rgba(25, 22, 22, 0.15);

            &:hover{
                background: rgba(0, 0, 0, 0.5);
            }
        }

        .err{
            border-color:#ff0000;
            color:#ff0000;animation: .15s err;
            animation-iteration-count:4;
            -webkit-animation-iteration-count:4;
        }
    }
}
@keyframes err{
    0%{
        margin-left:-10px;
    }
    25%{
        margin-left:10px;
    }
    50%{
        margin-left:-10px;
    }
    75%{
        margin-left:10px;
    }
    100%{
        margin-left:0px;
    }
}

</style>
