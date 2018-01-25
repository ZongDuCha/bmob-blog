<template>
<div>
  <div class="top">
      <img src="../assets/logo-bj.jpg" alt="">

      <nav>
          <div class="menu" @click="left = !left">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div :class="left ? 'menu-list left' : 'menu-list'">
                <li> <router-link to="/">Home</router-link> </li>
                <li> <a href="https://github.com/ZongDuCha/bmob-blog" target="_blank">Github</a></li>
                <li> <a href="https://juejin.im/user/599ef403518825243217317c" target="_blank">Juejin</a></li>
                <li> <router-link to="/about">About</router-link></li>
          </div>
      </nav>

      <div class="logo">
          <img src="../assets/logonameimg.png" alt="">
          <p v-if="name">
              <a>{{name}}</a> 
              <a @click="cleanlocal">退出</a>
              <a>发表文章</a>
            </p>
          <p v-if="!name" onclick="window.location.reload()"><a>去登录</a></p>
          <p>梦想还是要有的，万一实现了呢</p>
      </div>
  </div>

  <div class="pushNews pushNewsAni">
      <div class="push-container">
          <i class="fa fa-close fa-2x"></i>

          <div class="opacmod">
            <input type="text" placeholder="标题" ref="modTitle">
            <div id="pushedi" style="text-align:left"></div>
            <div class="operation">
                <label 
                    :for="item.value" 
                    v-for="(item,index) in pushTag"
                    :key="index">
                    <input type="checkbox"
                    :id="item.value"
                    @click="pushTagState(item.value,$event)"
                    :value="item.value">
                    {{item.value}}
                    </label>

                <button>清空内容</button>
                <button >确定修改</button>
            </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import store from 'vuex'
import E from 'wangeditor'
export default {
    name: 'top',
    data(){
        return{
            // 控制小屏下的侧边导航栏
            left: false,
            name: localStorage.getItem('name'),
            nameImg: '',
            tagState: [],
            pushTag:[
                {
                    value:'Javascript'
                },{
                    value:'Webpack'
                },{
                    value:'Sass'
                },{
                    value:'Nodejs'
                },{
                    value:'Vue'
                }
            ]
        }
    },
    methods:{
        cleanlocal:function(){
            this.$store.commit('cleanlocal')
        },
        pushTagState:function(value,e){
            var is = this.tagState.includes(value)
            if(is){
                var of = this.tagState.indexOf(value)
                this.tagState.splice(of,of+1)
            }else{
                this.tagState.push(value)
            }
            e.stopPropagation()
        }
    },
    mounted(){
        var editor = new E('#pushedi')
        editor.create()
        editor.txt.html('请输入内容')
    }
}
</script>

<style lang='scss'>
.pushNews{
    position: relative;transition:.4s;
    position: fixed;bottom:0;left:0;right:0;margin:auto;
    width:0%;height:0%;opacity: 0;z-index:99;
    background:rgba(23, 21, 21, 0.74);
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    -o-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);

    .push-container{
        position: relative;
        border-radius: 5px;
        position: absolute;
        top: 0;overflow-y: auto;
        bottom: 0;
        right: 0;
        left: 0;box-sizing:border-box;padding:15px;
        margin: auto;
        max-width:100%;max-height:100%;
        background:#fff;
        width:80%;height:80%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
        *{
            color:#353535;
        }

        .fa-close{
            cursor: pointer;
            transition:.3s;
            position: absolute;
            right: 15px;
            top: 10px;color:rgb(73, 73, 73);
            z-index:9;
            &:hover{
                color:#ff0000;
            }
        }

        .operation{
            label{
                display:flex;text-align:left;float: left;margin-right:10px;
                margin-top:5px;

                input{
                        height: 18px;
                        width: 18px;
                        margin-top: 2px;
                        margin-right: 3px;
                }
            }
        }

    }
}
.pushNewsAni{
    width:100%;height:100%;opacity:1 !important;
}
.tag{
    color:#000;
    text-align: center;

    li{
        display:inline-block;
        margin-top:5px;
    }
    a{
        margin: 5px 10px;
        -webkit-transition: .3s;
        transition: .3s;
        background: #fff;
        padding: 10px 30px;
        border-radius: 3px;
        font-size: 13px;
        color: $color;
        transition:.5s;

        &:hover{
            background:$color;
            color:#fff;
        }
    }
    .active{
        @extend a:hover;
    }
}
.top{
    width:100%;

    nav{
        position: absolute;
        top: 20px;
        right: 50px;

        .menu{
            cursor: pointer;
            width: 35px;
            height: 30px;
            border: 1px solid #fff;
            border-radius: 3px;
            float: left;
            margin-right: -25px; 
            z-index: 10;
            @media (min-width:$zd-xs){
                display: none;
            }

            span{
                width: 60%;display: block;margin: 6px auto;
                height: 2px;background:#fff;
            }
        }

        .menu-list{
            transition:.3s;
            @media (max-width:$zd-xs){
                position: fixed;
                height: 100%;
                width: 40%;
                background: rgba(0, 0, 0, 0.89);
                top: 0;
                left: 100%;
                z-index: 9;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding-top: 85px;
                text-align: center;
            }

            li{
                float:left;margin-left: 60px;

                @media (max-width:$zd-sm){
                        float: left;
                        margin-left: 0;
                        width: 100%;
                        text-align: center;
                    &+li{
                        margin-top: 30px;
                    }
                }

                a{
                    font-size: 15px;transition:.3s;
                    color:#c1bebe;

                    &:hover{
                        color:#fff;
                    }
                }
            }
        }

        .left{
            left:60%;
        }
    }

    .logo{
        position:relative;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;text-align: center;
        margin: auto;
        height:160px;
        
    
        img{
            border-radius: 50%;
            max-width: 160px;

            @media (max-width:$zd-sm){
                display:none;
            }
        }
        p{
            margin-top:10px;letter-spacing: 3px;
            font-size: 14px;color:#fff;
            -webkit-animation:panimate .8s;

            @media (min-width:1400px){
                font-size:16px;
                margin-top:30px;
            }


            a{
                display: inline-block;color:#fff;
                text-decoration: underline;cursor: pointer;
            }

            @media (max-width:$zd-sm){
                position:absolute;
                bottom:73px;left:0;right:0;margin:auto;

                &+p{
                    margin-bottom:-20px;
                }
            }
        }

        &:before{
            position: absolute;content:''; transform: rotate(0deg);
            left:0;right: 0;margin:auto;
            width: 160px;height: 160px;border-radius:50%;box-shadow: 0 3px 0 #fff;
            -webkit-animation: nameimg 1s infinite linear;

            @media (max-width:$zd-sm){
                display:none;
            }
        }
    }
}

@-webkit-keyframes panimate{
    0%{
        margin-top:100px
    }
    100%{
        margin-top:20px;
    }
}
@-webkit-keyframes nameimg{
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform:rotateZ(360deg);
    }
}
</style>
