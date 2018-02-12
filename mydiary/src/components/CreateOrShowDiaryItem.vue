<style scoped>
	.mainContent{
		width: 100%;
		height: 100%;
	}
	.title{
		color: #fff;
		text-align: center;
		font-size: 12px;
	}
	
	.day{
		font-size: 60px; 
		font-family: '幼圆','Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
		font-weight: 100;
		padding: 0px;
		line-height: 50px;
	}
	.weekandtime span{
		margin: 5px;
	}
	.weatherandaddress {
		margin-top: 10px;
	}
	.weatherandaddress span{
		margin: 15px;
		
	}
	.txtClass{
		width: 100%;
		height: 100%;
	}
	.btn i{
		margin:3px;
	}
	.weatherIcon{
		width: 30px;
		height: 30px;
	}
	.weatherIconActive{
		width: 30px;
		height: 30px;
		border:solid #00f1dc 1px;
	}
	.weatherNumber{
		width: 10%;float: left;
	}
	.weatherSlider{
		width: 80%;float: left;padding-left: 3px;padding-right: 3px;
	}

</style>
<style>
	.txtClass{
		margin-bottom: 0px;
	}
</style>
<template>
	<div class="mainContent">
		<mu-icon value="clear" style="float:right" v-on:click="close"/>
		<div class="clr"></div>
		<div class="title">
			<div>{{date | getMonth}}</div>
			<div class="day">{{date | getDay}}</div>
			<div class="weekandtime"><span>{{date | getWeek}}</span><span>{{date | getTime}}</span></div>
			<div class="weatherandaddress"><span>{{weatherText}}</span><span>{{addressValue}} {{addressCity}} {{addressProvince}}</span></div>
		</div>
		<mu-content-block style="background:#fff;margin-bottom:5px;">
		 	<mu-text-field fullWidth :underlineShow="false" hintText="日记标题" :value="item"/>
		 	<mu-divider/>
		 	<mu-text-field multiLine fullWidth :underlineShow="false" hintText="日记内容" :value="conent" :rows="10"/>
		</mu-content-block>
		<div class="btn">
	 	 	<!--工具操作栏-->
	 	 	<mu-icon value="save" v-on:click="save"/>
	 	 	<mu-icon value="room" v-on:click="chooseAddress" v-if="locationBtn"/><!--包装后改为定位-->
	 	 	<mu-icon value="wb_sunny" v-on:click="chooseWeather" v-if="weatherBtn"/><!--包装后改为定位-->
	 	 	<mu-icon value="mood" v-on:click="chooseMood"/><!--没办法只能先用弹框了-->
	 	 	<mu-icon value="photo_camera" v-on:click="close"/>
	 	 	<mu-icon value="delete" style="float:right"/>
	 	</div>

		<mu-dialog :open="adddialog" title="请选择" >
		    <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"/>
			
			<mu-flat-button slot="actions" primary @click="addressClose" label="确定"/>
		</mu-dialog>
		<mu-dialog :open="weatherdialog" title="请选择">
			<div style="text-align:center">
				<img src="../assets/3d_60/0.png" :class="weatherIcon0" @click="chooseWeatherIcon(0)">
				<img src="../assets/3d_60/7.png" :class="weatherIcon1" @click="chooseWeatherIcon(1)">
				<img src="../assets/3d_60/9.png" :class="weatherIcon2" @click="chooseWeatherIcon(2)">
				<img src="../assets/3d_60/13.png" :class="weatherIcon3" @click="chooseWeatherIcon(3)">
				<img src="../assets/3d_60/24.png" :class="weatherIcon4" @click="chooseWeatherIcon(4)">
				<img src="../assets/3d_60/30.png" :class="weatherIcon5" @click="chooseWeatherIcon(5)">
			</div>
			
			<div>
					<div class="weatherNumber">
		  	 			{{highMin}}
		  			</div>
		  			<div class="weatherSlider">
		  	 			<mu-slider v-model="high" :max="highMax" :min="highMin" :step="1" @change="highSliderChange"/>
		  	 		</div>
		  			<div class="weatherNumber">
		  	 		{{highMax}}
				  	</div>
			</div>
			<div class="clr"></div>
			<div>
					<div class="weatherNumber">
		  	 			{{lowMin}}
		  			</div>
		  			<div class="weatherSlider">
		  	 			<mu-slider v-model="low" :max="lowMax" :min="lowMin" :step="1" @change="lowSliderChange"/>
		  	 		</div>
		  			<div class="weatherNumber">
		  	 			{{lowMax}}
				  	</div>
			</div>
			<div class="clr"></div>
			<div style="text-align:center">
				{{weatherText}}
			</div>
			<mu-flat-button slot="actions" primary @click="weatherClose" label="确定"/>
		</mu-dialog>
		<mu-dialog :open="mooddialog">
			<div style="text-align:center">
				<div style="text-align:center;float:left">
					<mu-icon value="sentiment_very_satisfied" :size="40" v-on:click="moodClose(0)"/>
					<div style="font-size: 11px;">惊喜</div>
				</div>
				<div style="text-align:center;float:left">
					<mu-icon value="sentiment_satisfied" :size="40" v-on:click="moodClose(1)"/>
					<div style="font-size: 11px;">开心</div>
				</div>
				<div style="text-align:center;float:left">
					<mu-icon value="sentiment_neutral" :size="40" v-on:click="moodClose(2)"/>
					<div style="font-size: 11px;">一般</div>
				</div>
				<div style="text-align:center;float:left">
					<mu-icon value="sentiment_dissatisfied" :size="40" v-on:click="moodClose(3)"/>
					<div style="font-size: 11px;">不好</div>
				</div>
				<div style="text-align:center;float:left">
					<mu-icon value="sentiment_very_dissatisfied" :size="40" v-on:click="moodClose(4)"/>
					<div style="font-size: 11px;">伤心</div>
				</div>
			</div>
		</mu-dialog>
	</div>
