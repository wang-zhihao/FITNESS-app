<template>
	<view style="background-color: #fbfff7;">
		<view style="margin: 20px;">
			<text style="color:#c1dba5;font-weight:bold;font-size:22px;">冥想\n</text>
			<text style="color:#c1dba5;font-size:15px;">瑜伽者通过冥想来制服心灵，并超脱物质欲念；感受到和原始动因直接沟通</text>
		</view>
		<view style="display: flex; flex-wrap:wrap; width: 100%;">
			<view v-for="(item,index) in meditation" :key="index" class="padding" style="width: 50%; background-color:#fbfff7;">
				
				<navigator :url="'meditation_info?sportid='+item.id+'&time='+item.time+'&num='+item.num" 
				class="cu-avatar xl round margin-left" style="flex-wrap: wrap;
				background-image:url(../../../static/sport/meditation/text_background.png)">
				<text style="margin:28px 20px 10px 20px;font-size:18px;font-weight:bold;color: #ffd66d;">{{item.name}}\n</text>
				<text style="margin:0px 20px;font-size:15px;font-weight:bold;color: #ffd66d;">{{item.time}}</text>
				
				</navigator>
			</view>




		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				meditation:[
					{id:14,
					name:'引言介绍',
					time:'2:50',
					num:170
					},
					{id:15,
					name:'进入冥想',
					time:'8:03',
					num:483,
					},
					{id:16,
					name:'和身体联接',
					time:'8:33',
					num:513},
					{id:17,
					name:'接纳并欣赏自己',
					time:'9:32',
					num:572},
					{id:18,
					name:'独一无二的你',
					time:'8:36',
					num:516},
					{id:19,
					name:'气定神闲的力量',
					time:'9:05',
					num:545}
				]
			}
		},
		onLoad: function() {

		},
		methods: {

		}
	}
</script>

<style>
	page{
		background-color: #fbfff7;
	}
	.margin-left {
		margin-left: 50upx;
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
		width: 100upx;
		height: 100upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}
.round {
	border-radius: 5000upx;
}
	.cu-avatar.xl {
		width: 300upx;
		height: 250upx;
		font-size: 2.5em;
	}
</style>
