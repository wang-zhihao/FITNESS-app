<template>
	<view>
		<view class="xunlian_head" style="background-color: #f7f7f7;">
			<label class="uni-title" style="font-size:17px;color:#787468;">运动类目</label>

			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="uni-input">{{array[index]}}</view>
			</picker>
		</view>
		<view v-for="(item,index) in runRecordList" :key="index">
			<view class='train_list' v-if="isrun">
				<view style="display: flex;flex-direction: column;">
					<view style="height: 25px;" class="train_name">
						{{item.sportname}}
					</view>
					<text style="font-size: 15px;margin: 10upx 20upx;;">{{item.duration}}</text>
				</view>
				<text style="font-weight:bold;margin: 15px 10px;">{{item.kilometres}}公里</text>
				<view>
					<text style="margin-top: 10px; width: 80px; position:absolute; font-size: 13px;
					right: 20px;">{{item.date}}</text>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in trainRecordList" :key="index">
			<view class='train_list' v-if="istrain">
				<view style="display: flex;flex-direction: column;">
					<view style="height: 25px;" class="train_name">
						{{item.sportname}}
					</view>
					<text style="font-size: 15px;margin: 10upx 20upx;;">{{item.duration}}</text>
				</view>
				<text style="font-weight:bold;margin: 15px 10px;">{{item.number}}个</text>
				<view>
					<text style="margin-top: 10px; width: 80px; position:absolute; font-size: 13px;right: 20px;">{{item.date}}</text>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in y_mList" :key="index">
			<view class='train_list' v-if="isy_m">
				<view style="display: flex;flex-direction: column;">
					<view style="height: 25px;" class="train_name">
						{{item.sportname}}
					</view>
					<text style="font-size: 15px;margin: 10upx 20upx;;">{{item.duration}}</text>
				</view>
				
				<view>
					<text style="margin-top: 10px; width: 80px; position:absolute; font-size: 13px;right: 20px;">{{item.date}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	var userid;
	var token;
	export default {
		data() {
			return {
				isy_m:false,
				istrain:false,
				isrun: false,
				kilometres: '0.08',
				duration: '00:19:36',
				date: '2020-04-12 22:19:36',
				type: 2,
				y_mList:[],
				trainRecordList:[],
				runRecordList:[],
				list: [{
						sportname: "跑步",
					},
					{
						sportname: "瑜伽",
					},
					{
						sportname: "冥想",
					},
					{
						sportname: "骑行",
					}
				],
				index: 0,
				array: ['训练', '跑步', '瑜伽', '骑行', '冥想'],
			}
		},
		onLoad() {
			_this=this;
			try {
				userid = uni.getStorageSync('userid');
				token = uni.getStorageSync('TOKEN');
				console.log(userid);
				console.log(token);


			} catch (e) {
				console.log(e)
				// error
			}
		},
		methods: {
			findRunRecord(e) {
				console.log("查找跑步记录")
				console.log(token);
				uni.request({
					url: this.apiServer + 'user/sport/train',
					method: "GET",
					data: {
						action: 'findRunRecord',
						type: e,
						TOKEN: token,
						userid:userid,
						
					},
					success: (res) => {
						console.log(res.data);
						_this.runRecordList= res.data.sportRecord
						_this.isrun=true
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			findTrainRecord(e) {
				console.log(token);
				uni.request({
					url: this.apiServer + 'user/sport/train',
					method: "GET",
					data: {
						action: 'findTrainRecord',
						type: 1,
						TOKEN: token,
						userid:userid,
					},
					success: (res) => {
						console.log(res.data.msg);
						console.log(res.data.sportRecord);
						_this.trainRecordList=res.data.sportRecord
						_this.istrain=true
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			findY_MRecord(e) {
				let t;
				if(e==2){
					t=2
				}else if(e==4){
					t=5
				}
				console.log(token);
				uni.request({
					url: this.apiServer + 'user/sport/train',
					method: "GET",
					data: {
						action: 'findY_MRecord',
						type: t,
						TOKEN: token,
						userid:userid,
					},
					success: (res) => {
						console.log(res.data.msg);
						console.log(res.data.sportRecord);
						_this.y_mList = res.data.sportRecord
						_this.isy_m=true
						
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				})
			},
			bindPickerChange: function(e) {
				_this.isrun=false;
				_this.istrain=false;
				_this.isy_m=false;
				console.log('picker发送选择改变，携带值为', e.target.value);
				console.log(typeof(e.target.value));
				_this.index = e.target.value;
				console.log(_this.index)
				if (e.target.value == 1 || e.target.value == 3) {
					_this.findRunRecord(e.target.value);
				} else if (e.target.value == 0) {
					_this.findTrainRecord(e.target.value);
				} else if(e.target.value == 2 || e.target.value == 4){
					_this.findY_MRecord(e.target.value);
				}


			},
		}
	}
</script>

<style>
	.train_name {
		display: flex;
		flex-direction: row;

		background-color: #ffffff;
		height: auto;
		font-size: 35upx;
		margin: 0upx 20upx;
	}

	.train_list {

		height: 60px;
		display: flex;
		width: 94%;
		padding: 20upx 3%;
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

	.uni-title {
		display: flex;
		width: 200upx;
		margin-left: 100px;
	}

	.uni-title picker {
		width: 20upx;
	}
</style>
