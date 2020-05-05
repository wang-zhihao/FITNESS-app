<template>
	<view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<navigator url="./xunlian" hover-class="navigator-hover">
					<view class="image">
						<image src="../../../static/sport/xunlian/train.jpg" mode="widthFix"></image>
						<view class="cu-tag bg-blue">官方</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">训练</text></view>
					</view>
		
				</navigator>
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<navigator url="run" hover-class="navigator-hover">
					<view class="image">
						<image src="../../../static/sport/run/run.jpg" mode="widthFix"></image>
						<view class="cu-tag bg-blue">官方</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">跑步</text></view>
					</view>

				</navigator>
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<navigator url="yoga" hover-class="navigator-hover">
					<view class="image">
						<image src="../../../static/sport/yoga/yoga.jpg" mode="widthFix"></image>
						<view class="cu-tag bg-blue">官方</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">瑜伽</text></view>
					</view>

				</navigator>
			</view>
		</view>
		
		<view class="cu-card case">
			<view class="cu-item shadow">
				<navigator url="ride" hover-class="navigator-hover">
					<view class="image">
						<image src="../../../static/sport/ride/ride.jpg" mode="widthFix"></image>
						<view class="cu-tag bg-blue">官方</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">骑行</text></view>
					</view>
		
				</navigator>
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<navigator url="meditation" hover-class="navigator-hover">
					<view class="image">
						<image src="../../../static/sport/meditation/meditation.jpg" mode="widthFix"></image>
						<view class="cu-tag bg-blue">官方</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">冥想</text></view>
					</view>
		
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: false
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style>
	@import url("../../../colorui/main.css");
	@import url("../../../colorui/icon.css";

	.cu-card {
		display: block;
		overflow: hidden;
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
	
</style>
