<template>
	<view class="wrap">
		<view class="text-content">
			<textarea auto-height="true" style="min-height: 200px; width: 100%;font-size: 19px;" name="artText" maxlength="-1" v-model="inputContent" placeholder="请输入文本">
				</textarea>
		</view>
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow">
				<view class="grid flex-sub padding-lr col-3 grid-square">
					<view class="bg-img" v-for="(item,index) in artList" :key="index">
						<view style="width: 100%;" class="item" v-if="item.type == 'image'">
							<image mode="aspectFit" class="bg-img" :data-index="index" :src="item.content" @tap="removeImg"></image>
						</view>
						<view class="item" v-if="item.type == 'text'">
							<textarea placeholder="" v-model="artList[index].content" />
							<view :data-index="index" class="deleteText" @tap="deleteText">删除</view>
					 </view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text uni-flex" style="width: 200rpx;height: 220rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
							<image src="../../static/plus.png" style="width: 150rpx;height: 150rpx;"  @tap="addImg"></image>
						</view>
					</view>
				</view>		
			</view>
		</view>
		
       
        <view style="height: 100px;width: 100%;"></view>
        <!-- 提交按钮 -->
		<button type="primary" class="begin_class" @tap="submitNow">分享</button>
        
    </view>
</template>
<script>
	import "@/colorui/main.css";
	import "@/colorui/icon.css";
	var _self, loginRes;
export default {
    data() {
        return {
            title : '',
            artList : [],
            inputContent : "",
            needUploadImg : [],
            uploadIndex : 0,
            //分类
            caties : ['点击选择'],
            currentCateIndex : 0,
            catiesFromApi : [],
            // 记录真实选择的api接口数据的分类id
            sedCateIndex  : 0
        }
    },
    onLoad : function() {
        _self = this;
        
        // loginRes = this.checkLogin('../write/write', '2');
        // if(!loginRes){return false;}
        // 加载文章分类
       
    },
    methods:{
        cateChange : function(e){
            var sedIndex          = e.detail.value;
            this.currentCateIndex = sedIndex;
            // 获取选择的分类名称
            if(sedIndex < 1){return ;}
            var cateName = this.caties[sedIndex];
            for(var k in this.catiesFromApi){
                if(cateName == this.catiesFromApi[k]){
                    this.sedCateIndex = k;
                    break;
                }
            }
            this.currentCateIndex = sedIndex;
        },
        removeImg : function(e){
            var index = e.currentTarget.dataset.index;
            uni.showModal({
                content:"确定要删除此图片吗",
                title:'提示',
                success(e) {
                    if (e.confirm) {
                        _self.artList.splice(index, 1);
                    }
                }
            });
        },
        deleteText : function(e){
            var index = e.currentTarget.dataset.index;
            uni.showModal({
                content:"确定要删除吗",
                title:'提示',
                success(e) {
                    if (e.confirm) {
                        _self.artList.splice(index, 1);
                    }
                }
            });
        },
        submitNow : function(){
            // 数据验证
            let uuid= Number(Math.random().toString().substr(3,9) + Date.now()).toString(36);
            	
            if(this.artList.length < 1){uni.showToast({title:'请填写文章内容', icon:"none"}); return ;}
          
            // 上传图片 一次一个多次上传 [ 递归函数 ]
            // 上传完成后整体提交数据
            // 首先整理一下需要上传的图片
            // this.needUploadImg = [{tmpurl : 临时地址, index : 数据索引}]
            this.needUploadImg = [];
            for(var i = 0; i < this.artList.length; i++){
                if(this.artList[i].type == 'image'){
					console.log(this.artList[i].content);
                    this.needUploadImg.push({"tmpurl" : this.artList[i].content , "indexID": i});
                }
            }
            this.uploadImg(uuid);
        },
		
        uploadImg : function(uuid){
            // 如果没有图片 或者已经上传完成 则执行提交
            if(_self.inputContent.length >1 && this.uploadIndex >=  this.needUploadImg.length){
				_self.needUploadImg    = [];
                // uni.showLoading({title:"正在提交"});
                // 将信息整合后提交到服务器
                var token = uni.getStorageSync('TOKEN');
				var userid = uni.getStorageSync('userid');
                uni.request({
					url: _self.apiServer + 'user/community',
					method: 'POST',
					data: {
						"action": "savetext",
						"token": token,
						"userid":userid,
						"shareid":uuid,
						"text":_self.inputContent
					},
                    header: {'content-type' : "application/x-www-form-urlencoded"},
                    success: (res) => {
                        console.log(res.data);
						console.log(res.data.status);
                        if(res.data.ret == 0){
                            uni.showToast({title:"提交成功", icon:"none"});
                            _self.artList = [];
                            // 清空数据
                            
                            // 防止数据缓存
							_self.inputContent='';
                            _self.currentCateIndex = 0;
                            _self.sedCateIndex     = 0;
                            _self.needUploadImg    = [];
                            _self.title            = '';
                            setTimeout(function(){
                                uni.switchTab({
                                    url:'main'
                                })
                            }, 1000);
                        }else{
                            uni.showToast({title:res.data.data, icon:"none"});
                        }
                    },
                    fail: (res) => {
                        
                    },
                    complete: () => {
                        
                    }
                });
                return ;
            }
            // 上传图片
            // uni.showLoading({title:"上传图片"});
			
            
            console.log(uuid)
			console.log(_self.needUploadImg)
			try {
				const userid = uni.getStorageSync('userid');
				const token = uni.getStorageSync('TOKEN');
			
				var uploader = uni.uploadFile({
					url: _self.apiServer + 'user/community', 
					name: 'file',
					filePath : _self.needUploadImg[_self.uploadIndex].tmpurl,		
					formData: {
						'shareid':uuid,
						'action': 'saveimage',
						'userid':userid
					},
					success: (res) => {
						console.log(res.data);
						// 将已经上传的文件地址赋值给文章数据
						
						var index = _self.needUploadImg[_self.uploadIndex].indexID;
						
						console.log(_self.artList); 
						_self.uploadIndex ++;
						// 递归上传
						setTimeout(function(){_self.uploadImg(uuid);}, 1000);
					},
					fail: () => {
						uni.showToast({title:"123,请重试!", icon:"none"});
					}
				})
				} catch (e) {
					// error
				}
        },
        submit : function(res){
			console.log(res.detail.value.artText)
            var content = res.detail.value.artText;
            if(content.length < 1){uni.showToast({title:"请输入内容",icon:'none'}); return ;}
            this.artList.push({"type":"text", "content" : content});
            this.inputContent = '';
        },
        addImg : function(){
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: function(res) {
                    _self.artList.push({"type":"image", "content" : res.tempFilePaths[0]})
                }
            })
        }
    }
}
</script>
<style>
	.begin_class {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		background-color: #666666;
		color: #FFFFFF;
	}
	.uni-flex {
		display: flex;
		flex-direction: row;
	}
	.uni-flex-item {
		flex: 1;
	}
	.text {
		
		
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}
</style>
