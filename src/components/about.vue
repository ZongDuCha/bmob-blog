<template>
  <div class="about">
      <div class="edit-about" @click="editShow = false;edit()">编辑</div>
      <div class="about-content" v-html="aboutContent" v-if="editShow">
          1
      </div>

     <div class="editSec"  v-show="!editShow">
         <div id="editorEleml" style="text-align:left" ></div>
         <span class="edit-suc" @click="setAboutCont();editShow = true">确定</span>
     </div>
  </div>
</template>

<script>
import { store,mapState } from 'vuex'
import E from 'wangeditor'
export default {
    name: 'about',
    data(){
        return{
            editShow: true,
            preCont: ''
        }
    },
    computed: {
        ...mapState([
            'aboutContent'
        ])
    },
    methods:{
        editAbout: function(){
            var editorl = new E('#editorEleml')
            editorl.customConfig.onchange = (html) => {
                this.preCont = html
            }
            editorl.create()
            editorl.txt.html(this.aboutContent)
        },
        // 确定
        setAboutCont: function(){
            var editorl = new E('#editorEleml')
            editorl.customConfig.onchange = (html) => {
                this.preCont = html
                console.log(1)
            }
            editorl.create()
            console.log(this.preCont)
            this.$store.dispatch('setAboutCont',this.preCont)
        },
        // 点击编辑
        edit: function(){
            console.log(this.aboutContent)
            var editorl = new E('#editorEleml')
            editorl.create()
            editorl.txt.html(this.aboutContent)
        }
    },
    watch:{
        aboutContent: function(){
            console.log(2)
            // this.preCont = this.aboutContent
        }
    },
    mounted(){
        this.$store.dispatch('getAboutCont')
        var editorl = new E('#editorEleml')
        editorl.customConfig.onchange = (html) => {
            this.preCont = html
            console.log(3)
        }
        editorl.create()
        editorl.txt.html(this.aboutContent)
    }
}
</script>

<style lang="scss">
.about{
     background:#fff;
    width:$zd-sm;padding:50px 15px;
    min-height:500px;    box-shadow: 0 0 15px #e6e6e6;
    margin: 20px auto;text-align:left;box-sizing:border-box;

    .edit-about{
        float: right;
        font-size: 14px;
        color: #5a5858;
        transition: .3s;
        z-index: 2;
        margin-top:-20px;
        margin-bottom: 15px;cursor: pointer;

        &:hover{
            color:#000;
        }
    }
    
    .edit-suc{
        @extend .edit-about;
        margin-top:10px;
    }
}
</style>
