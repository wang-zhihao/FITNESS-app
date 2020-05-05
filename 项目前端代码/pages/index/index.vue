<template>
	<view>
		<view class="content">
			<image class="logo" src="/static/logo.jpg"></image>

		</view>
		<view class="margin-top box">
			
				<CcButton @cctap="login()" :loading="isloading">登陆</CcButton>
			
		</view>
	</view>

</template>

<script>
	import CcButton from '@/components/cc-button/cc-button.vue'
	export default {
		data:function(){ 
			return {
				isloading: false
			}
		},
		components: {
			CcButton
		},
		methods: {
			login() {
				console.log("login")
				uni.navigateTo({
					url: '../index/login',
					
				});
			},
			showloading(type) {
				this[type] = true
				setTimeout(() => {
					this[type] = false
				}, 3500);
			},
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.title {
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
	}

	.margin-top {
		margin-top: 300rpx;
	}
</style>
