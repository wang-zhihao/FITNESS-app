<template>
	<view>
		<view class="content">
			<mrpzx-checker-box  ref="questionChecker" @on-change="onChange_Purpose" type="radio"
			 v-model="Purpose.value" :class="{'item-selected': isCheck}">
				<view class="title">目的</view>
				<mrpzx-checker-item @checkItem="contentClick" :iconType="iconType" :checked="false" :value="vo.id" index="Purpose"
				 v-for="(vo, index) in Purpose" :key="index">
					<view class="answer">{{vo.title}}</view>
					<view class="line"></view>
				</mrpzx-checker-item>
			</mrpzx-checker-box>
		</view>
		<view class="content">
			<mrpzx-checker-box ref="questionChecker" @on-change="onChange_Training_focus" type="checkbox" v-model="Training_focus.value"
			 :class="{'item-selected': isCheck}">
				<view class="title">训练重点（最多选择两个）</view>
				<mrpzx-checker-item @checkItem="contentClick" :iconType="iconType" :checked="false" :value="vo.id" index="Training_focus"
				 v-for="(vo, index) in Training_focus" :key="index">
					<view class="answer">{{vo.title}}</view>
					<view class="line"></view>
				</mrpzx-checker-item>
			</mrpzx-checker-box>
		</view>
		<view class="content">
			<mrpzx-checker-box  ref="questionChecker" @on-change="onChange_time" type="radio" v-model="time.value"
			 :class="{'item-selected': isCheck}">
				<view class="title">每日训练时间</view>
				<mrpzx-checker-item @checkItem="contentClick" :iconType="iconType" :checked="false" :value="vo.id" index="time"
				 v-for="(vo, index) in time" :key="index">
					<view class="answer">{{vo.title}}</view>
					<view class="line"></view>
				</mrpzx-checker-item>
			</mrpzx-checker-box>
		</view>
		<button @click="changeplan" style="width: 100%;background-color: #666666;
	color: #FFFFFF;">更改</button>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				Choice_time: '',
				Choice_Purpose: '',
				Choice_Training_focus: '',
				time: [{
						id: 1,
						title: '10-20分钟'
					}, {
						id: 2,
						title: '20-30分钟'
					},
					{
						id: 3,
						title: '30-40分钟'
					}
				],
				type: 'radio',
				isCheck: !1,
				Purpose: [{
					id: 1,
					title: '减脂'
				}, {
					id: 2,
					title: '增肌'
				}],

				Training_focus: [{
						id: 1,
						title: '胸部'
					}, {
						id: 2,
						title: '肩部'
					}, {
						id: 3,
						title: '背部'
					}, {
						id: 4,
						title: '腰部'
					}, {
						id: 5,
						title: '腹部'
					},
					{
						id: 6,
						title: '臀部'
					},
					{
						id: 7,
						title: '腿部'
					},
					{
						id: 8,
						title: '手臂'
					}
				],
				question: {
					title: '训练重点',
					value: 0,
					answer: [{
						id: 1,
						title: '25岁以下（含）'
					}, {
						id: 2,
						title: '26-35岁'
					}, {
						id: 3,
						title: '36-45岁'
					}, {
						id: 4,
						title: '46-55岁'
					}, {
						id: 5,
						title: '56岁以上'
					}]
				}
			}
		},
		onLoad() {
			_this = this;

		},
		computed: {
			iconType() {
				return this.type == 'radio' ? 'circle' : 'box'
			}
		},
		methods: {
			changeplan() {
				try {
					const userid = uni.getStorageSync('userid');
					const token = uni.getStorageSync('TOKEN');
					if (userid) {
						console.log(userid);
						uni.request({
							url: this.apiServer + 'user/plan',
							method: "POST",
							data: {
								"action": "changeplan",
								"data": {
									"Choice_Purpose": _this.Choice_Purpose,
									"userid": userid,
									"Choice_time": _this.Choice_time,
									"Choice_Training_focus": _this.Choice_Training_focus,
									"token": token
								}
							},
							success: (res) => {
								console.log(res.data);

								uni.showModal({
									content: res.data.msg,
									showCancel: false,
									success: function(res) {
										console.log('用户点击确定');
										uni.reLaunch({
											url: 'jihua'
										});
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

			contentClick(isCheck, index, value) {

				this.isCheck = isCheck
				console.log('isCheck: ' + isCheck + "\n" + 'index: ' + index + "\n" + 'value:' + value)
				console.log((isCheck ? '选中了：' : '取消选中') + value)
				console.log('question.value: ' + JSON.stringify(this.Purpose.value))
			},
			onChange_time(value, isCheck) {
				_this.Choice_time = value
				console.log('Choice_time' + _this.Choice_time)
				console.log('changed: ' + JSON.stringify([value, isCheck]))
			},
			onChange_Purpose(value, isCheck) {
				_this.Choice_Purpose = value
				console.log('Choice_Purpose' + _this.Choice_Purpose)
				console.log('changed: ' + JSON.stringify([value, isCheck]))
			},
			onChange_Training_focus(value, isCheck) {
				_this.Choice_Training_focus = value
				console.log('Choice_Training_focus' + _this.Choice_Training_focus)
				console.log('changed: ' + JSON.stringify([value, isCheck]))
			},
			onOptionChange(value, isCheck) {
				if (value !== this.type) {
					this.$refs.questionChecker.clearCheck()
				}
				this.type = value
			}
		}
	}
</script>

<style>
	.checker-box .title {
		padding: 42rpx 0 40rpx;
		font-size: 40rpx;
		min-height: 10px;
		color: #33353f;
		margin: 0 38rpx;
		max-height: 190rpx;
		line-height: 54rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box
	}

	.checker-box .checker-item .answer {
		display: inline-block;
		padding: 48rpx 0;
		min-height: 10px;
		font-size: 32rpx;
		line-height: 44rpx;
		width: 92%
	}

	.checker-box .item-selected .checker-item-tag .answer {
		color: #2e5bff;
		min-height: 10px;
		font-weight: 700;
	}
</style>
