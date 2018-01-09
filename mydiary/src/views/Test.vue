<style>
	div{
		background: #fff;
		opacity: 1;
		height: 100%;
	}
</style>
<template>
	<div>
		<table>
			<tr>
				<td>用户名</td><td><input type="text" v-model="username"/></td>
			</tr>
			<tr><td>密码</td><td><input type="text" v-model="password"/></td></tr>
			<tr><td colspan="2"><input type="button" @click="click" value="提交"/></td></tr>
		</table>
		<br>
		<div>{{ message }}</div>
	</div>
</template>
<script>
	export default {
		data() {
            return {
            	username:'',
            	password:'',
            	message:''
            }
        },
        methods:{
        	click:function (event) {
        		var data={
        			username:this.username,
        			password:this.password
        		}
        		console.log(data)
        		console.log(this.password)
        		this.$http.post("/test",data).then(res=>{
        			console.log(res.data);
					this.message=res.data.name+'__'+res.data.password
				},res=>{
					this.txt=res
				}
			)
        	}
        }
	}
</script>