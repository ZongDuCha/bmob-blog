<template>
<div>
  <div class="top">
      <img src="../assets/logo-bj.jpg" alt="">

      <nav>
          <li><router-link to="">Home</router-link> </li>
          <li><router-link to="">GitHub</router-link> </li>
          <li><router-link to="">JueJin</router-link> </li>
          <li><router-link to="">About</router-link> </li>
      </nav>

      <div class="logo">
          <img src="../assets/logonameimg.png" alt="">
          <p>梦想还是要有的，万一实现了呢</p>
      </div>
      
  </div>

  <div class="tag">
      <li v-for="{list,index} in tagList" :key="index"><router-link to="">123</router-link></li>
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
            ]
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
        margin-top:40px;
    }
    a{
            margin: 5px 10px;transition:.3s;
            background: #ccc;
            padding: 10px 30px;
            border-radius: 3px;
    }
}
.top{
    width:100%;
    position: relative;

    nav{
        position: absolute;
        top: 20px;
        right: 50px;

        li{
            float:left;margin-left: 60px;

            a{
                font-size: 15px;transition:.3s;
                color:#c1bebe;

                &:hover{
                    color:#fff;
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
        }

        &:before{
            position: absolute;content:''; transform: rotate(0deg);
            width:160px;height:160px;border-radius:50%;box-shadow: 0 3px 0 #fff;
            -webkit-animation: nameimg 1.5s ease infinite;
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
