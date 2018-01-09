import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // -- 首页文章条目 
    getCont: ''
}

const mutations = {
    login: () => {
        Bmob.initialize('17150849514c91ed37625710a29c91139','243c886d51cc5d468ccef730afe00cba');
    },
    getallState : (state,type) => {
        var GameScore = Bmob.Object.extend(type.tabName);
        var query = new Bmob.Query(GameScore);
        query.limit(6*type.getlist)
        type.className != '全部' ? query.equalTo('newTag',type.className) : ''
        console.log(type.className != '全部')
        // 查询所有数据
        query.find({
            success: results => {
                state.getCont = results
            },
            error: error => {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    }
}

const actions = {
    getallState : ({commit},type) => {
        commit('login')
        commit('getallState',type)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})