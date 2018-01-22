<template>
  <div class="news" :class="newShow ? 'animate' : ''"
        @click.stop="newClose($event)">

    <div class="news-container">
        <i class="fa fa-close fa-2x" @click="newClose($event)"></i>
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

            <li @click="addNewGood">
                <i class="fa fa-thumbs-o-up"></i>
                <span>{{newGood || 0}}</span>
            </li>

            <li>
                <i class="fa fa-commenting-o"></i>
                <span>{{newComment.length || '0'}}</span>
            </li>
        </div>


        <div class="overy">
            <section>
            {{newConent}}123123123123
            </section>

            <!-- 评论 -->
            <div class="new-comments">
                <p>评论({{newComment.length || '0'}})</p>
            </div>

            <div class="comment-content">
                <li v-for="(item,index) in newComment" v-if="newComment" :key="index">
                    <div class="comment-operation">
                        <div class="comment-name">{{item.name}}</div>
                        <div class="comment-time">发表时间：{{item.time}}</div>
                    </div>

                    <div class="comment-content" v-html="item.content" v-if="item.content"></div>
                </li>

                <div class="comment-err" v-if="!newComment">
                    (空)
                </div>
            </div>
        </div>

        

        <div class="comment">
            <input type="text" @keyup.enter="setComment($event)" ref="comment">
            <button @click="setComment($event)"><i class="fa fa-paper-plane fa-2x"></i>评论</button>
        </div>
    </div>
  </div>
</template>

<script>
import { store,mapState} from 'vuex'
export default {
    name: 'NewDetail',
    computed:{
        ...mapState([
            'newShow',
            'newTitle',
            'newConent',
            'newComment',
            'newTime',
            'newTag',
            'newGood'
        ])
    },
    methods: {
        newClose: function(e){
             if(e.target.className != 'news animate' && e.target.className != 'fa fa-close fa-2x') return
            this.$store.commit('newClose')
        },
        setComment: function(e){
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth()+1
            var day = date.getDate()
            var hours = date.getHours()
            var mins = date.getMinutes()
            var sec = date.getSeconds()
            var dqDate = year+'-'+month+'-'+day+" "+hours+':'+mins+':'+sec
            this.$store.dispatch('setComment',[this.$refs.comment.value,dqDate])
            this.$refs.comment.value = ''
        },
        addNewGood: function(){
            this.$store.dispatch('addNewGood')
        }
    }
}
</script>

<style lang="scss">

.news{
    position: relative;transition:.1s;
    position: fixed;bottom:0;left:0;right:0;margin:auto;
    width:0%;height:0%;opacity: 0;
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

        .operation{
            margin-top:5px;
            @media (min-width:$zd-xs){
                position: absolute;
                right: 15px;top:60px;
            }

            li{
                float: left;
                margin-left: 30px;
            }

            *{
                font-size:18px;

                @media (max-width:1400px){
                    font-size: 16px;
                }
            }
        }

        .overy{
                height: 81%;
                overflow-y: scroll;
                margin-top: 50px;
        }

        section{
            text-align: left;

            @media (max-width:$zd-xs){
                margin-top:10px;
            }
        }

        .comment{
            position:absolute;
            bottom:0;left:0;display: flex;
            width:100%;height:55px;
            box-sizing:border-box;padding:10px 30px;

            @media (max-width:$zd-xs){
                padding: 10px 20px;
            }

            input{
                height:100%;border-radius: 5px;box-sizing:border-box;
                border:1px solid #ccc;    font-size: 16px;
                transition:.5s;outline:none;padding:10px;
                width:80%;flex:10;color:$color;
                &:focus{
                    border:1px solid rgba(86, 147, 238, 0.79);;
                    box-shadow: 0 0 4px rgba(86, 147, 238, 0.79);
                }
            }

            button{
                flex:1;margin-left:20px;border-radius: 5px;border:1px solid rgba(86, 147, 238, 0.79);
                background:rgb(249, 248, 248);height:100%;
                cursor:pointer;transition:.3s;color:$color;

                i{
                    color:$color;
                    font-size: 14px;
                    margin-right: 10px;
                }

                @media (max-width:$zd-xs){
                    flex:3;
                }

                &:hover{
                    background:#fff;
                }
            }
        }

        .new-comments{
            text-align:left;margin-top:30px;
            border-bottom:1px solid $color;

            p{
                color:$color;font-weight: 900;
            }
        }

        .comment-content{
            text-align:left;

            li{
                margin:10px 0;width:100%;
                border-bottom:1px dotted #ccc;padding-bottom:20px;

                .comment-name,.comment-time{
                    display:inline-block;
                    margin-right:10px;
                    font-weight: 900;color:$color;
                    font-size:15px;
                }

                .comment-time{
                    font-size: 13px;
                    @media (min-width:$zd-xs){
                        float: right;
                    }
                }

                .comment-content{
                    margin-top:5px;
                    font-size: 15px;
                }
            }
        }
    }
}
.animate{
    width:100%;height:100%;opacity:1 !important;
}
</style>
