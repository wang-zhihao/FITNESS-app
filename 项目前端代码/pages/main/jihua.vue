<template>
	<view>
		<view>
			<view style="margin: 10px;">
				<text style="font-size: 24px;">智能训练计划</text></view>
			<view style="display: flex;">
				<text style="margin-left: 30px;color: #666666;font-size: 14px;">总时长</text>
				<text style="position: absolute;right: 40px;color: #666666;font-size: 14px;">完成天数</text>
			
			</view>	
			<view style="display: flex;">
				<text style="margin-left: 30px;">{{planinfo.alltime}}分钟</text>
				<text style="position: absolute;right: 40px;">{{planinfo.day}}天</text>

			</view>
			<view style="width: 90%;margin: 5%;display: flex;flex-direction: column;background-color: #F8F8F8">
				<view style="margin: 10px;">
					<text>今日训练</text>
					<view>
						<navigator :url="'jihua_info?type=1&courseid='+planinfo.course1id">
							<image mode="aspectFill" style="margin:20px 5% 0px; height: 120px;width: 90%;" src="../../static/plan/plan_course1.jpg"></image>
							<text style="color: #ffffff; position: relative;left: 30px;bottom: 80px;">{{planinfo.course1name}}</text>
						</navigator>
						<navigator :url="'jihua_info?type=1&courseid='+planinfo.course2id">
							<image mode="aspectFill" style="margin:0px 5%; height: 120px;width: 90%;" src="../../static/plan/plan_course2.jpg"></image>
							<text style="color: #ffffff; position: relative;left: 30px;bottom: 80px;">{{planinfo.course2name}}</text>
						</navigator>

					</view>

				</view>

			</view>
			<button @click="changeplan" style="position: absolute;bottom: 10px;width: 100%;background-color: #666666;
		color: #FFFFFF;">更改训练计划</button>
		</view>
	</view>
</template>

<script>
	var loginRes;
	var _this;
	export default {
		data: function() {
			return {
				planinfo:{},
				course1:{
					name:'下肢热身激活',
				},
				course2:{
					name:'下肢热身激活',
				},
				time: 9,
				day: 4

			}
		},
		onLoad: function() {
			_this =this;
			loginRes = this.checkLogin('../main/jihua', '2');
			if (!loginRes) {
				console.log('返回')
				return;
			}
			try {
				const userid = uni.getStorageSync('userid');
				const token = uni.getStorageSync('TOKEN');
				if (userid) {
					console.log(userid);
					uni.request({
						url: this.apiServer + 'user/plan',
						method: "GET",
						data: {
							"action": "findplan",
							"userid": userid,
							"token": token
						},
						success: (res) => {
							console.log(res.data);
							_this.planinfo = res.data.planinfo;
							console.log(_this.planinfo)
							if(res.data.ret==1){
								uni.showToast({
								    title: '请制定专属计划',							    
								});
								setTimeout(function () {
								    uni.hideToast();																		
								}, 2000);
							}
						},
						fail: (e) => {
							console.log(JSON.stringify(e));
							
						}
					})
				}
			} catch (e) {
				// error
				
			}
		},
		methods: {
			changeplan(){
				uni.navigateTo({
				    url: 'changeplan'
				});
			}

		}
	}
</script>

<style>

</style>
