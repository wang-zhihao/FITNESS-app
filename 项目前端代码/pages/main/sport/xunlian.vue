<template>
	<view>
		<view class="xunlian_head" style="background-color: #f7f7f7;">
			<label class="uni-title" style="font-size:17px;color:#787468;">训练部位</label>

			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="uni-input">{{array[index]}}</view>
			</picker>
		</view>
		<view v-for="(item,index) in list" :key="index">
		<navigator class='train_list' :url="'./xunlian_info?sportid='+item.id">
			<image :src="'../../../static/sport/xunlian/'+item.id+'.jpg'" style="width: 120px;height: 70px;" mode='aspectFill'></image>
			<view class="train_name">
				{{item.sportname}}
			</view>
			<view class="wag" v-for="(item,index) in item.difficulty_level" :key="index">
				<view class=" cu-list grid col-3">
					<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
						<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>

					</view>
				</view>
			</view>

		</navigator>
		</view>
	</view>
</template>

<script>
	var _this;
	import "@/colorui/icon.css"
	
	export default {
		components: {
			
		},
		data() {
			return {
				cuIcon: [{
					name: 'lightfill',
					isShow: true
				}],
				array: ['全身', '胸部', '背部', '肩部', '手臂', '颈部', '腹部', '腰部', '臀部', '腿部'],
				index: 0,
				train: {
					sport_name: "扩胸",
					main_points: [
						"抬头挺胸，绷紧腹部",
						"掌心向前，双臂同时交替打开"
					],
					breath: [
						"合掌呼气，扩胸吸气"
					],
					action_feel: [
						"感受腹部的拉升"
					],
					com_mistakes: [
						"动作太快或过于僵硬"
					],
					Solution: [
						"双臂放松，配合呼吸，有节奏地开合"
					]
				},
				list:[],
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				try {
				    const token = uni.getStorageSync('TOKEN');
				    if (token) {
				        console.log(token);
						uni.request({
							url: this.apiServer+'user/sport/train',
							method:"GET",							
							data: {
								action:'findSportByPosition',
								type:1,
								position:this.index,
								TOKEN:token
							},						
							success: (res) => {
								console.log(res.data.msg);
								this.list=res.data.msg
								console.log(this.list)
							},
							fail: (e) => {
								console.log(JSON.stringify(e));
							}
						})
				    }
				} catch (e) {
					console.log(e)
				    // error
				}
				
			},
		}
	}
</script>

<style>
	.xunlian_head {
		display: flex;
		width: 100%;
		height: 20px;
		border-top-style: solid;
		border-bottom-style: solid;
		border-color: #000000;
		border-width: 0.1px;
		margin: 0upx;
		padding: 12px;
	}

	.train_list {
		display: flex;
		width: 94%;
		padding: 30upx 3%;
		border-bottom-style: solid;
		border-color: #000000;
		border-width: 0.1px;
		flex-wrap: nowrap;
	}

	.train_list image {
		width: 200upx;
		margin-right: 12upx;
		flex-shrink: 0;
	}

	.train_name {
		width: 100%;
		background-color: #ffffff;
		height: auto;
		font-size: 35upx;
		margin: 0upx 20upx;
	}

	.uni-input {
		font-size: 18px;
	}

	.uni-title {
		display: flex;
		width: 200upx;
		margin-left: 100px;
	}

	.uni-title picker {
		width: 20upx;
	}

	.uni-list-cell {
		justify-content: flex-start
	}
</style>
