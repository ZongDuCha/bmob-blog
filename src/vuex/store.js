import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // login 状态
    err: true,
    inputStats: false,
    loginBJ: true,
    // -- 首页文章条目 
    getCont: ''
}

const mutations = {
    login: () => {
        Bmob.initialize('17150849514c91ed37625710a29c91139','243c886d51cc5d468ccef730afe00cba');
    },
    // 首页文章 （查询所有数据）
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
    // login登录 (查询单条数据)
    inStats:(state,type) => {
        state.inputStats = 1123;
        var GameScore = Bmob.Object.extend('user_name');
        var query = new Bmob.Query(GameScore);
        // 值存在就执行条件
        type.inUser ? query.equalTo('name',type.inUser) : ''
        type.inPassword ? query.equalTo('password',type.inPassword) : ''

        query.find({
            success: function(results) {
                console.log(results)
                // 登录 判断 用户名存在 和 登录成功
              if(type.inUser != undefined && results.length > 0){
                results[0].attributes.name == type.inUser ? state.err = true : ''
                results[0].attributes.password == type.inPassword ? state.loginBJ = false : ''

              }else{
                  // 判断是否有 添加密码
                  !type.inPassword ? state.err = false : console.log('no')
              }
            },
            error: function(error) {
                type.inPassword ? console.log(1) : state.err = false
            }
          });
    },
    // login 注册 （添加单条数据
    signUp:(state,type) => {
        if(type){
            var Diary = Bmob.Object.extend("user_name");
            var diary = new Diary();
            diary.set("name",type.upUser)
            diary.set("password",type.upPass)
            diary.save(null, {
                success: function(result) {
                    console.log(result.id)
                    if(result.id && type.upUser && type.upPass){
                        state.inputStats = state.err = true;console.log("创建成功")
                    }else{
                        console.log('失败');
                    }
                },
                error: function(result, error) {
                    state.inputStats = true
                    console.log('创建日记失败');
                }
            });
        }
        
    },
    errState:(state) => {
        state.err = true
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
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})