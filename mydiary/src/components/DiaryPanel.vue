<style scoped>
	.itemlist{
		position:relative;
		padding: 15px;
		overflow-y: scroll;
		height: 100%;
		z-index: 1;
	}
	.day_title{
		font-size: 50px; 
		line-height: 55px;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		font-weight: 500;
		color: #5e35b1;
		text-align: center;
		padding: 0px;
	}
</style>
<template>
	<div class="itemlist">
		<div v-for="item in indexTodos" >
			<mu-sub-header class="day_title">{{ item.month }}</mu-sub-header>
			<DiaryListComponents v-bind:todos="item.todos"></DiaryListComponents>
		</div>
		
		<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
		
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import DiaryListComponents from '../components/DiaryList.vue'
	export default {
		components: {
			DiaryListComponents
		},
		computed: mapState({
			indexTodos: state=>state.indexTodos,
			token: state => state.token,
			groupId: state=>state.groupId,
		}),
		data(){
    		return {
    			scroller: null,
    			loading: false
    		}
    	},
		mounted () {
		    this.scroller = this.$el;
		},
	    methods: {
		    loadMore () {
		      	this.loading = true
		      	//赋值
		      	var year=this.indexTodos[this.indexTodos.length-1].year
		      	var month=this.indexTodos[this.indexTodos.length-1].month-1  //上一个月
		      	this.upTodos(this.getBeforeMonth(year,month));
    		},
    		getBeforeMonth(year,month){
        		if(month>0){
        			return {year:year,month:--month}
        		}else{
        			return{
        				year:--year,
        				month:11
        			}
        		}
        	},
    		upTodos(data){
    			console.log(data.year);
    			console.log(data.month);
				this.$http.post("/api/indexData",data,{headers:{"token":this.token}}).then(res=>{
					if(res.data.msg!=""){
						this.$router.push({name:"Login"})
					}
					var result=res.data.data;
					if(!(result== undefined ||result=="")&&result.items.length>0&&result.items[0].todos.length>0){
						this.$store.commit('addIndexData',result.items[0]);
						this.loading = false
					}else{
						this.upTodos(this.getBeforeMonth(data.year,data.month))
					}

				},res=>{
					//查询服务器失败
					this.$router.push({name:"Login"})
				})
    		}
    	}	
	}
</script>