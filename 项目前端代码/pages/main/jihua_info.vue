<template>
	<view>
		<image style="width:100%;height:250px;" mode='aspectFill' :src="imageurl">
		</image>
		<view style="margin:10px;padding-bottom:10px;">
			<text style="margin:8px 20px;font-size:28px;">{{courseInfo.name}}\n</text>
			<view style="margin:5px 10px;">
				<text style="color: #666666;font-size:14px ;">{{courseInfo.type}}</text>
			</view>
			<view style="display: flex;">
				<!-- <text>目的:{{courseInfo.Purpose}}</text> -->
				<view style="display: flex;flex-direction: column;">
				<text>重点训练部位</text>
				<view style="display: flex;flex-direction: column;width: 90px;" v-for="(item,index) in courseInfo.Key_position" :key="index">
					<text style=" font-size: 14px;color: #666666;">{{item}}</text>
				</view>
				</view>
				<view style="position: absolute;right: 80px;">
					<text>目的：{{courseInfo.Purpose}}</text>
				</view>
			</view>
			<view>


				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">

					<view v-for="(item,index) in courseInfo.trains" :key="index" id='demo1' class="scroll-view-item_H">
						<view class="cu-card case" @click="togglePopup(index,'bottom', 'popup')">
							<view class="cu-item shadow">
								<view url="meditation" hover-class="navigator-hover">
									<view class="image">
										<image style="height: 100px;" :src="'../../static/sport/xunlian/'+item.id+'.jpg'" mode="aspectFill"></image>
										<view class="cu-tag bg-blue">官方</view>
										<view class="cu-bar bg-shadeBottom">
											<text style="margin-top:50px ;font-size: 14px;" class="text-cut">{{item.name}}</text>
										</view>
									</view>

								</view>
							</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</view>
		<button v-if="begin1" class="begin_class" @click="begin">完成课程</button>

		<view class="example-body">
			<uni-popup margin-top='300px' ref="showpopup" :type="type" @change="change">
				<view style="background-color: #FFFFFF;padding-bottom: 20px;">
					<view style="margin:20px;padding:10px 0px;border-bottom-style:groove;border-width:0.1px;border-color: #E7EBED;">
						<text style="margin:20px 20px;font-size:20px;font-weight:bold;">{{trainInfo.name}}</text>


					</view>
					<view style="margin:0px 20px;">
						<text style="font-weight:bold;font-size:16px;">步骤</text>
						<view v-for="(item,index) in trainInfo.step" :key="index">
							<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>

							<text style=" color: #666666;font-size:14px ;">{{item}}</text>
						</view>
						<text style="font-weight:bold;font-size:16px;">呼吸</text>
						<view v-for="(item,index) in trainInfo.breath" :key="index">
							<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
							<text style="color: #666666;font-size:15px ;">{{item}}</text>
						</view>
						<text style="font-weight:bold;font-size:16px;">动作感受</text>
						<view v-for="(item,index) in trainInfo.feeling" :key="index">
							<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
							<text style="color: #666666;font-size:15px ;">{{item}}</text>
						</view>
						<text style="font-weight:bold;font-size:16px;">常见错误</text>
						<view v-if="ismistakes" v-for="(item,index) in trainInfo.com_mistakes" :key="index">
							<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
							<text style="color: #666666;font-size:15px ;">{{item}}</text>
						</view>
					</view>
				</view>
				
			</uni-popup>
		</view>
		<view style="height: 30px;"></view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import "@/colorui/icon.css";
	var _this;
	export default {
		components: {uniPopup},
		data() {
			return {
				ismistakes: false,
				trainInfo:{},
				courseid: '',
				type: '',
				begin1: true,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				courseInfo: {

				},
				imageurl: '../../static/plan/plan_course'
			}
		},
		onLoad(e) {
			_this = this;
			console.log(e.type)
			_this.courseid = e.courseid
			_this.imageurl = _this.imageurl + e.type + '.jpg'
			const token = uni.getStorageSync('TOKEN');
			uni.request({
				url: this.apiServer + 'user/plan',
				method: "GET",
				data: {
					"action": "findCourseById",
					"token": token,
					"courseid": e.courseid
				},
				success: (res) => {
					console.log(res.data);
					_this.courseInfo = res.data.courseInfo
				},
				fail: (e) => {
					console.log(JSON.stringify(e));
				}
			})
		},
		methods: {
			begin(){
				uni.reLaunch({
					url:'jihua'
				})
				// const userid = uni.getStorageSync('userid');
				// uni.request({
				// 	url: this.apiServer + 'user/plan',
				// 	method: "GET",
				// 	data: {
				// 		"action": "finish",
				// 		"token": token,
				// 		"plan"
				// 		"userid": const userid = uni.getStorageSync('userid');
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		_this.courseInfo = res.data.courseInfo
				// 	},
				// 	fail: (e) => {
				// 		console.log(JSON.stringify(e));
				// 	}
				// })
			},
			openYoga(e) {
				_this.yogaInfo = '';
				console.log(e);
				_this.yogaInfo = _this.yogas[e]
				console.log(_this.yogaInfo)
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			togglePopup(e, type, open) {
				_this.trainInfo = '';
				console.log(e);
				_this.trainInfo = _this.courseInfo.trains[e]
				console.log(_this.trainInfo)
				console.log(_this.courseInfo)
				if (_this.trainInfo.com_mistakes[0] == '') {
					_this.ismistakes = false

				} else {
					_this.ismistakes = true
					console.log("有常见错误")
				}
				switch (type) {
					case 'top':
						_this.content = '顶部弹出 popup'
						break

					case 'bottom':
						_this.content = '底部弹出 popup'
						break
					case 'center':
						_this.content = '居中弹出 popup'
						break
				}
				_this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './sport/mehaotian-numled.scss';

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

	@keyframes cuIcon-spin {
		0% {
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}

		100% {
			-webkit-transform: rotate(359deg);
			transform: rotate(359deg);
		}
	}

	[class*="cuIcon-"] {
		font-family: "cuIcon";
		font-size: inherit;
		font-style: normal;
	}

	view,
	scroll-view,
	swiper,
	button,
	input,
	textarea,
	label,
	navigator,
	image {
		box-sizing: border-box;
	}

	image {
		max-width: 100%;
		display: inline-block;
		position: relative;
		z-index: 0;
	}

	.time-big {
		font-size: 60rpx;
		margin: 20rpx;
	}

	.uni-center {
		text-align: center;
	}

	.uni-padding-wrap {
		width: 690rpx;
		padding: 0 30rpx;
	}

	.text-gray,
	.line-gray,
	.lines-gray {
		color: #aaaaaa;
	}

	.cuIcon-titles:before {
		content: "\e701";
	}

	.cuIcon-title:before {
		content: "\e82f";
	}

	.cu-tag {
		font-size: 24upx;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0upx 16upx;
		height: 48upx;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: nowrap;
	}

	.cu-card.case .image .cu-tag {
		position: absolute;
		right: 0;
		top: 0;
	}

	.cu-card.case .image {
		position: relative;
	}

	.cu-card>.cu-item.shadow-blur {
		overflow: initial;
	}



	.text-cut {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;

	}

	.bg-shadeBottom {
		background-image: linear-gradient(rgba(120, 120, 120, 0), rgba(195, 195, 195, 255));
		color: #ffffff;
	}

	.cu-card {
		display: block;
		overflow: hidden;
	}

	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 110px;
		justify-content: space-between;
	}

	.text-lg {
		font-size: 32upx;
	}

	.cu-card>.cu-item {
		display: block;
		background-color: #ffffff;
		overflow: hidden;
		border-radius: 10upx;
		margin: 30upx 30upx 0upx 30upx;
	}

	.cu-card.case .image .cu-bar {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: transparent;
		padding: 20upx 30upx;
	}

	.begin_class {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		background-color: #666666;
		color: #FFFFFF;
	}

	.end_class {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		background-color: #F43F3B;
		color: #FFFFFF;
	}

	.bg-img {
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}

	.uni-bg-red {
		background: #F76260;
		color: #FFF;
	}

	.uni-bg-green {
		background: #09BB07;
		color: #FFF;
	}

	.bg-blue {
		background-color: #0081ff;
		color: #ffffff;
	}

	.uni-bg-blue {
		background: #007AFF;
		color: #FFF;
	}

	.scroll-Y {
		height: 300rpx;
	}

	.scroll-view_H {
		margin-top: 10px;
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		margin: 0px 0px;
		display: inline-block;
		width: 60%;
		height: 250rpx;
		line-height: 30px;
		text-align: center;
		font-size: 36rpx;
	}
</style>
