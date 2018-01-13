<template>
  <div class="news" :class="newShow ? 'animate' : ''">
    <div class="news-container">
        <i class="fa fa-close fa-2x"></i>
        <div class="news-title">
            <img src="../assets/logonameimg.png" alt="">
            <h2>{{newTitle}}</h2>
        </div>

        <div class="operation">
            <li>
                <i class="fa fa-tags"></i>
                <span v-for="(item,index) in newTag" :key="index">{{item}}</span>
            </li>
            <li>
                <i class="fa fa-calendar"></i>
                <span>{{newTime}}</span>
            </li>
            <li>
                <i class="fa fa-eye"></i>
                <span>1</span>
            </li>

            <li>
                <i class="fa fa-thumbs-o-up"></i>
                <span>1</span>
            </li>

            <li>
                <i class="fa fa-commenting-o"></i>
                <span>{{newComment.length}}</span>
            </li>
        </div>


        <section>
            {{newConent}}
        </section>

        <!-- 评论 -->

        <div class="comment">
            <input type="text">
            <button>评论</button>
        </div>
    </div>
  </div>
</template>

<script>
import { store,mapState} from 'vuex'
export default {
    name: 'NewDetail',
    created:function(){
        this.$store.dispatch('getNews')
    },
    computed:{
        ...mapState([
            'newShow',
            'newTitle',
            'newConent',
            'newComment',
            'newTime',
            'newTag'
        ])
    }
}
</script>

<style lang="scss">
.animate{
    width:100%;height:100%;
    animation: show 1s;
    animation-delay: 1s;
}
.news{
    position: relative;transition:.5s;
    position: fixed;top: 0;bottom:0;left:0;right:0;margin:auto;
    width:100%;height:100%;display:block;
    background:rgba(23, 21, 21, 0.74);

    .news-container{
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
        width:50%;height:80%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3607843137254902);

        *{
            color:#353535;
        }

        .fa-close{
            cursor: pointer;
            transition:.3s;
            position: absolute;
            right: 15px;
            top: 10px;color:rgb(73, 73, 73);
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
            }
        }

        .operation{
            position: absolute;
            right: 15px;top:60px;

            li{
                float: left;
                margin-left: 30px;
            }

            *{
                font-size:18px;
            }
        }

        section{
            margin-top: 40px;
            text-align: left;
        }

        .comment{
            position:absolute;
            bottom:0;left:0;display: flex;
            width:100%;height:55px;
            box-sizing:border-box;padding:10px 30px;

            input{
                height:100%;border-radius: 5px;
                border:1px solid #ccc;    font-size: 16px;
                transition:.5s;outline:none;
                width:80%;flex:10;color:$color;
                &:focus{
                    border:1px solid rgba(86, 147, 238, 0.79);;
                    box-shadow: 0 0 4px rgba(86, 147, 238, 0.79);
                }
            }

            button{
                flex:1;margin-left:20px;border-radius: 5px;border:1px solid rgba(86, 147, 238, 0.79);
                background:rgb(249, 248, 248);height:100%;cursor:pointer;transition:.3s;color:$color;

                &:hover{
                    background:#fff;
                }
            }
        }
    }
}
@keyframes show{
    0%{
        width:0;height:0;display:none;
    }
    100%{
        width:100%;height:100%;display:block;
    }
}
</style>