</template>
<script>
	import { formatDate } from '../utils/date.js';
	import { mapState } from 'vuex';
	const address = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
}



	export default {
		computed: mapState({
			addressValue:state=>state.addressValue,
			token: state => state.token,
			groupId: state=>state.groupId,
			weatherBtn:state=>state.weatherBtn,
			locationBtn:state=>state.locationBtn
		}),
		data () {
			return {
 				adddialog: false,
 				weatherdialog:false,
 				mooddialog:false,
 				low:9,
 				lowMin:-10,
 				lowMax:34,
 				high:10,
 				highMin:-9,
 				highMax:35,
				rows: 10,
				underlineShow: false,
				date:(new Date()).getTime(),
				item:"",
				conent:"",
				addressSlots: [
				{
					width: '100%',
					textAlign: 'right',
					values: Object.keys(address)
				}, {
					width: '100%',
					textAlign: 'left',
					values: ['北京']
				}
				],
				address: ['北京', '北京'],
				addressProvince: '北京',
				addressCity: '北京',
				weatherIcon0:"weatherIconActive",
				weatherIcon1:"weatherIcon",
				weatherIcon2:"weatherIcon",
				weatherIcon3:"weatherIcon",
				weatherIcon4:"weatherIcon",
				weatherIcon5:"weatherIcon",
				weatherText:"晴 10度/9度",
				weatherIconText:["晴","多云","阴","雨","雪","霾"],
				weatherIconIndex:0,
				weatherContent:"",
				mood:0
			}
		},
		methods: {
			close: function (event) {
				// body...
				this.$store.commit('close')
			},
			save: function(event){
				var data={
					token:this.token,
					groupId:this.groupId,
					item:this.item,
					conent:this.conent,
					weather:this.weatherIconIndex,
					weatherContent:this.weatherContent,
					mood:this.mood,
					bookmark:0,
					address:this.addressValue+" "+this.addressCity+" "+this.addressProvince,
					lng:0,
					lat:0,
					
				}
				this.$store.commit('close')
			},
			chooseAddress:function(event){
				this.adddialog=true;
			},
			addressClose:function(event){
				this.adddialog=false;
				//查询此地的天气 省市组合
				this.searchWeather( this.addressProvince+""+this.addressCity);
			},
			addressChange (value, index) {
				console.log(value+" "+index)
				switch (index) {
				case 0:
				this.addressProvince = value
					const arr = address[value]
					this.addressSlots[1].values = arr
					this.addressCity = arr[0]
					break
				case 1:
					this.addressCity = value
					break
				}
				this.address = [this.addressProvince, this.addressCity]
		    },
		    chooseWeather:function(event){
		    	this.setWeatherText();
		    	this.weatherdialog=true
		    },
		    weatherClose:function(event){
		    	this.weatherdialog=false
		    	
		    },
		    chooseWeatherIcon:function(index){
		    	this.weatherIconIndex=index;
		    	for(var i=0;i<6;i++){
					this["weatherIcon"+i]="weatherIcon";
				}
		    	this["weatherIcon"+this.weatherIconIndex]="weatherIconActive";
		    	this.setWeatherText();
		    },
		    highSliderChange:function(event){
		    	//最低气温不能高过此值
		    	if(this.low>=this.high){
		    		this.low=this.high-1;
		    	}
		    	this.setWeatherText();
		    },
		    lowSliderChange:function(event){
		    	//最高气温不能低过此值
		    	if(this.low>=this.high){
		    		this.high=this.low+1;
		    	}
		    	this.setWeatherText();
		    },
		    setWeatherText:function(){
		    	this.weatherText= this.weatherIconText[(this.weatherIconIndex)]+" "+this.high+"度/"+this.low+"度";
		    	
		    },
		    chooseMood:function(){
				this.mooddialog=true;
		    },
		    moodClose:function(mood){
		    	this.mood=mood
		    	this.mooddialog=false;
		    },
		    searchWeather:function(address){
		    	var data={
		    		address:address
		    	};
		    	this.$http.post("/api/weather",data,{headers:{"token":this.token}}).then(res=>{
					if(res.data.msg!=""){
						//使用手动天气设置
						this.$store.commit('setWeatherIsShow',true);
					}
					console.log(res)
					var result=res.data.data;
					console.log(result);
					if(!(result== undefined ||result=="")){
						//关闭手动设置按钮
						this.$store.commit('setWeatherIsShow',false);
						this.weatherContent=result;
						this.weatherText= result.text_day+" "+result.temp_high+"度/"+result.temp_low+"度";
					}

				},res=>{
					//查询服务器失败,同样显示天气设定界面
					this.$store.commit('setWeatherIsShow',true);
				})
		    }
		},
		filters: {
	        getMonth(time) {
	        	var month=  formatDate(time,"MM");
	        	var monthValue=["一","二","三","四","五","六","七","八","九","十","十一","十二"]
	        	return monthValue[month-1]+"月"
	        },
	        getDay(time) {
	        	
	        	return formatDate(time,"dd");
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