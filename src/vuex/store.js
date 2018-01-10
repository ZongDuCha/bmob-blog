import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // login 状态
    err: true,
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
        var GameScore = Bmob.Object.extend('user_name');
        var query = new Bmob.Query(GameScore);
        query.equalTo('name',type.inUser)
        type.inPassword ? query.equalTo('password',type.inPassword) : ''
        query.find({
            success: function(results) {
              if(results.length > 0 && type.inUser != undefined){
                state.err = true
              }else{
                type.inPassword ? console.log(1) : state.err = false
              }
            },
            error: function(error) {
                type.inPassword ? console.log(1) : state.err = false
            }
          });
    },
    // login 注册 （添加单条数据
    sigUp:(state,type) => {
        
        if(!state.err){
            var Diary = Bmob.Object.extend("user_name");
            var diary = new Diary();
            diary.set("name",type.upUser)
            diary.set("password",type.upPass)
            diary.save(null, {
                success: function(result) {
                    console.log("日记创建成功, objectId:"+result.id);
                },
                error: function(result, error) {
                    console.log('创建日记失败');
                }
            });
        }
        
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
    sigUp: ({commit},type) => {
        commit('login')
        commit('sigUp',type)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})