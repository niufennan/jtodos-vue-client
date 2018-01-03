<style scoped>
	.mine{
		position: relative;
		z-index: 1;
	}
	.message{
		background: #6fc2f3;
	}
	.icon{
		float: left;
		margin:15px;
	}
	.resume{
		float: left;
		margin:15px;
		color: #fff;
		text-align: left;
		margin-left: 8px;
	}
	.resume .name{
		font-size: 16px;
	}
	.resume .motto{
		font-size: 12px;
		opacity: 0.8
	}
	.operarea{
		float: right;
		margin:15px;
	}
	.updateBtn{
		padding: 2px;
		line-height: 22px;
		height:22px;
		background: none;
		text-align: left;
		min-width: auto;
		width: auto;
		box-shadow:none;
		
	}

	.halfborder{
     position: relative;         
	 }
	 
	.halfborder:before{
	       content: '';
	       position: absolute;
	       width: 200%;
	       height: 200%;
	       border:1px solid #fff;
		   border-radius:3px; 
	       -webkit-transform-origin: 0 0;
	       -moz-transform-origin: 0 0;
	       -ms-transform-origin: 0 0;
	       -o-transform-origin: 0 0;
	       transform-origin: 0 0;
	       -webkit-transform: scale(0.5, 0.5);
	       -ms-transform: scale(0.5, 0.5);
	       -o-transform: scale(0.5, 0.5);
	       transform: scale(0.5, 0.5);
	       -webkit-box-sizing: border-box;
	       -moz-box-sizing: border-box;
	       box-sizing: border-box;
	}
	.content{
		background: #fff;
	}
	.contentBtn{
	
		width: 33%;
		margin:0px;
		float: left;
	}
	.middle{
		width: 34%;
		border: 1px solid #ccc;
		border-top: 0px;
		border-bottom: 0px;
	}
</style>
<style>
	.iconClass{
		font-size: 12px;
	}
	.labelClass{
		font-size: 12px;
	}

</style>
<template>
	<div class="mine">
		<div class="message">
			<div class="icon">
			  <mu-avatar src="/images/uicon.jpg" :size="50"/>
			</div>
			<div class="resume">
				<div class="name">双鱼座的牛</div>
				<div class="motto">一个微胖界的男神</div>
			</div>
			<div class="operarea">
				<div class="halfborder">	
					<mu-raised-button label="修改" iconClass="iconClass" class="thinner-border updateBtn" labelClass="labelClass" icon="android" />
				</div>
			</div>
			<div class="clr"></div>
		</div>
		<div class="content">
			<!--预览tab-->
			<div class="contentBtn">a</div>
			<div class="contentBtn middle" >b</div>
			<div class="contentBtn">c</div>
			<div class="clr"></div>
		</div>
		<div>
			
		</div>
	</div>
</template>
<script>
	 export default {

	 }
</script>