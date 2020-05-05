<template>
	<view>
		<image style="width:100%;height:320px;" mode='widthFix' :src="'../../../static/sport/xunlian/'+sportid+'.jpg'">

		</image>
		<view style="width: 100%;">
			<view class="wrap" style="position: relative; left: 35%;bottom: 50px; width: 30%;">
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
				<text class="lg text-gray" @click="clock_begin" :class="'cuIcon-playfill'" v-if="icon_begin"></text>
				<text class="lg text-gray" @click="clock_stop" v-if="icon_suspend" :class="'cuIcon-stop'"></text>
			</view>
		</view>
		<view style="margin:10px;padding-bottom:10px;border-bottom-style:groove;border-width:0.1px;border-color: #E7EBED;">
			<text style="margin:8px 20px;font-size:20px;font-weight:bold;">{{traininfo.sportname}}</text>


		</view>
		<view style="margin:0px 20px;">
			<text style="font-weight:bold;font-size:16px;">步骤</text>
			<view v-for="(item,index) in traininfo.step" :key="index">
				<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
				
				<text style=" color: #666666;font-size:14px ;">{{item}}</text>
			</view>
			<text style="font-weight:bold;font-size:16px;">呼吸</text>
			<view v-for="(item,index) in traininfo.breath" :key="index">
				<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
				<text style="color: #666666;font-size:15px ;">{{item}}</text>
			</view>
			<text style="font-weight:bold;font-size:16px;">动作感受</text>
			<view v-for="(item,index) in traininfo.feeling" :key="index">
				<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
				<text style="color: #666666;font-size:15px ;">{{item}}</text>
			</view>
			<text style="font-weight:bold;font-size:16px;">常见错误</text>
			<view v-for="(item,index) in traininfo.com_mistakes" :key="index">
				<text style="color: #666666;" class="lg text-gray" :class="'cuIcon-title'"></text>
				<text style="color: #666666;font-size:15px ;">{{item}}</text>
			</view>

		</view>

		<s-popup custom-class="demo-popup" v-model="is_Submit">
			<!-- 内容 -->
			<view style="width: 200px;height: 200px;background-color:#F8F8F8 ;">

				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-column">
						<view class="title" style="text-align:center ;">请输入训练个数</view>
						<input class="uni-input" name="input" style="text-align: center;font-size: 25px; height: 50px; margin: 10px;background-color: #FFFFFF;" />
					</view>
					<view class="uni-btn-v" style="flex-wrap:nowrap ;display: flex;">
						<button plain="true" style="margin-top:30px;width: 90%;" form-type="submit">提交</button>

					</view>
				</form>

			</view>

		</s-popup>
		<view style="height: 50px;"></view>
		<button @click="begin" v-bind:class="{begin_class:begin1,'end_class':end1}">{{butt}}</button>

	</view>
</template>

<script>
	var _this;
	import sPopup from '@/components/s-popup';
	import "@/colorui/icon.css";

	export default {
		components: {
			
			sPopup
		},
		data() {
			return {
				sportid: '', //训练动作id
				sportinfo: '', //包含某个运动所有信息

				icon_suspend: false,
				icon_begin: false,
				visible: true,
				is_Submit: false,
				begin1: true,
				end1: false,
				close: true,
				twinkle: false,
				valArr: [],
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
				timer: null,
				timeinfo1: false,
				butt: '开始',

				index1: '',
				index2: '',
				index3: '',
				traininfo: {

				}
			}
		},
		created() {
			if (this.mode === 3) {
				console.log(this.option)

				if (this.option == 0) {
					this.timeMeter();
				}
			}
		},
		onLoad(e) {
			_this=this
			console.log(e.sportid)
			_this.sportid = e.sportid;
			uni.request({
				url: this.apiServer + 'user/sport/train',
				method: "GET",
				data: {
					action: 'findSportInfoById',
					type: 1,
					sportid: e.sportid,
				},
				success: (res) => {
					console.log(res.data);
					this.traininfo = res.data.traininfo
					console.log(this.traininfo)
				},
				fail: (e) => {
					console.log(JSON.stringify(e));
				}
			})
		},
		methods: {
			clock_stop() {
				clearInterval(this.timer);
				this.icon_begin = true
				this.icon_suspend = false
			},
			clock_begin() {
				this.timeMeter();
				this.icon_begin = false
				this.icon_suspend = true
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log(e.detail.value.input)
				var formdata = e.detail.value

				try {
					const value = uni.getStorageSync('userid');
					if (value) {
						for (var i=0;i<_this.list.length;i++)
						{  console.log("a:"+typeof(_this.list[i]));
						   
						}
						console.log(value);
						uni.request({
							url: this.apiServer + 'user/sport/train',
							method: "POST",
							data: {
								"action": "addSportRecord",
								"data": {
									"sportid": this.sportid,
									"userid": value,
									"number": e.detail.value.input,
									"duration":_this.list,
									"distance":0
								}
							},
							success: (res) => {
								console.log(res.data);
								uni.showModal({
									content: res.data.msg,
									showCancel: false,
									success: function(res) {
										console.log('用户点击确定');
										_this.is_Submit=false
										_this.begin1=true
										_this.end1=false
										_this.icon_suspend=false
										_this.icon_begin=false
										_this.butt = '开始'
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


				this.is_Submit = false
				console.log(this.is_Submit)
				if (this.begin1 == true) {
					this.butt = '结束并提交'
					this.timeMeter();
					console.log("开始")
					this.begin1 = false
					this.end1 = true
					this.icon_suspend = true
				} else {

					this.clock_stop();
					console.log("提交")
					console.log(this.list);
					this.is_Submit = true
					console.log(this.is_Submit)
					clearInterval(this.timer);
				}
			},
			timeMeter() {

				let num = this.list[7];
				clearInterval(this.timer);
				this.timer = setInterval(() => {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './mehaotian-numled.scss';
	
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
