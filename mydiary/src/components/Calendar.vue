<style scoped>
	.calender{
		background: #fff;
		position: relative;
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
	
</style>
<style>
	.arrowicon{
		font-size: 50px;
	}
</style>
<template>
	<div>
		<div class="calender" v-on:touchmove="calenderTouchMove"  
			v-on:touchstart="calenderTouchStart"  v-on:touchend="calenderTouchEnd">
				<!--日历-->
				<div class="month" >{{ date| getMonth }}</div>
				<div class="day">{{ date| getDay }}</div>
				<div class="week">{{date| getWeek }}</div>
			</div>
		<div class="arrow">
			<mu-float-button icon="expand_more" iconClass="arrowicon" class="arrowbtn"/>
		</div>
	</div>

</template>
<script>
	import { formatDate } from '../utils/date.js';

	export default {
		data(){
			return {
				x:0,
				y:0,
				endX:0,
				endY:0,
				flag:0,
				date:(new Date()).getTime(),
			}
		},
		created:function(){
    	},
    	methods:{

    		calenderTouchStart:function (event) {
    			var touch=event.touches[0];
    			this.x=parseInt(touch.clientX);
    			this.y=parseInt(touch.clientY);
    			console.log(this.x+"----"+this.y);
    			this.flag=1;

    		},
    		calenderTouchEnd:function (event) {
    			var touch=event.touches[0];
    			if((this.endX==0||this.endY==0)){

    				this.endX=parseInt(event.clientX),
			    	this.endY=parseInt(event.clientY);
    			}
    			console.log(this.endX+"--end--"+this.endY);
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
				console.log(lengthX+"----"+lengthY);
				if(lengthX<-100&&this.flag==1){
					this.flag=0;
					this.date.day++
				}
				if(lengthX>100&&this.flag==1){
					this.flag=0;
					this.date.day--
				}
    		}
    	},
    	filters: {
	        getDay(time) {
	        	return  formatDate(time,"dd");
	        },
	        getWeek(time) {
	        	return  formatDate(time,"w");
	        },
	        getTime(time) {
				return  formatDate(time,"hh:mm");
	        },
	        getMonth(time) {
	        	var month=  formatDate(time,"MM");
	        	var monthValue=["一","二","三","四","五","六","七","八","九","十","十一","十二"]
	        	return monthValue[month-1]+"月"
	        },
	    }
    }
</script>