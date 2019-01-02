const Chrome = require('../lib/Chrome');
const SeriesPromiseWorker = require('../lib/SeriesPromiseWorker');
const https = require('https');



const tasks = [
	{
		name: '首页',
		url: 'https://www.hashquark.io/#/'
	},
	// {
	// 	name: 'QTUM',
	// 	url: 'https://www.hashquark.io/#/project?coinCode=QTUM'
	// },
	// {
	// 	name: 'VET',
	// 	url: 'https://www.hashquark.io/#/project?coinCode=VET'
	// },
	// {
	// 	name: '下载',
	// 	url: 'https://www.hashquark.io/#/download'
	// }
];

const checkLogin = function () {

	let instance = new SeriesPromiseWorker(tasks);
	instance.bindWorker(function () {
		const chrome = new Chrome({
			headless: false,
			url: 'https://www.hashquark.io/#/',
			timeout: 10 * 30000
		});
		return chrome.start().then(() => {
			return chrome.xhrBlockedClick('.item.reg-login>a[href="#/login"]');
		}).then(() => {
			return chrome.getPage().type('#j-login-username', '15221676424', {
				delay: 50
			});
		}).then(() => {
			return chrome.getPage().type('#j-login-pwd', '!1234qwer', {
				delay: 50
			});
		}).then(() => {
			return chrome.xhrBlockedClick('.form>.btn', 13);
		}).then(() => {
			return chrome.delay(1000);
		}).then(() => {
			return chrome.getPage().$('li>a[href^="javascript"]');
		}).then((el) => {
			return chrome.getElementsContent('li>a[href^="javascript"]');
		}).then((content) => {
			console.log('>>注销成功:' + content);
		})
	}, function () {
		console.log('>>haole ');
	});
};

checkLogin();