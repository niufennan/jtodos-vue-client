import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const state = {
	token:'',
	count: 1,
	createOrShowChildWindowShow: false,
	groupId:0,
	indexTodos:[
		{
			month:0,
			default:1,
			groupid:0,
			todos:[{
				createTime:new Date(),
				item:'',
				content:'',
				weather:0,
				mood:0,
				bookmark:0,
				groupId:0,
			}]
		}
	]
}

export default new Vuex.Store({
	state,
	mutations: {
		increment (state) {
			state.count++
		},
		close (state) {
			state.createOrShowChildWindowShow = false
		},
		open (state) {
			state.createOrShowChildWindowShow = true
		},
		setToken(state,token){
			state.token=token
		},
		setIndexData(state,indexTodos)
		{
			state.indexTodos=indexTodos;
		},
		setGroupId(state,groupid){
			state.groupId=groupid;  
		}
	}
})
