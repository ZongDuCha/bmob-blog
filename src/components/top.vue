<template>
<div>
  <div class="top">
      <img src="../assets/logo-bj.jpg" alt="">

      <nav>
          <div class="menu">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div class="menu-list">
                <li><router-link to="">Home</router-link> </li>
                <li><router-link to="">GitHub</router-link> </li>
                <li><router-link to="">JueJin</router-link> </li>
                <li><router-link to="">About</router-link> </li>
          </div>
      </nav>

      <div class="logo">
          <img src="../assets/logonameimg.png" alt="">
          <p>梦想还是要有的，万一实现了呢</p>
      </div>
      
  </div>

  <div class="tag">
      <li v-for="(list,index) in tagList" :key="index"><router-link :to="list.to">{{list.tagName}}</router-link></li>
  </div>
</div>
</template>

<script>
export default {
    name: 'top',
    data(){
        return{
            tagList:[
                {
                    tagName: 'JavaScript',
                    to: '/javascript'
                },
                {
                    tagName: 'Webpack',
                    to: '/webpack'
                },
                {
                    tagName: 'Sass',
                    to: '/sass'
                },
                {
                    tagName: 'Nodejs',
                    to: '/Node'
                },
                {
                    tagName: 'Vue',
                    to: '/vue'
                }
            ],
            left: 'left'
        }
    }
}
</script>

<style lang='scss'>
.tag{
    color:#000;
    text-align: center;

    li{
        display:inline-block;
        margin-top:20px;
    }
    a{
        margin: 5px 10px;
        -webkit-transition: .3s;
        transition: .3s;
        background: #f5efef;
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
    position: relative;

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
    }

    .logo{
        position:relative;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height:160px;
    
        img{
            border-radius: 50%;
            width: 160px;
        }
        p{
            margin-top:20px;letter-spacing: 3px;
            font-size: 14px;color:#fff;
        }

        &:before{
            position: absolute;content:''; transform: rotate(0deg);
            left:0;right: 0;margin:auto;
            width:160px;height:160px;border-radius:50%;box-shadow: 0 3px 0 #fff;
            -webkit-animation: nameimg 1s infinite linear;
        }
    }
}

@-webkit-keyframes nameimg{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
</style>
