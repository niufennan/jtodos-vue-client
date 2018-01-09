<style scoped>
	#main{
		  position: relative;
		  width: 100%;
		  height: 100%;
		  background: #fff;
	}
	.background{
	  width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;opacity: 0.5;overflow: hidden;z-index: 0;
	}
	
	.tabtitle{
		background: #fff;
		padding-right: 30px;
		padding-left: 30px;
	}

	.tabtitle .tab{
		color: #5e35b1;
		border: 2px solid #5e35b1;
		border-width: 2px 0px;
		padding: 2px;
		margin-top: 20px;
		margin-bottom: 20px;
		min-height: 30px;
		font-weight: bold;
	}
	.tabtitle .tab-active{
		color: #fff;
		background: #5e35b1;
		border: 2px solid #5e35b1;
		border-width: 2px 0px;
		padding: 2px;
		margin-top: 20px;
		margin-bottom: 20px;
		min-height: 30px;
		font-weight: bold;
	}
	
	.tabtitle .left-tab{
		border-radius: 10px 0px 0px 10px;
		border: 2px solid #5e35b1;
		margin:0px;
		margin-left: 5px;
	}
	.tabtitle .right-tab{
		border-radius: 0px 10px 10px 0px;
		border: 2px solid #5e35b1;
		margin-right: 5px;
	}
	.bottomNav{
		position: absolute;
		bottom: 0px;
		background: #fff;
		color: #757575;
	}
	
	.navItemClass{
		width:33%;
	}
</style>
<style>
	.iconclass{
		color: #757575;
	}
	.editDialogClass{
		width: 95%;
		height: 80%;
		border-radius: 10px;
		background: #6fc2f3;
	}
	.editDialogBodyClass{
		padding: 5px;
	}

	.clr{
		clear: both;	
	}
	.lineClass{
		display: none;
	}
</style>
<template>
	<div id="main">
		<img src="../assets/bg.png" class="background">
		<div class="head">
			<mu-tabs class="tabtitle" :value="indexTab" lineClass="lineClass"  v-on:change="tabChange">
			    <mu-tab value="tab1" :class="tab1Class" class="left-tab" title="点滴" />
			    <mu-tab value="tab2" :class="tab2Class" title="日历" />
			    <mu-tab value="tab3" :class="tab3Class" class="right-tab" title="记录" />
			</mu-tabs>
		</div>
		<div id="contentPanel">
			<transition   name="custom-classes-transition"
		    enter-active-class="animated bounceInLeft"
		    leave-active-class="animated fadeOut"
		    :duration="{ enter: 700, leave: 200 }"
		    >
				<component v-bind:is="currentView">
				</component>
			</transition>
		</div>
		<div class="foot">
			<mu-bottom-nav class="bottomNav"  shift v-on:change="navChange">
			    <mu-bottom-nav-item value="edit" title="" class="navItemClass" iconClass="iconclass" activeClass="iconclass" icon="edit"/>
			    <mu-bottom-nav-item value="photo" title=""  class="navItemClass" style="width:34%" iconClass="iconclass" activeClass="iconclass" icon="local_see"/>
			    <div class="navItemClass"  >{{ itemnumber }}篇日记</div>
			</mu-bottom-nav>
		</div>
		<mu-dialog :open="isOpen" title="" bodyClass="editDialogBodyClass" dialogClass="editDialogClass">
		    <CreateOrShowDiaryItem></CreateOrShowDiaryItem>
		</mu-dialog>
	</div>
</template>
<script>
	import DiaryPanelComponents from '../components/DiaryPanel.vue'
	import CalendarComponents from '../components/Calendar.vue'
	import CreateOrShowDiaryItem from '../components/CreateOrShowDiaryItem.vue'
	import MineComponents from '../components/Mine.vue'
	import { mapState } from 'vuex'

    export default {
    	//1 根据用户名查询日记列表
    	//2 日记列表default
    	//3 查询default的日记list
		components:{
	     	DiaryPanelComponents,
	     	CalendarComponents,
	     	CreateOrShowDiaryItem,
	     	MineComponents
     	},
     	computed: mapState({
			isOpen: state => state.createOrShowChildWindowShow,
			token: state => state.token,
			groupId: state=>state.groupId,
			items:state=>state.indexTodos
		}),
    	data () {
            return {
            	currentView:'DiaryPanelComponents',
                itemnumber:1,
                indexTab:"tab1",
               	tab1Class:"tab-active",
               	tab2Class:"tab",
               	tab3Class:"tab",
            }
        },
        created(){
			this.refresh()
        },
        methods: {
        	refresh:function(event){
        		var data={
    				month:(new Date()).getMonth()+1
    			}
				this.$http.post("/api/index",data,{headers:{"token":this.token}}).then(res=>{
					if(res.data.msg!=""){
						this.$router.push({name:"Login"})
					}

					var result=res.data.data;
					if(!(result== undefined ||result=="")){
						this.$store.commit('setIndexData',result.items);
						this.$store.commit('setGroupId',result.items[0].todos[0].groupId);
						this.itemnumber=result.itemnumber;
					}
				},res=>{

				})
        	},
        	navChange:function(event){
        		if(event=='edit'){
        			this.$store.commit('open')
        		}else if(event=='photo'){

        		}
			},
			tabChange:function(event){
				this.indexTab = event
				for (var i = 1;i<=3;i++){
					this['tab' + i + 'Class'] = 'tab'
				}
				this[event + 'Class'] = 'tab-active'
				var componentName = ''
				switch (event) {
					case 'tab1':
					componentName = 'DiaryPanelComponents'
					break
					case 'tab2':
					componentName = 'CalendarComponents'
					break
					case 'tab3':
					componentName = 'MineComponents'
					break
				}
				this.currentView = componentName
			}
		}
	}
</script>
