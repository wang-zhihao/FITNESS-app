<template>
	<view>
		<view>
			<view class="cu-card case">
				<view class="cu-item shadow">
					<navigator :url="'./yoga_info?sportid=20&imageurl='+imageurl[0]" 
					 hover-class="navigator-hover">
						<view class="image">
							<image style=" width: 100%;height: 150px;" mode="aspectFill" src="https://static1.keepcdn.com/2017/05/18/22/1495119359991_750x700.jpg" ></image>
							<view class="cu-tag bg-blue">官方</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">瑜伽·晨间唤醒</text></view>
						</view>
			
					</navigator>
				</view>
			</view>
			<view class="cu-card case">
				<view class="cu-item shadow">
					<navigator :url="'./yoga_info?sportid=21&imageurl='+imageurl[1]" 
					 hover-class="navigator-hover">
						<view class="image">
							<image style=" width: 100%;height: 150px;" mode="aspectFill" 
							src="https://static1.keepcdn.com/2017/05/18/22/1495116667693_750x700.jpg" ></image>
							<view class="cu-tag bg-blue">官方</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">瑜伽·睡前舒缓</text></view>
						</view>
			
					</navigator>
				</view>
			</view>
			<view class="cu-card case">
				<view class="cu-item shadow">
					<navigator :url="'./yoga_info?sportid=22&imageurl='+imageurl[2]" 
					 hover-class="navigator-hover">
						<view class="image">
							<image style=" width: 100%;height: 150px;" mode="aspectFill" 
							src="https://static1.keepcdn.com/cms_static/picture/2019/4/11/1554964199803_JUU4JTg3JTgwJUU4.png" ></image>
							<view class="cu-tag bg-blue">官方</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">瑜伽·臀腿塑形</text></view>
						</view>
			
					</navigator>
				</view>
			</view>
			<view class="cu-card case">
				<view class="cu-item shadow">
					<navigator :url="'./yoga_info?sportid=23&imageurl='+imageurl[3]" 
					 hover-class="navigator-hover">
						<view class="image">
							<image style=" width: 100%;height: 150px;" mode="aspectFill" 
							src="https://static1.keepcdn.com/2018/12/14/16/1544774879658_750x644.png" ></image>
							<view class="cu-tag bg-blue">官方</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">瑜伽·柔韧提升</text></view>
						</view>
			
					</navigator>
				</view>
			</view>
			<view style="height: 20px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageurl:[
					"https://static1.keepcdn.com/2017/05/18/22/1495119359991_750x700.jpg",
					"https://static1.keepcdn.com/2017/05/18/22/1495116667693_750x700.jpg",
					"https://static1.keepcdn.com/cms_static/picture/2019/4/11/1554964199803_JUU4JTg3JTgwJUU4.png",
					"https://static1.keepcdn.com/2018/12/14/16/1544774879658_750x644.png"
				]

			}
		},
		methods: {

		}
	}
</script>

<style>
@import url("../../../colorui/main.css");
	@import url("../../../colorui/icon.css";
	
/* ==================
         卡片
 ==================== */

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
.cu-card.case .image {
	position: relative;
}
.cu-card.case .image image {
	width: 100%;
}
.cu-card.case .image .cu-tag {
	position: absolute;
	right: 0;
	top: 0;
}
.cu-card.case .image .cu-bar {
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: transparent;
	padding: 0upx 30upx;
}

.bg-blue {
	background-color: #0081ff;
	color: #ffffff;
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
.bg-shadeBottom {
	background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1));
	color: #ffffff;
}
</style>
