<style scoped>
	.diaryitem{
		background: #fff;
		opacity: 1;
		margin-bottom: 15px;
		text-align: left;
	}
	.item_day0{
		font-size: 36px; 
		line-height: 40px;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		font-weight: 500;
		color: #5e35b1;
		text-align: center;
	}
	.item_week0{
		text-align: center;
		font-size: 12px; 
		line-height: 14px;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		color: #5e35b1;
	}
	.item_time0{
		font-size: 12px; 
		line-height: 14px;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		color: #5e35b1;
	}
	.item_title0{
		font-size: 18px; 
		line-height: 28px;
		font-weight: 700;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		color: #5e35b1;
	}
	.item_content0{
		font-size: 13px; 
		line-height: 15px;
		font-weight: 500;
		font-family: 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		
	}
	
</style>
<template>
	<div>
	<mu-paper class="diaryitem" :zDepth="2" v-for="(item, index) in todos" >
		<mu-content-block>
		    <mu-row gutter>
	    	   <mu-col width="20">
	    	   	<div class="item_day0">{{ item.createTime | getDay }}</div>
	    	   	<div class="item_week0">{{ item.createTime | getWeek }}</div>
	    	   </mu-col>
				<mu-col width="60">
					<div class="item_time0">{{ item.createTime | getTime }}</div>
				    <div class="item_title0">{{ item.item }}</div>
					<div class="item_content0">{{item.content}}</div>
				</mu-col>
				<mu-col width="25" style="text-align:right">
					<mu-icon :value=" item.mood | getMoodValue  " :size="16"/>
					<mu-icon :value=" item.weather | getWeatherValue  " :size="16"/>
					<mu-icon :value=" item.bookmark | getBookmarkValue  " :size="16"/>
				</mu-col>
		    </mu-row>
		</mu-content-block>
	</mu-paper>
</div>
</template>
<script>
	import { mapState } from 'vuex'
	import { formatDate } from '../utils/date.js';
	import { mood } from '../utils/mood.js';
	import { weather } from '../utils/weather.js';
	import { bookmark } from '../utils/bookmark.js';
    export default {
		props:["todos"],
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