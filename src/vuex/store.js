import Vue from 'vue'
import Vuex from 'vuex'
import NProgress from 'nprogress'

Vue.use(Vuex)

const state = {
    // message 数据
    mesState: '',
    mesTitle: '',
    /*
        newID           文章ID
        newDetail       数据状态
        @newShow        组件显示
        @newTitle       文章标题
        @newConent      文章内容
        @newComment     文章评论
        @newTime        文章发表时间
        @newTag         文章分类
    */
    newID : '',
    newShow : false,
    newTitle: '',
    newContent: '',
    newComment: '',
    newTime: '',
    newTag: '',
    /**
     *  newModID           编辑文章ID
     *  newModTitle        编辑文章标题
     *  newModContent      编辑文章内容
     */
    newModId : '',
    newModShow : false,
    newModTitle : '',
    newModContent : '',
    // login 状态
    err: true,
    loginBJ: false,
    // -- content 首页文章条目 
    getCont: ''
}

const mutations = {
    // app 判断是否有值
    local:(state) => {
        localStorage.getItem('name') ? state.loginBJ = true : state.loginBJ = false
    },
    // content 退出清除localStorage 并刷新
    cleanlocal: (state) => {
        NProgress.start()
        localStorage.removeItem('name')
        location.reload(false)
        NProgress.done()
    },
    login: () => {
        Bmob.initialize('17150849514c91ed37625710a29c91139','243c886d51cc5d468ccef730afe00cba');
    },
    // content 首页文章 （查询所有数据）
    getallState : (state,type) => {
        var GameScore = Bmob.Object.extend(type.tabName);
        var query = new Bmob.Query(GameScore);
        type.getlist ? query.limit(6*type.getlist) : ''
        type.className != '全部' ? query.equalTo('newTag',type.className) : ''
        query.find({
            success: results => {
                state.getCont = results
            },
            error: error => {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },
    // login 登录 (查询单条数据)
    inStats:(state,type) => {
        state.mesState = state.mesTitle = ''
        var GameScore = Bmob.Object.extend('user_name');
        var query = new Bmob.Query(GameScore);
        // 值存在就执行条件
        type.inUser ? query.equalTo('name',type.inUser) : ''
        type.inPassword ? query.equalTo('password',type.inPassword) : ''
        query.find({
            success: function(results) {
                // 登录 判断 用户名存在 和 登录成功
              if(type.inUser != undefined && results.length > 0){
                results[0].attributes.name == type.inUser ? state.err = true : ''
                if(results[0].attributes.password == type.inPassword){
                    NProgress.start()
                    state.loginBJ = true
                    state.mesState = 'suc'
                    localStorage.setItem('name',results[0].attributes.name)
                    state.mesTitle = `${results[0].attributes.name} , 欢迎您!`
                    NProgress.done()
                }
              }else{
                  // login 判断是否有 添加密码
                  type.inPassword ? (state.mesState='err',state.mesTitle = '登录失败') : state.err = false
              }
            },
            error: function(error) {
                type.inPassword ? (state.mesState='err',state.mesTitle = '登录失败') : state.err = false
            }
          });
    },
    // login 注册 （添加单条数据)
    signUp:(state,type) => {
        if(type){
            state.mesState = state.mesTitle = ''
            var Diary = Bmob.Object.extend("user_name");
            var diary = new Diary();
            diary.set("name",type.upUser)
            diary.set("password",type.upPass)
            diary.save(null, {
                success: function(result) {
                    if(result.id && type.upUser && type.upPass){
                        NProgress.start()
                        state.mesState='suc',state.mesTitle = '注册成功'
                        console.log("创建成功")
                        NProgress.done()
                    }else{
                        state.mesState='err',state.mesTitle = '注册失败'
                        console.log('失败');
                    }
                },
                error: function(result, error) {
                    state.mesState='err',state.mesTitle = '注册失败'
                    console.log('创建日记失败');
                }
            });
        }
    },
    // login 随便看看
    skip: (state) => {
        state.loginBJ = true
    },
    // login 重置 err状态
    errState:(state) => {
        state.err = true
    },
    getNews: (state,type) => {
        /*
            newID           文章ID
            newDetail       数据状态
            @newShow        组件显示
            @newTitle       文章标题
            @newConent      文章内容
            @newComment     文章评论
            @newTime      文章发表时间
            @newTag         文章分类
        */
            var news = Bmob.Object.extend("news");
            var query = new Bmob.Query(news);
            query.get(type, {
            success: function(result) {
                state.newShow = true
                state.newID = result.id;
                state.newTitle = result.get("title");
                state.newComent = result.get("content");
                state.newComment = result.get("comment");
                state.newTime = result.createdAt;
                state.newTag = result.get('newTag');
                console.log(result.get('newTag'));
            },
            error: function(object, error) {
                state.mesState = 'err',state.mesTitle = '获取失败'
                state.newShow = false,console.log('获取失败')
            }
        });
    },
    // newsDetail 评论
    setComment: (state,type) => {
        state.mesState = state.mesTitle =  ' ';
        if (!type[0]) alert('不能为空');
        if (state.loginBJ) state.mesState = 'err';state.mesTitle="未登录";state.loginBJ = true;setInterval(function(){location.reload(false);},2000);return;
        if (!state.newID) state.mesState = 'err',state.mesTitle="评论失败";return;
        
        var Diary = Bmob.Object.extend("news");
        var query = new Bmob.Query(Diary);
        query.get(state.newID, {
            success: function(result) {
                var obj  = {
                    "name": localStorage.getItem('name'),
                    "time": type[1],
                    "content": type[0]
                }
                result.addUnique('comment', obj);
                result.save();
                if(result) state.mesState = 'suc';state.mesTitle = '评论成功'
            },
            error: function(object, error) {
                state.mesState = 'err',state.mesTitle="评论失败";
            }
        });
    },
    //  关闭显示文章组件
    newClose: (state) => {
        state.newShow = false
    },
    editMod: (state,type) => {
        state.mesState = state.mesTitle = ' ';
        var Diary = Bmob.Object.extend("news");
        var query = new Bmob.Query(Diary);
        query.get('fqTdDDDU', {
            success: function(result) {
                result.set('title', type[0]);
                result.set('content', type[1]);
                result.save();
                state.mesState= 'suc';state.mesTitle = 'ok'
            },
            error: function(object, error) {
                state.mesState='err';state.mesTitle='错误'
            }
        });
    },
    newModClose: (state) => {
        state.newModShow = true
    }
}

const actions = {
    getallState : ({commit},type) => {
        commit('login')
        commit('getallState',type)
    },
    inStats: ({commit},type) => {
        commit('login')
        commit('inStats',type)
    },
    signUp: ({commit},type) => {
        commit('login')
        commit('signUp',type)
    },
    // 获取文章信息
    getNews: ({commit},type) => {
        commit('login')
        commit('getNews',type)
    },
    setComment: ({commit},type) => {
        commit('setComment',type)
    },
    // 编辑文章
    editMod: ({commit},type) => {
        commit('login')
        commit('editMod',type)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})