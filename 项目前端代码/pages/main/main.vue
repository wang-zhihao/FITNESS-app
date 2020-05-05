<template>
	<view>
		<view>

			<button type="primary" @click="share">发布动态</button>

		</view>
		<view v-for="(item,index) in shares" :key="index">
			<view class="cu-card dynamic no-card">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<image @click="previewface(item.face)" mode="aspectFill" class="cu-avatar round lg" :src="item.face"></image>
							<!-- <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view> -->
							<view class="content flex-sub">
								<view>{{item.username}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.date}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content">
						<textarea auto-height="true" style="min-height: 200px; width: 100%;font-size: 19px;" name="artText" maxlength="-1"
						 :value="item.text" disabled="true">
							</textarea>
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view class="bg-img" v-for="(imagesrc,index1) in item.img" :key="index1">
							<image  @click="previewImg(item.img)" :src="imagesrc" mode="aspectFill"></image>
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
					</view>


				</view>
			</view>
		</view>
	</view>

</template>
<script>
	import "@/colorui/main.css";
	import "@/colorui/icon.css";
	var _this;
	export default {
		data() {
			return {
				shares: [],
				isCard: true,
				percent: 0,
				loading: false,
				disabled: false
			}
		},
		onLoad() {
			_this = this;

			try {
				const userid = uni.getStorageSync('userid');
				const token = uni.getStorageSync('TOKEN');
				if (userid) {
					console.log(userid);
					uni.request({
						url: this.apiServer + 'user/community',
						method: "GET",
						data: {
							"action": "showAllShare",

							"token": token
						},
						success: (res) => {
							console.log(res.data);
							_this.shares = res.data.shares
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
		methods: {
			previewface(imgurl){
				const arr = imgurl.split(",");
				console.log(arr)
				_this.previewImg(arr)
			},
			previewImg(imgurl) {
				// 预览图片
				uni.previewImage({
					urls: imgurl,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			onPullDownRefresh() {
				try {
					const userid = uni.getStorageSync('userid');
					const token = uni.getStorageSync('TOKEN');
					if (userid) {
						console.log(userid);
						uni.request({
							url: this.apiServer + 'user/community',
							method: "GET",
							data: {
								"action": "showAllShare",

								"token": token
							},
							success: (res) => {
								console.log(res.data);
								_this.shares = res.data.shares
								uni.stopPullDownRefresh();
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
			share() {
				uni.navigateTo({
					url: 'share'
				})
			},
			IsCard(e) {
				this.isCard = e.detail.value
				console.log(this.isCard)
			},
			request: function() {
				uni.chooseImage({
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
							tempFilePath: tempFilePaths[0],
							success: function(res) {
								var savedFilePath = res.savedFilePath;
							}
						});
					}
				});
			}

		}
	}
</script>
