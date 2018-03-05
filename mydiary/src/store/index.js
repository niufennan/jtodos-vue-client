import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const todos=[{
		createTime:new Date(),
		item:'',
		content:'',
		weather:0,
		mood:0,
		bookmark:0,
		groupId:0,
	}]
const state = {
	token:'',
	count: 1,
	createOrShowChildWindowShow: false,
	groupId:0,
	addressValue:"",
	indexTodos:[
		{
			month:-1,
			year:0,
			default:1,
			todos
		}
	],
	weatherBtn:false,
	locationBtn:true,
	todos
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
		//setIndexData(state,indexTodos)
		//{
		//	state.indexTodos=indexTodos;
		//},
		addIndexData(state,indexTodos)
		{
			if(state.indexTodos[0].month==-1){
				state.indexTodos=[indexTodos];
			}
			else{
				var temp=state.indexTodos
				temp.push(indexTodos);
				state.indexTodos=temp;
			}
		},
		setGroupId(state,groupid){
			state.groupId=groupid;  
		},
		setWeatherIsShow(state,isShow){
			state.weatherBtn=isShow;
		},
		setTodos(state,todos){
			state.todos=todos;
		}

	}
})
