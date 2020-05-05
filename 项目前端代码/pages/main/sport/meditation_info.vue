<template>
	<view>
		<view class="uni-padding-wrap" style="margin: 20px;">
			<view class="uni-center">
				<text class="time-big">{{formatedPlayTime}}</text>
			</view>
			<view class="uni-common-mt">
				<slider disabled="true" class="slider" min="0" :max="num" step="1" :value="playTime" @change="seek"></slider>
			</view>
			<view class="play-time">
				<text>00:00</text>
				<text>{{time}}</text>
			</view>

			<view class="page-body-buttons">
				<block v-if="playing">
					<view class="page-body-button" @tap="stop">
						<image src="/static/stop.png"></image>
					</view>
					<view class="page-body-button" @tap="pause">
						<image src="/static/pause.png"></image>
					</view>
				</block>
				<block v-if="!playing">
					<view class="page-body-button"></view>
					<view class="page-body-button" @tap="play">
						<image src="/static/play.png"></image>
					</view>
				</block>
				<view class="page-body-button"></view>
			</view>
			<mask v-if="showMask"></mask>
		</view>
	</view>
</template>
<script>
	var _this;
	var a;
	var s;
	var util = require('../../../common/util.js');
	import mask from '@/components/mask.vue';
	export default {
		components: {
			mask
		},
		data() {

			return {
				list: [0, 0, ':', 0, 0, ':', 0, 0], // 显示时间
				isbegin: false,
				hasclickback: false,
				showMask: false,
				num: 0,
				sportid: '',
				time: '',
				title: 'backgroundAudio',
				bgAudioMannager: null,
				dataUrl: '../../../static/sport/meditation/Meditation',
				playing: false,
				playTime: 0,
				formatedPlayTime: '00:00:00'
			}
		},
		onBackPress(event) { //用于监听返回询问,这个地方不能用async await，用了会有bug
			if (event.from === 'navigateBack') {
				return false;
			}

			if (_this.isbegin) { //hasclickback定义的变量
				uni.showModal({
					title: "提示",
					content: "确认退出本次冥想?",
					cancelText: "取消",
					confirmText: "确认退出",
					success: function(res) { //不管点击了确定还是取消都是返回
						_this.hasclickback = true;
						if (res.confirm) {
							//点击了确定，进行相关操作
							_this.$backgroundAudioData.formatedPlayTime = _this.formatedPlayTime = util.formatTime(0);
							uni.navigateBack();
							_this.bgAudioMannager.stop();
						} else if (res.cancel) {
							//点击了取消，进行相关操作

						}
						return true;
					}
				})
				return true; //不管promise 写法还是常规写法，都要return 阻隔，少不了
			} else {
				return false;
			}
		},
		// onBackPress(options) {
		// 	if (this.showMask) {
		// 		this.showMask = false;
		// 		return true;
		// 	} else {
		// 			uni.showModal({
		// 				title: '提示',
		// 				content: '是否退出uni-app？',
		// 				success: function(res) {
		// 					if (res.confirm) {
		// 						// 退出当前应用，改方法只在App中生效  
		// 						s=1
		// 					} else if (res.cancel) {
		// 						console.log('用户点击取消');
		// 						return true;
		// 						s=0
		// 					}
		// 				}
		// 			});

		// 		}
		// 			//TODO handle the exception
		// 	}
		// },
		// onBackPress() {
		// 	if(this.showMask) {  
		// 	    this.showMask = false;
		// 		uni.showModal({
		// 			showCancel:true,
		// 			content:"是否返回",
		// 			success: function(res) {
		// 				console.log('用户点击确定');

		// 			}
		// 		});
		// 	  }  
		// },
		onLoad(e) {
			_this = this;
			console.log(e.sportid);
			console.log(e.time);
			console.log(e.num);
			_this.sportid = e.sportid;
			_this.time = e.time;
			_this.num = e.num;
			_this.dataUrl = _this.dataUrl + e.sportid + '.mp3';
			_this.playing = false;
			console.log(_this.dataUrl);
			// this.playing = this.$backgroundAudioData.playing;
			this.playTime = this.$backgroundAudioData.playTime;
			this.formatedPlayTime = this.$backgroundAudioData.formatedPlayTime;

			let bgAudioMannager = uni.getBackgroundAudioManager();
			if (!bgAudioMannager.title) {
				bgAudioMannager.title = '致爱丽丝';
			}
			if (!bgAudioMannager.singer) {
				bgAudioMannager.singer = '暂无';
			}
			if (!bgAudioMannager.coverImgUrl) {
				bgAudioMannager.coverImgUrl = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg';
			}

			bgAudioMannager.onPlay(() => {
				console.log("开始播放");
				this.$backgroundAudioData.playing = this.playing = _this.isbegin = true;
			})
			bgAudioMannager.onPause(() => {
				console.log("暂停播放");
				this.$backgroundAudioData.playing = this.playing = false;
				_this.isbegin = true;
			})
			bgAudioMannager.onEnded(() => {
				this.playing = false;
				this.$backgroundAudioData.playing = _this.isbegin = false;
				this.$backgroundAudioData.playTime = this.playTime = 0;
				this.$backgroundAudioData.formatedPlayTime = this.formatedPlayTime = util.formatTime(0);
			})

			bgAudioMannager.onTimeUpdate((e) => {
				if (Math.floor(bgAudioMannager.currentTime) > Math.floor(this.playTime)) {
					this.$backgroundAudioData.formatedPlayTime = this.formatedPlayTime = util.formatTime(Math.floor(bgAudioMannager.currentTime));
				}
				this.$backgroundAudioData.playTime = this.playTime = bgAudioMannager.currentTime;
			})

			this.bgAudioMannager = bgAudioMannager;
		},
		methods: {
			play: function(res) {
				console.log("播放");
				if (!this.bgAudioMannager.src) {
					this.bgAudioMannager.startTime = this.playTime;
					console.log(this.bgAudioMannager);
					console.log(this.bgAudioMannager.src);
					this.bgAudioMannager.src = this.dataUrl;
					console.log(this.bgAudioMannager);
					console.log(this.bgAudioMannager.src);
				} else {
					if (_this.isbegin) {
						console.log("kaishi");
						this.bgAudioMannager.seek(this.playTime);
						this.bgAudioMannager.play();
					} else {
						console.log("xinde");
						_this.bgAudioMannager.src = _this.dataUrl;
						this.bgAudioMannager.seek(this.playTime);
						this.bgAudioMannager.play();
					}

				}
			},
			seek: function(e) {
				this.bgAudioMannager.seek(e.detail.value);
			},
			pause: function() {
				this.bgAudioMannager.pause();
			},
			stop: function() {
				this.bgAudioMannager.stop();

				uni.showModal({
					title: "结束",
					content: "是否提交冥想记录?",
					cancelText: "取消",
					confirmText: "确认",
					success: function(res) { //不管点击了确定还是取消都是返回
						console.log(_this.formatedPlayTime);
						if (res.confirm) {
							//点击了确定，进行相关操作
							const value = uni.getStorageSync('userid');
							for (var i=0;i<_this.formatedPlayTime.length;i++)
							{ if(_this.formatedPlayTime[i]!=":"){
								_this.list[i]=parseInt(_this.formatedPlayTime[i]);
								
								
							}
							    console.log("a:"+typeof(_this.list[i]));
							}
							
							console.log(value);
							uni.request({
								url: _this.apiServer + 'user/sport/train',
								method: "POST",
								data: {
									"action": "addSportRecord",
									"data": {
										"sportid": _this.sportid,
										"userid": 2,
										"duration":_this.list,
										"distance":0,
										"number":0
									}
								},
								success: (res) => {
									console.log(res.data);
									uni.showModal({
										content: res.data.msg,
										showCancel: false,
										success: function(res) {
											console.log('用户点击确定');
											// _this.is_Submit = false
											// _this.begin1 = true
											// _this.end1 = false
											// _this.icon_suspend = false
											// _this.icon_begin = false
											// _this.butt = '开始'
											// _this.list = [0, 0, ':', 0, 0, ':', 0, 0]

										}
									});
								},
								fail: (e) => {
									console.log(JSON.stringify(e));
								}
							})
						} else if (res.cancel) {
							//点击了取消，进行相关操作

						}
						_this.$backgroundAudioData.playing = _this.playing = _this.isbegin = false;
						_this.$backgroundAudioData.playTime = _this.playTime = 0;
						_this.$backgroundAudioData.formatedPlayTime = _this.formatedPlayTime = util.formatTime(0);
						return true;
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-image: url(~@/static/sport/meditation/background4.jpg);
		background-color:#cccccc;
	}

	image {
		width: 150rpx;
		height: 150rpx;
	}
	.time-big {
		font-size: 60rpx;
		margin: 20rpx;
	}
	.uni-center{
		text-align:center;
	}
	.uni-padding-wrap{
		width:690rpx;
		
	}
	.page-body-text {
		padding: 0 30rpx;
	}

	.page-body-wrapper {
		margin-top: 0;
	}

	.page-body-info {
		padding-bottom: 50rpx;
	}

	.time-big {
		font-size: 60rpx;
		margin: 20rpx;
	}

	.slider {
		width: 600rpx;
	}

	.play-time {
		font-size: 28rpx;
		width: 100%;
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.page-body-buttons {
		display: flex;
		justify-content: space-around;
		margin-top: 400rpx;

	}

	.page-body-button {
		width: 250rpx;
		text-align: center;
	}
</style>
