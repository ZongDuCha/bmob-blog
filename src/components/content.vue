<template>
<div class="container-fluid">
  <div class="container">
        <div class="tag">
            <li v-for="(list,index) in tagList" :key="index">
                <span 
                    :class="className == list.tagName ? 'active' : ''" 
                    @click="getlist=0;className = list.tagName;getcontent();">
                        {{list.tagName}}
                </span>
            </li>
        </div>

      <section class="news-list container">

        <div class="zd-md-12 news-item" v-for="(item,index) in getCont" :key="index">
            <router-link to="">{{item.attributes.title}}</router-link>
            <p>
                {{item.attributes.content}}
            </p>
            <div class="me-tag">
                <a @click="className = tag;getcontent();" v-for="(tag,index) in item.attributes.newTag" :key="index">{{tag}}</a>
            </div>
            <div class="news-time" v-if="item.createdAt"><span>发布时间：{{item.createdAt}}</span></div>

            <div class="operation">
                <i class="fa fa-trash faa-wrench animated-hover" alt="删除" title="删除"></i>
                <i class="fa fa-wpforms faa-wrench animated-hover"  alt="删除" title="删除"></i>
            </div>
        </div>
    </section>
    <div class="loading">
        <div v-if="loading">
            <i v-if="loginBJ" 
                class="fa fa-spinner faa-spin animated"></i> 
                数据加载中.....
        </div>
        <div v-if="!loading">暂无数据</div>
    </div>
  </div>

<!-- 显示文章组件 -->
<NewsDetail/>
</div>
</template>

<script>
import stroe from 'vuex'
import NProgress from 'nprogress'
import { mapState,mapActions} from 'vuex'
import NewsDetail from './newsDetail'
export default {
    data(){
        return{
            className: '全部',
            loading: false,
            getlist: 1,
            tagList:[
                {
                    tagName: '全部'
                },
                {
                    tagName: 'JavaScript'
                },
                {
                    tagName: 'Webpack'
                },
                {
                    tagName: 'Sass'
                },
                {
                    tagName: 'Nodejs'
                },
                {
                    tagName: 'Vue'
                }
            ],
        }
    },
    components:{ NewsDetail },
    methods:{
        ...mapActions([
            'getallState'
        ])
    },
    computed:{
        ...mapState([
            'getCont',
            'loginBJ'
        ])
    },
    methods:{
        getcontent:function(){
            this.getlist++
            this.loading = true
            NProgress.start();
            this.$store.dispatch('getallState',{
                getlist:this.getlist,
                tabName:'news',
                className:this.className
            }).then(res => {
                setInterval(()=>{this.loading=false},1000)
                NProgress.done()
            })
        }
    },
    mounted:function(){
        // 滚动加载数据
        window.addEventListener('scroll',() => {
            // 滚动条滚动 的 距离
            let bodyTop = document.documentElement.scrollTop
            // 窗口 可视高度
            let winHeight = window.innerHeight
            // 整个文档 的高度
            let bodyCiHeight = document.body.clientHeight

            if(bodyTop + winHeight >= bodyCiHeight-50) this.getcontent()
        });
    },
    created(){
        NProgress.start();
        this.$store.dispatch('getallState',{
            getlist:this.getlist,
            tabName:'news',
            className:this.className
        })
        NProgress.done()
    }
}
</script>

<style lang='scss'>
.tag{
    color:#000;margin:10px 0;
    text-align: center;

    li{
        display:inline-block;
        margin-top:5px;cursor:pointer;
    }
    span{
        margin: 5px 10px;
        -webkit-transition: .3s;
        transition: .3s;
        background: #fff;
        padding: 10px 30px;
        border-radius: 3px;
        font-size: 13px;
        color: $color;
        transition: .5s;
        margin: 10px;
        display: inline-block;

        &:hover{
            background:$color;
            color:#fff;
        }
    }
    .active{
        @extend span:hover;
    }
}
.loading{
    width:100%;margin-bottom:0;
    padding: 10px 0;background:#fff;
    font-size: 13px;
}
.news-list{
    text-align:left;

    .news-item{
        margin-bottom:60px;
        background:#fff;
        box-shadow:border;transition:.2s;
        padding:10px;padding-left:20px;
        border-radius: 5px;
        box-shadow: 0 0px 3px #ccc;

        &:hover{
            box-shadow: 0 0px 20px rgba(29, 109, 226, 0.25);
        }

        a{
            font-size: 25px;font-weight: 100;
            color:$color;transition:.3s;

            &:hover{
                color:#1557b7;
            }
        }

        p{
            font-size: 13px;
            color:#868181;
            margin-top: 15px;
            margin-bottom: 10px;
        }
        .me-tag{
            display:inline-block;
            a{
                display: inline-block;cursor: pointer;
                background:$color;font-size: 10px;
                color:#fff;padding:3px 10px;font-weight: 100px;
                border-radius: 2px;transition:.3s;    margin-right: 10px;
                &:hover{
                    background:#438af3;
                }
            }
        }
        .news-time{
            display:inline-block;
            @media (min-width:$zd-sm){
                margin-left: 15px;
            } 

            span{
                display: inline-block;
                background:#e6c441;font-size: 10px;
                color:#fff;padding:3px 10px;font-weight: 100px;
                border-radius: 2px;transition:.3s;
            }
        }
        .operation{
            display: inline;
            i{
                    font-size: 22px;
                    color: rgb(111, 122, 169);
                    float: right;
                    cursor: pointer;
                    margin-left: 20px;
            }
        }
        >&+a{
            margin-top:40px;
        }
    }
}
</style>
