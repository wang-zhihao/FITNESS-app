<template>
	<view>
		<view class="padding" style="display: flex;background-color:#555555 ;height: 150px;">

			<image mode="aspectFill" class="cu-avatar xl round margin-left" :src="face"></image>
			<text style="margin:8px 20px;font-size:20px;font-weight:bold;color: #ffd66d;">{{username}}</text>
			<view style="display: flex;flex-direction: column;position: absolute;right: 20px;">
				
				<text style="margin-top: 20px; font-size:16px;color: #FFFFFF;" @click="changeface">修改头像</text>
			</view>
		</view>
		<view url="page_bodyinfo" class="padding-xl radius shadow bg-white" style="display: flex;flex-direction:column;margin: 5%;">
			<view style="display: flex;">
				<text style="margin-top: 20px; font-size: 15px;font-weight: bold;">身体数据</text>
				<button @click="turn_edit" style=" margin-top:15px;margin-left:160px;" v-if="!is_edit" class="cu-btn round" :class="'lines-black'">编辑</button>
				<button @click="saveBodyInfo" style=" margin-top:15px;margin-left:160px;" v-if="is_edit" class="cu-btn round"
				 :class="'lines-black'">保存</button>
			</view>
			<view class="bodymsg">
				<text class="bodyname">体重</text>
				<input :disabled="!is_edit" style="width: 30px;" :value="bodydata.weight" @input="changeweight" class="bodyinfo"></input>
				<text style="margin-top: 15px;">kg</text>
			</view>
			<view class="bodymsg">
				<text class="bodyname">胸围</text>
				<input :disabled="!is_edit" style="width: 30px;" :value="bodydata.bust" @input="changebust" class="bodyinfo"></input>
				<text style="margin-top: 15px;">cm</text>
			</view>
			<view class="bodymsg">
				<text class="bodyname">腰围</text>
				<input :disabled="!is_edit" style="width: 30px;" :value="bodydata.waist" @input="changewaist" class="bodyinfo"></input>
				<text style="margin-top: 15px;">cm</text>
			</view>
			<view class="bodymsg">
				<text class="bodyname">臀围</text>
				<input :disabled="!is_edit" style="width: 30px;" :value="bodydata.hipline" @input="changehipline" class="bodyinfo"></input>
				<text style="margin-top: 15px;">cm</text>
			</view>
			<view class="bodymsg">
				<text class="bodyname">身高</text>
				<input :disabled="!is_edit" style="width: 40px;" :value="bodydata.height" @input="changeheight" class="bodyinfo"></input>
				<text style="margin-top: 15px;">cm</text>
			</view>
			<view class="bodymsg">
				<text class="bodyname">BMI</text>
				<input :disabled="!is_edit" style="width: 55px;" :value="bodydata.BMI" @input="changeBMI" class="bodyinfo"></input>
			</view>
		</view>
		<view style="display: flex;width: 100%;">
			<navigator url="./sportrecord" class="padding-xl radius shadow-warp bg-white margin-top" style="margin: 30upx 3%;
			padding: 14px; background-color: #ffffff;height: 140px;width: 100%;display: flex;flex-direction:column">
				<text>运动记录</text>
				<text style="margin-top: 15px;color: #808080; font-size: 14px;">总运动</text>
				<text style="margin-top: 9px;">{{min}}分钟</text>
			</navigator>
		</view>
		<button class="solids" style="width: 100%;background-color: #FFFFFF; color: #DD514C;"  @click="logout">退出登陆</button>
	</view>
</template>

