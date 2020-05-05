import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.checkLogin = function(backpage, backtype) {
	var TOKEN = uni.getStorageSync('TOKEN');
	var userid = uni.getStorageSync('userid');
	// var SUID = uni.getStorageSync('SUID');
	// var SRAND = uni.getStorageSync('SRAND');
	// var SNAME = uni.getStorageSync('SNAME');
	// var SFACE = uni.getStorageSync('SFACE');
	// if (SUID == '' || SRAND == '' || SFACE == '') {
	if (TOKEN == ''|| userid == '') {
		uni.redirectTo({
			url: '/pages/index/login?backpage=' + backpage + '&backtype=' + backtype
		});		
		return false;
	}
	return [TOKEN,userid];
}
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
var APITOKEN  = 'api2018';
Vue.prototype.apiServer = 'http://fitness.qicp.vip/FITNESS/';
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
