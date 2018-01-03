<style scoped >
.login{
	background:#6fc2f3;
	width:100%;
	height: 100%;
}
.logo{
	width:50%;
	margin:0px auto;
}
.logo img{
	width: 100%;
	border-radius: 10px;
	border:3px solid #075d8b;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
<style type="text/css">
	.text_center{text-align: center;}
</style>
<template>
	
	<div class="login">
		<div style="height:23%"></div>
		<div class="logo">
		<img src="../assets/logo.jpg">
		</div>
		<div style="margin-top:10px; text-align:center">
			<mu-content-block>
				<mu-text-field hintText="请输入邮箱" fullWidth inputClass="text_center"/><br/>
	 			<mu-raised-button label="发送邮件" primary fullWidth  v-on:click="login"/>
	 			<a href="#"  @click="toLogin"  style="color:#fafafa;margin-top:5px;display:block">想起来了！直接登录</a>
 			</mu-content-block>
		</div>
	</div>


</template>
<script>
    export default {
    	methods:{
    		login:function (event) {
    			if(event){
    				this.$router.push({name:"Index"})
    			}
    		},
    		toLogin:function(event){
    			if(event){
    				this.$router.push({name:"Login"})
    			}
    		}
    	}
    }
</script>