<script>
	var loginRes, _this, userid, token;
	export default {
		data: function() {
			return {
				face: '',
				U_eId: '',
				is_edit: false,
				bodydata: {
					weight: '',
					bust: '',
					waist: '',
					hipline: '',
					height: '',
					BMI: ''
				},
				username: '',
				min: 9,
				weight: 50,

			}
		},
		methods: {
			logout() {
				const userid = uni.getStorageSync('userid');
				const token = uni.getStorageSync('TOKEN');
				uni.request({
					url: this.apiServer + 'user/signout',
					method: "POST",
					header : {'content-type':'application/x-www-form-urlencoded'},
					data: {
						"token": token,
						"userid": userid

					},
					success: (res) => {
						console.log(res.data.ret=0);
						if(res.data.ret==0){
							try {
							    uni.removeStorageSync('userid');
								uni.removeStorageSync('TOKEN');
								uni.reLaunch({
									url:'../../index/login'
								})
								
								return;
							} catch (e) {
							    // error
							}
						}
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			changeface() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
						try {
							const userid = uni.getStorageSync('userid');
							const token = uni.getStorageSync('TOKEN');


							uni.uploadFile({
								url: _this.apiServer + 'user/myself',
								name: 'file',
								filePath: tempFilePaths[0],
								formData: {
									'action': 'changeface',
									'userid': userid,
									'token': token
								},
								success: (res) => {
									console.log(res.data);
									// 将已经上传的文件地址赋值给文章数据
									_this.findUserBodyData();
								},
								fail: () => {
									uni.showToast({
										title: "123,请重试!",
										icon: "none"
									});
								}
							})

						} catch (e) {
							// error
						}

					}
				});
			},
			changeUserBodyData() {
				uni.request({
					url: this.apiServer + 'user/myself',
					method: "POST",
					data: {
						"token": token,
						"U_eId": _this.U_eId,
						"action": "changeUserBodyData",
						"bodydata": _this.bodydata
					},
					success: (res) => {
						console.log(res.data);
						_this.is_edit = false
						_this.bodydata.BMI = res.data.BMI
						uni.showModal({
							content: res.data.msg,
							showCancel: false,
							success: function(res) {
								console.log('用户点击确定');
							}
						});
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			findUserBodyData() {
				uni.request({
					url: this.apiServer + 'user/myself',
					method: "GET",
					data: {
						"token": token,
						"action": "findUserBodyData",
						"userid": userid,
					},
					success: (res) => {
						console.log(res.data);
						_this.username = res.data.username
						_this.face = res.data.face
						if (res.data.ret == 0) {
							if (res.data.bodydata.bust) {
								_this.bodydata.bust = res.data.bodydata.bust
							} else {
								_this.bodydata.bust = ''
							}
							if (res.data.bodydata.waist) {
								_this.bodydata.waist = res.data.bodydata.waist
							} else {
								_this.bodydata.waist = ''
							}
							if (res.data.bodydata.hipline) {
								_this.bodydata.hipline = res.data.bodydata.hipline
							} else {
								_this.bodydata.hipline = ''
							}
							if (res.data.bodydata.BMI) {
								_this.bodydata.BMI = res.data.bodydata.BMI
							} else {
								_this.bodydata.BMI = ''
							}
							if (res.data.bodydata.height) {
								_this.bodydata.height = res.data.bodydata.height
							} else {
								_this.bodydata.height = ''
							}
							if (res.data.bodydata.weight) {
								_this.bodydata.weight = res.data.bodydata.weight
							} else {
								_this.bodydata.weight = ''
							}
							_this.U_eId = res.data.bodydata.U_eId
						} else {
							_this.bodyInfoExist = false
						}
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			changeweight: function(event) {
				this.bodydata.weight = event.target.value
			},
			changebust: function(event) {
				this.bodydata.bust = event.target.value
			},
			changewaist: function(event) {
				this.bodydata.waist = event.target.value
			},
			changehipline: function(event) {
				this.bodydata.hipline = event.target.value
			},
			changeheight: function(event) {
				this.bodydata.height = event.target.value
			},
			changeBMI: function(event) {
				this.bodydata.BMI = event.target.value
			},
			saveBodyInfo() {
				if (_this.U_eId) {
					return _this.changeUserBodyData();
				}
				console.log(this.bodydata)
				this.is_edit = false
				uni.request({
					url: this.apiServer + 'user/myself',
					method: "POST",
					data: {
						"token": token,
						"userid": userid,
						"action": "saveBodyInfo",
						"bodydata": _this.bodydata
					},
					success: (res) => {
						console.log(res.data);

						uni.showModal({
							content: res.data.msg,
							showCancel: false,
							success: function(res) {
								console.log('用户点击确定');
							}
						});
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			turn_edit() {
				this.is_edit = true
			}
			
		},
		onLoad: function() {
			_this = this;
			loginRes = this.checkLogin('../main/myself/myself', 2);
			if (!loginRes) {
				console.log('返回')
				return;
			}
			token = loginRes[0];
			userid = loginRes[1];
			console.log(loginRes[1])
			_this.findUserBodyData();

		},
	}
</script>

<style>
	@import url("../../../colorui/main.css");
	@import url("../../../colorui/icon.css";

	.cu-btn {
		position: relative;
		border: 0upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 30upx;
		font-size: 28upx;
		height: 64upx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin-left: initial;
		transform: translate(0upx, 0upx);
		margin-right: initial;
	}

	.cu-avatar.xl {
		width: 175upx;
		height: 175upx;
		font-size: 2.5em;
	}

	.bodymsg {
		display: flex;
		padding-bottom: 5px;
		margin: 5px;
		width: 100%;
		border-bottom-style: groove;
		border-width: 0.1px;
		border-color: #000000;
	}

	.bodyname {
		font-size: 18px;
		margin: 15px 15px;
		color: #2d2d2d;
	}

	.bodyinfo {
		margin-top: 13px;
		margin-left: 50%;
		font-size: 20px;
		color: #2d2d2d;
		font-weight: bold;
	}
</style>
