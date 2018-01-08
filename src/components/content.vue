<template>
  <div>
      <section class="news-list container">

        <div class="zd-md-12 news-item" v-for="(item,index) in list" :key="index">
            <router-link to="">{{item.attributes.title}}</router-link>
            <p>
                {{item.attributes.content.splice(500)}}
            </p>
            <div class="me-tag">
                <router-link :to="tag" v-for="(tag,index) in item.attributes.newTag" :key="index">{{tag}}</router-link>
            </div>
            <div class="news-time" v-if="item.createdAt"><span>发布时间：{{item.createdAt}}</span></div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'content',
    data(){
        return{
            list: ''
        }
    }, 
    mounted:function(){
        var _this = this
        var getlist
        Bmob.initialize('7150849514c91ed37625710a29c91139','243c886d51cc5d468ccef730afe00cba');
        var GameScore = Bmob.Object.extend('news');
        var query = new Bmob.Query(GameScore);
        // 查询所有数据
        query.find({
            success: function(results) {
                _this.list = results
                console.log(results)
            },
            error: function(error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    }
}
</script>

<style lang='scss'>
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
                display: inline-block;
                background:$color;font-size: 10px;
                color:#fff;padding:3px 10px;font-weight: 100px;
                border-radius: 2px;transition:.3s;
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
        >&+a{
            margin-top:40px;
        }
    }
}
</style>
