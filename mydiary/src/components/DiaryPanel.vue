<style scoped>
	.itemlist{
		position:relative;
		padding: 15px;
		overflow: auto;
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
		<div  v-for="(item, index) in indexTodos" >
			<mu-sub-header class="day_title">{{ item.month }}</mu-sub-header>
			<DiaryListComponents v-bind:todos="item.todos"></DiaryListComponents>
		</div>
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
		})
	}
</script>