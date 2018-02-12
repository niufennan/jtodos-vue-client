import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	token:'',
	count: 1,
	createOrShowChildWindowShow: false,
	groupId:0,
	addressValue:"",
	indexTodos:[
		{
			month:0,
			default:1,
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
	],
	weatherBtn:false,
	locationBtn:true
}

export default new Vuex.Store({
	state,
	mutations: {
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
		},
		setWeatherIsShow(state,isShow){
			state.weatherBtn=isShow;
		}
	}
})
