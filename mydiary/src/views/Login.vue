
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
</style>
<style>
    .text_center{
        text-align: center;
    }
</style>
<template>
	<div class="login">
		<div style="height:23%"></div>
		<div class="logo">
		<img src="../assets/logo.jpg">
		</div>
		<div style="margin-top:10px; text-align:center">
            {{message}}
			<mu-content-block>
				<mu-text-field hintText="请输入邮箱" v-model="username" fullWidth inputClass="text_center"/><br/>
				<mu-text-field hintText="请输入密码" v-model="password"  type="password" inputClass="text_center" fullWidth /><br/>
	 			<mu-raised-button label="登陆" primary fullWidth  v-on:click="login"/>
	 			<a @click="toRegister" style="color:#fafafa;margin-top:5px;display:block">没有账号?去注册吧</a>
 			</mu-content-block>
		</div>
		<mu-dialog :open="dialog">
		    请您检查用户名或密码，如果确认输入无误，可以去微信公众号"还没有申请呢"报告bug<br>
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
				dialog:false,
                message:"这是一条信息"
			}
		},
    	methods:{
    		login:function (event) {
                //this.location();
          console.log(event)
    			if(event){
    				var data={
    					username:this.username,
    					password:this.password
    				}
        		this.$http.post("/login",data).then(res=>{
        			var result=res.data;
        			if(result.msg==""){
        				this.$store.commit('setToken',result.data);
        				this.$router.push({name:"Index"})
        			}else{
        				this.dialog=true;
        			}
       		   	},res=>{
        		})
    			}
    		},
    		toRegister:function(event){
    			if(event){
    				this.$router.push({name:"Register"})
    			}
    		},
    		close:function(event){
    			this.dialog=false;
    		},
        /*
        location:function(){
            //开始获取定位数据
            this.message="你好"
            //baidu_location.getCurrentPosition(successCallback, failedCallback);
            navigator.baidu_location.getCurrentPosition(function(position) {
               this.message='纬度: '          + position.coords.latitude          + '\n' +
              '经度: '         + position.coords.longitude         + '\n' +
              '海拔: '          + position.coords.altitude          + '\n' +
              '水平精度: '          + position.coords.accuracy          + '\n' +
              '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
              '方向: '           + position.coords.heading           + '\n' +
              '速度: '             + position.coords.speed             + '\n' +
              '时间戳: '         + position.timestamp                + '\n';
    
　　　　　　 }, function(error) {
                    this.message='code: '    + error.code    + '\n' +
                   'message: ' + error.message + '\n';
        });
            this.message="再见"
        },
        onSuccess:function(position) {
               this.message='纬度: '          + position.coords.latitude          + '\n' +
              '经度: '         + position.coords.longitude         + '\n' +
              '海拔: '          + position.coords.altitude          + '\n' +
              '水平精度: '          + position.coords.accuracy          + '\n' +
              '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
              '方向: '           + position.coords.heading           + '\n' +
              '速度: '             + position.coords.speed             + '\n' +
              '时间戳: '         + position.timestamp                + '\n';
    
　　　　　　 },
        onError: function(error) {
                    this.message='code: '    + error.code    + '\n' +
                   'message: ' + error.message + '\n';
        }*/
    	}
      
    }
</script>
