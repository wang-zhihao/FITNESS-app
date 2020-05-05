<template>
	<view>
		<view style="display: flex;height: 115px;">
			<view class="cu-avatar xl round margin-left1" style="
		background-image:url(../../../static/speed.png);height: 90px;width: 90px;margin-top: 10px;">
				<text style="font-size: 30px;">
					{{distance}}\n
					<text style="font-size: 20px;">公里</text>
				</text>
			</view>
			<view style="margin-top: 25px;width: 240px;">
				<text space="nbsp" style="font-size:19px ;margin-left: 10px; ">配速 {{speed}} m/s</text>
				<text space="nbsp" style="font-size:19px ;margin-left: 15px; ">步数 {{step_num}}</text>
				<view style="margin-top: 10px;display: flex;">
					<text space="nbsp" style="font-size:19px ;margin-left: 10px;margin-top: 8px; ">用时</text>
					<view style="width: 70%;height: 50px;margin-left: 7px;">
						<view class="wrap" style=" width: 100%;height: 40px;">
							<view class="box" :class="{'circle':item === ':','clear':item === ':'&&!close,'active':item === ':'&&twinkle}"
							 v-for="(item,index) in list" :key="index">
								<block v-if="item === ':'">
									<view v-if="close" class="circle-box "></view>
									<view v-if="close" class="circle-box "></view>
								</block>
								<block v-else>
									<view :class="{'box-top':idx === 0 , 'box-bottom':idx === 1 }" v-for="(num , idx) in 2" :key="idx">
										<view v-if="idx === 0" class="box-top-top" :class="{'active':timeList[item][0]}"></view>
										<view class="box-top-right" :class="{'active':timeList[item][idx===0 ?1:4]}"></view>
										<view class="box-top-bottom" :class="{'active':timeList[item][idx===0 ?2:5]}"></view>
										<view class="box-top-left " :class="{'active':timeList[item][idx===0 ?3:6]}"></view>
									</view>
								</block>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin:0px 20px;">
			<text style="font-weight:bold;font-size:16px;">要点</text>
			<view v-for="(item,index) in Keystone" :key="index">
				<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
				<text style="color: #666666;font-size:14px ;">{{item}}</text>
			</view>
		</view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map :show-location="showLocation" style="width: 100%; height: 350px;" :polyline="Polyline" :latitude="location.latitude"
				 :longitude="location.longitude" :markers="covers">
				</map>
			</view>
		</view>

		<button v-if="begin1" class="begin_class" @click="begin">开始</button>
		<button v-if="!begin1" class="end_class" @click="end">结束并提交</button>
	</view>
</template>

