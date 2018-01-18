<template>
  <div class="newsModify" :class="newModShow ? 'newsModify-animate' : ''" @click="newModClose($event)">
      <div class="news-mod">
        <i class="fa fa-close fa-2x" @click="newModClose($event)"></i>
          <div class="news-title">
            <img src="../assets/logonameimg.png" alt="">
            <h2>你猜</h2>
        </div>
          
          <div class="opacmod">
            <input type="text" placeholder="标题" ref="modTitle" v-model="newModTitle">
            <div id="editorElem" style="text-align:left"></div>
            <div class="operation">
                <button @click="delContent">清空内容</button>
                <button @click="setContent">确定修改</button>
            </div>
          </div>
          {{newModTitle}}
          {{newModContent}}
      </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { store,mapState } from 'vuex'
export default {
    name: 'NewsModify',
    data () {
      return {
        editorContent: '',
        loadText: '<h1>123</h1>',
      }
    },
    computed:{
      ...mapState([
        'newModShow',
        'newModTitle',
        'newModContent'
      ])
    },
    methods: {
      // 关闭显示
      newModClose: function(e){
          if(e.target.className != 'newsModify newsModify-animate' && e.target.className != 'fa fa-close fa-2x') return
          this.$store.commit('newModClose')
      },
      // 发送
      setContent: function () { 
          this.$store.dispatch('editMod',[this.$refs.modTitle.value,this.editorContent])
          var editor = new E('#editorElem')
          editor.customConfig.onchange = (html) => {
            this.editorContent = html
          }
          editor.create()
          editor.txt.html(this.editorContent = this.loadText = '')
          this.$refs.modTitle.value = ''
      },
      // 清空
      delContent: function () {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
        editor.txt.html(this.editorContent = this.loadText = '')
      }
    },
    // 监听属性的变化
    watch:{
      newModContent(){
        var editor = new E('#editorElem')
        editor.create()
        editor.txt.html(this.editorContent = this.loadText = this.newModContent)
      },
      deep:true
    },
    // 初始化
    mounted() {
      var editor = new E('#editorElem')
      editor.create()
      editor.txt.html(this.editorContent = this.loadText = this.newModContent)
      this.$refs.modTitle.value = this.newModTitle
    }
}
</script>

<style lang="scss">
.newsModify{
    position: relative;transition:.4s;
    position: fixed;bottom:0;left:0;right:0;margin:auto;
    width:0%;height:0%;opacity: 0;
    background:rgba(23, 21, 21, 0.74);

    .news-mod{
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

        .news-title{
            width:100%;
            text-align:left;
            border-bottom: 1px solid #dedcdc;

            img{
                float: left;
                border-radius: 50%;
                max-height: 1.7rem;
                margin-right: 10px;
                border: 1px solid #ddd;
            }

            h2{
                font-size:20px;
                width: 90%;
            }
        }
    }
}

.newsModify-animate{
    width:100%;height:100%;opacity:1 !important;
}

.opacmod{
  margin-top:30px;

  input{
    border-radius: 5px;
    border:1px solid #ccc;    font-size: 16px;
    transition:.5s;outline:none;height:40px;
    width:100%;flex:10;color:$color;margin-bottom:10px;
    padding:10px;box-sizing:border-box;

    &:focus{
        border:1px solid rgba(86, 147, 238, 0.79);;
        box-shadow: 0 0 4px rgba(86, 147, 238, 0.79);
    }
  }
}
.operation{
  text-align:right;
  margin-top:5px;

  button{
      padding: 7px 20px;
      border-radius: 5px;margin-left:20px;
      border: 1px solid $color;
      background: $color;cursor:pointer;
      color: #fff !important;transition:.5s;

      &:hover{
        background:#fff;
        color:$color !important;
      }
  }
}
</style>
