<style scoped>
	.calender{
		background: #fff;
		position: fixed;
		width: 100%;
		color: #5e35b1;
		padding-top: 10px;
		padding-bottom: 20px;
	}
	.calender .month{
		font-size: 20px;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		font-weight: 700;
	}
	.calender .day{
		font-size: 150px; 
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		font-weight: 100;
		padding: 0px;
		line-height: 150px;
	}
	.calender .week{
		font-size: 20px; 
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		font-weight: 700;
	}
	.arrow{
		width: 50px;
		height: 50px; 
		background: #fff;
		border-radius: 25px;
		margin:0px auto;
		position: relative;
		margin-top: 10%;
	}
	.arrowbtn{
		background: #fff;
		color: #000;
	}
	
	.contentDiv{
		overflow-y: scroll;
		height: calc(100vh - 360px);
		position:fixed;
		width: 100%;
		top: 310px;
	}
</style>
<style>
	.arrowicon{
		font-size: 50px;
	}
	.fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
<template>
	<div>
		<div class="calender" v-on:touchmove="calenderTouchMove"  
			v-on:touchstart="calenderTouchStart"  v-on:touchend="calenderTouchEnd">
			<!--日历-->
			<div class="month" >{{ date| getMonth }}</div>
			<div class="day">{{ day }}</div>
			<div class="week">{{date| getWeek }}</div>
		</div>
		<div class="contentDiv">
			<transition name="fade">
				<div v-if="shownone">
					当天没有记录！
				</div>
			</transition>
			<transition name="fade">	
			<div class="arrow" v-if="showarrow">
				<mu-float-button icon="expand_more" iconClass="arrowicon" @click="showDiaryList" class="arrowbtn"/>
			</div>
			</transition>
			<transition name="fade">	
			<div v-if="showlist" style="margin-top:14px;">
				<DiaryListComponents v-bind:todos="todos"></DiaryListComponents>
			</div>
			</transition>
		</div>
	</div>

</template>
<script>
	import { formatDate } from '../utils/date.js';
	import { mapState } from 'vuex'
	import { weather } from '../utils/weather.js';
	import { bookmark } from '../utils/bookmark.js';
	import { mood } from '../utils/mood.js';
	import DiaryListComponents from '../components/DiaryList.vue'
	export default {
		components: {
			DiaryListComponents
		},
		computed: mapState({
			groupId: state=>state.groupId,
			token: state => state.token,
			todos:state=>state.todos
		}),
		data(){
			return {
				x:0,
				y:0,
				endX:0,
				endY:0,
				flag:0,
				date:(new Date()),
				day:(new Date()).getDate(),
				showlist:false,
				shownone:false,
				showarrow:true,
			}
		},
		created:function(){

    	},
    	methods:{
    		calenderTouchStart:function (event) {
    			var touch=event.touches[0];
    			this.x=parseInt(touch.clientX);
    			this.y=parseInt(touch.clientY);
    			this.flag=1;

    		},
    		calenderTouchEnd:function (event) {
    			var touch=event.touches[0];
    			if((this.endX==0||this.endY==0)){

    				this.endX=parseInt(event.clientX),
			    	this.endY=parseInt(event.clientY);
    			}
    			this.nextPage(this.endX-this.x,this.endY-this.y);
    			this.flag=0;
    		},
    		calenderTouchMove:function (event) {
    			event.preventDefault();
   				var touch=event.touches[0];
   				this.endX=parseInt(touch.clientX),
			    this.endY=parseInt(touch.clientY);
			    this.nextPage(this.endX-this.x,this.endY-this.y);
			   
    		},
    		nextPage:function(lengthX,lengthY){
				if(lengthX<-100&&this.flag==1){
					this.flag=0;
					this.day++;
					this.switchButton();
				}
				if(lengthX>100&&this.flag==1){
					this.flag=0;
					this.day--;
					this.switchButton();
				}
    		},
    		showDiaryList:function(){
    			var data={
    				year:(new Date()).getFullYear(),
    				month:(new Date()).getMonth(),
    				day:this.day,
    				groupId:this.groupId
    			}
				this.$http.post("/api/calendarTodoList",data,{headers:{"token":this.token}}).then(res=>{
					if(res.data.msg!=""){
						this.$router.push({name:"Login"})
					}
					var result=res.data.data;
					if(!(result== undefined ||result=="")&&result.length>0){
						this.$store.commit('setTodos',result);
						this.switchButton(false);
					}else{
						this.shownone=true;
						this.showarrow=false;
						this.switchButton();
					}
				},res=>{
					//查询服务器失败
					this.$router.push({name:"Login"})
				})
    		},
    		switchButton:function(x){
    			console.log(x);
    			x=x==undefined?true:false;
    			let self = this
				setTimeout(function () {
		         	self.shownone=false;
		         	self.showlist=x?false:true;
					setTimeout(function () {
						self.showarrow=x?true:false;
			        }, 500);
		        }, 500);
    		}
    	},
    	filters: {
	        getDay(time) {
	        	return  formatDate(time.getTime(),"dd");
	        },
	        getDayByList(time) {
	        	return  formatDate(time,"dd");
	        },
	        getWeek(time) {
	        	return  formatDate(time.getTime(),"w");
	        },
	        getWeekByList(time) {
	        	return  formatDate(time,"w");
	        },
	        getTimeByList(time) {
				return  formatDate(time,"hh:mm");
	        },
	        getMonth(time) {
	        	var month=  formatDate(time.getTime(),"MM");
	        	var monthValue=["一","二","三","四","五","六","七","八","九","十","十一","十二"]
	        	return monthValue[month-1]+"月"
	        },
	        getMoodValue(num){
	        	return mood(num);
	        },
	        getWeatherValue(num){
	        	return weather(num);
	        },
			getBookmarkValue(num){
	        	return bookmark(num);
	        }
	    }
    }
</script>