<script>
	const testPolyline = [{
		points: [{
				latitude: 39.925539,
				longitude: 116.279037
			},
			{
				latitude: 39.925539,
				longitude: 116.520285
			}
		],
		color: '#FFCCFF',
		width: 7,
		dottedLine: true,
		arrowLine: true,
		borderColor: '#000000',
		borderWidth: 2
	}];

	var _this;
	export default {
		data() {
			return {
				Keystone: [
					"上体前倾，头部稍倾斜前伸，目视前方，两臂自然弯曲，双手轻而有力地握住车把",
					"腰部弓屈，双脚做垂直的园周蹬踏动作，避免两腿左右摇摆，将体重比较均匀的分配在臀部、两脚和双手上",
					"骑行前：鼻吸口呼;平路骑行：腹式呼吸;爬坡时：急吸快吐"
				],
				icon_suspend: false,
				twinkle: false,
				close: true,
				// 定义时间显示规律
				timeList: {
					'1': [false, true, false, false, true, false, false],
					'2': [true, true, true, false, false, true, true],
					'3': [true, true, true, false, true, true, false],
					'4': [false, true, true, true, true, false, false],
					'5': [true, false, true, true, true, true, false],
					'6': [true, false, true, true, true, true, true],
					'7': [true, true, false, false, true, false, false],
					'8': [true, true, true, true, true, true, true],
					'9': [true, true, true, true, true, true, false],
					'0': [true, true, false, true, true, true, true]
				},
				list: [0, 0, ':', 0, 0, ':', 0, 0], // 显示时间
				icon_begin: false,
				begin1: true,
				step_num: 0,
				time: 0,
				dis: 0,
				distance: 0,
				speed: '0',
				showLocation: true,
				timer: null,
				timer1: null,
				Polyline: [{
					points: [],
					color: '#000000',
					width: 4,
					dottedLine: true,
					arrowLine: true,
					borderColor: '#000000',
					borderWidth: 2
				}],
				location: {
					longitude: 116.3974770000,
					latitude: 39.9086920000
				},
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 23.109,
				longitude: 113.20804,
				covers: [{
					latitude: 39.9091,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}]
			}
		},
		onLoad() {
			_this = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					_this.location.longitude = res.longitude
					_this.location.latitude = res.latitude
					_this.covers[0].latitude = res.latitude
					_this.covers[0].longitude = res.longitude

					_this.Polyline[0].points.push({
						latitude: res.latitude,
						longitude: res.longitude
					});
					console.log(_this.Polyline[0]);
				},
				fail: (e) => {
					console.log(JSON.stringify(e));
				}
			});
		},
		methods: {
			timeMeter() {
				let num = this.list[7];
				clearInterval(this.timer1);
				this.timer1 = setInterval(() => {
					num++;
					// 倒计时
					if (num > 9) {
						this.$set(this.list, 7, 0);
						num = this.list[6];
						num++;
						this.$set(this.list, 6, num);
						if (num > 5) {
							this.$set(this.list, 6, 0);
							num = this.list[4];
							num++;
							this.$set(this.list, 4, num);
							if (num > 9) {
								this.$set(this.list, 4, 0);
								num = this.list[3];
								num++;
								this.$set(this.list, 3, num);
								if (num > 5) {
									this.$set(this.list, 3, 0);
									num = this.list[1];
									num++;
									this.$set(this.list, 1, num);
									if (num > 9) {
										this.$set(this.list, 1, 0);
										num = this.list[0];
										num++;
										this.$set(this.list, 0, num);
										if (num > 5) {
											this.$set(this.list, 0, 0);
											// 如果时间到底，不循环就打开这段代码
											// clearInterval(this.timer);
										}
									}
								}
							}
						}
						num = 0;
					}
					this.$set(this.list, 7, num);
				}, 1000);
			},
			/**
			 * 时间格式化
			 */
			Format(fmt) {
				let date = new Date(fmt);
				var o = {
					h: date.getHours(), //小时
					m: date.getMinutes(), //分
					s: date.getSeconds() //秒
				};
				// console.log(o.h, o.m, o.s);
				return (
					(o.h < 10 ? '0' + o.h : o.h) +
					':' +
					(o.m < 10 ? '0' + o.m : o.m) +
					':' +
					(o.s < 10 ? '0' + o.s : o.s)
				);
			},
			/**
			 * 字符串转数组
			 */
			strToArr(str, num) {
				if (num === 1) {
					return str.split('');
				}
				if (num === 2) {
					return [
						str.split('')[0],
						str.split('')[1],
						str.split('')[2],
						str.split('')[3],
						str.split('')[4]
					];
				}
			},
			
			end() {
				clearInterval(this.timer1);
				clearInterval(this.timer);
				_this.begin1=true;
				console.log(_this.list);
				try {
					const value = uni.getStorageSync('userid');
					if (value) {
						console.log(value);
						uni.request({
							url: this.apiServer + 'user/sport/train',
							method: "POST",
							data: {
								"action": "addSportRecord",
								"data": {
									"sportid": 13,
									"userid": value,
									"number":0,
									"duration":_this.list,
									"distance":_this.distance
								}
							},
							success: (res) => {
								console.log(res.data);
								uni.showModal({
									content: res.data.msg,
									showCancel: false,
									success: function(res) {
										console.log('用户点击确定');
										
										_this.begin1=true
										_this.distance=0
										_this.step_num=0
										_this.Polyline[0].points=[]
										_this.speed = 0
										_this.list = [0, 0, ':', 0, 0, ':', 0, 0]
										
									}
								});
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
			begin() {
				this.timeMeter();
				_this.begin1=false;
				var d = 0,
					d1 = 0,
					a = 0;
				this.timer = setInterval(() => {
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
							_this.location.longitude = res.longitude
							_this.location.latitude = res.latitude
							_this.covers[0].latitude = res.latitude
							_this.covers[0].longitude = res.longitude
							console.log(res);
							_this.Polyline[0].points.push({
								latitude: res.latitude,
								longitude: res.longitude
							});
							console.log(_this.Polyline[0]);

							if (res.speed == null || res.speed == 0) {
								_this.speed = 0

							} else {
								_this.speed = parseFloat(res.speed).toFixed(2)
								d += res.speed
								console.log(d);

								_this.step_num = parseFloat(d * 2).toFixed(0)
								_this.dis += (res.speed / 1000)

								_this.distance = parseFloat(_this.dis).toFixed(2)
							}
							_this.time += 1

							console.log(_this.distance);
						},
						fail: (e) => {
							console.log(JSON.stringify(e));
						}
					});
				}, 2000);

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './mehaotian-numled.scss';

	.margin-left1 {
		margin-left: 300upx;
	}

	.round {
		border-radius: 5000upx;
	}

	.cu-avatar.xl {
		width: 128upx;
		height: 128upx;
		font-size: 2.5em;
	}

	.cu-avatar {
		font-variant: small-caps;
		margin: 15px;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: #ccc;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 64upx;
		height: 64upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}

	.cuIcon-playfill:before {
		content: "\e74f";
	}

	.cuIcon-stop:before {
		content: "\e750";
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.demo-popup {
		.s-popup-wrapper {}
	}

	.begin_class {
		
		width: 100%;
		background-color: #666666;
		color: #FFFFFF;
	}

	.end_class {
		
		width: 100%;
		background-color: #F43F3B;
		color: #FFFFFF;
	}

	.cuIcon-title {
		color: #666666;
	}

	.demo_line_05 {
		width: 100%;
		letter-spacing: -10px;
		color: #ddd;
	}

	.demo_line_02 {
		height: 1px;
		border-top: 1px solid #ddd;
		text-align: center;
	}


	.wrap {
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;

		.content-box {
			display: flex;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
		}

		.box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin: 2%;
			box-sizing: border-box;

			&.circle {
				width: 20%;

				.circle-box {
					width: 100%;
					height: 0;
					padding-top: 100%;
					background: #72303b;

					&:last-child {
						margin-top: 200%;
					}
				}

				&.active {
					opacity: 0.05;
					animation: twinkle 1s infinite;
				}

				@keyframes twinkle {

					0%,
					100% {
						opacity: 0;
					}

					50% {
						opacity: 1;
					}
				}
			}

			&.clear {
				display: none;
			}

			.box-top,
			.box-bottom {
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;

				&.box-top {
					.box-top-top {
						top: 0;
						left: 0;
						width: 100%;
						height: $border-width;
						@include diffstyle($imgtTansverse);
					}

					.box-top-right {
						top: 0;
						right: 0;
						width: $border-width;
						height: 100%;
						@include diffstyle($imgVertical);
					}

					.box-top-bottom {
						bottom: 0;
						height: $border-width;
						width: 100%;
						@include diffstyle($imgtTansverse);
					}

					.box-top-left {
						top: 0;
						left: 0;
						width: $border-width;
						height: 100%;
						@include diffstyle($imgVertical);
					}
				}

				&.box-bottom {
					margin-top: -$border-width;

					.box-top-right {
						top: 0;
						right: 0;
						width: $border-width;
						height: 100%;
						@include diffstyle($imgVertical);
					}

					.box-top-bottom {
						bottom: 0;
						height: $border-width;
						width: 100%;
						@include diffstyle($imgtTansverse);
					}

					.box-top-left {
						top: 0;
						left: 0;
						width: $border-width;
						height: 100%;
						@include diffstyle($imgVertical);
					}
				}
			}
		}
	}
</style>