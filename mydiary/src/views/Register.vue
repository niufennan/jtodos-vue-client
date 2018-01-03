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
		<div style="height:18%"></div>
		<div class="logo">
		<img src="../assets/logo.jpg">
		</div>
		<div style="margin-top:10px; text-align:center">
			<mu-content-block>
				<mu-text-field hintText="请输入邮箱"  v-model="username" fullWidth inputClass="text_center"/><br/>
				<mu-text-field hintText="请输入昵称"  v-model="nickname" fullWidth inputClass="text_center"/><br/>
				<mu-text-field hintText="请输入密码"  v-model="password" type="password" inputClass="text_center" fullWidth /><br/>
	 			<mu-raised-button label="新用户注册" primary fullWidth  v-on:click="login"/>
	 			<a href="#"  @click="toLogin"  style="color:#fafafa;margin-top:5px;display:block">已有账号?直接登录</a>
 			</mu-content-block>
		</div>
		<mu-dialog :open="dialog">
		    注册失败，失败原因为：{{errorMsg}},请您检查后注册！<br>

		    <mu-flat-button label="确定"  slot="actions" fullWidth  @click="close"/>
	    </mu-dialog>
	</div>


</template>
<script>
    export default {
    	data () {
			return {
				username: "",
				password: "",
				nickname: "",
				dialog:false,
				errorMsg:""
			}
		},
    	methods:{
    		login:function (event) {
    			if(event){
    				var data={
    					username:this.username,
    					password:this.password,
    					nickname:this.nickname
    				}
    				
            		this.$http.post("/register",data).then(res=>{
            			var result=res.data;
            			if(result.msg==""){
            				this.$store.commit('setToken',result.data);
            				this.$router.push({name:"Index"})
            			}else{
            				this.dialog=true;
            				this.errorMsg=result.msg;
            			}
           		   	},res=>{
            		})
    			
    			}
    		},
    		toLogin:function(event){
    			if(event){
    				this.$router.push({name:"Login"})
    			}
    		},
    		close:function(event){
    			this.dialog=false;
    		}
    	}
    }
</script>
