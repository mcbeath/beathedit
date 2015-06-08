define(function(require, exports, module){
	/**
	 * 帐号管理
	 * 
	 * 登录资金帐户：
		307100002195/456456
		307100002196/123123  有持仓数据
		301719964042/123123 也有持仓数据

		3，可购买基金：
		A40053，  519656
		
	//开发测试帐号
	//301719215900 / 123123
	//301719204282 / 123123
	 */
	var ng = require('angularjs'),
		app = require('directive/cloudKeyboard'),
		common = require('common/common');
	
	require('models/accountService');
	
	app.controller('AccountController', ['AccountService', '$scope', 'URLS', '$log', function(AccountService, $scope, urls, $log){
		$scope.CLOUD_SECURITY_KEYBOARD = urls.CLOUD_SECURITY_KEYBOARD;
		//服务器地址
		$scope.HOST = urls.HOST;
		
		var account = {
				//检验结果 
				valid: {
					username: true,
					password: true,
					captcha: true
				},
				//登录类型00:身份证，1：资金帐号
				loginType: '00',
				//获取 营业部信息
				getBranchInfo: function(){
					AccountService.getBranchInfo({}, function(data){
						account.branches = data.branchs || [];
					});
				},
				//登录 
				login: function(account){
					//清空服务器返回的错误
					account.errorMessage = null;
					//用户名密码有误
					account.valid.username = $scope.accountForm.username.$valid;
					account.valid.password = $scope.accountForm.password.$valid;
					
					//验证码有误
					//密码错误时弹出验证
					if(account.passworderror == 1){
						account.valid.captcha = $scope.accountForm.captcha.$valid;
						
						//资金登录时判断帐号不存在
						if(account.loginType == '1' && (!account.branch || !account.branch.branchno)) { 
							account.valid.username = false;
							return;
						}
						
					}else{
						account.valid.captcha = true;
					}
					
					if(!account.valid.username || !account.valid.password || !account.valid.captcha ){ return; }
					
					var params = {
									PasswordS_ccsk: $('#password_ccsk').val(),//account.password,
									ticket: account.captcha || '',
									userLoginType: account.loginType,
									isrecord: 'yes',
									methods: '1'
								};
					//根据帐号类型添加 帐号
					if(account.loginType == '00'){
						params.idno = account.username;
					}else{
						params.account = account.username;
						params.branchNo = account.branch.branchno;
					}
					
					
					AccountService.login(params, function(data){
						
						$scope.account.timestamp = +new Date();
						
						if(data.code == '1'){
							account.passworderror = 0;
							//跳转到会员中心
							var target = common.getParams('target') || '';
							
							if(target){
								target = target.indexOf('?')!=-1?target+'&f=l':target+'?f=1'; 
							}
							
							window.location.href= target || urls.USER_CENTER+'?f=l';
						}else{
							if(data.code == '2'){account.passworderror = 1;}
							$scope.account.errorMessage = data.msg;
						}
					});
				},
				//刷新验证码
				refresh: function(){
					$scope.account.timestamp = +new Date();
				},
				//清除数据
				clear: function(key){
					delete $scope.account[key];
					
					//清除密码
					if(key == 'password'){
						$('#password_ccskinput').addClass('placeholder').text($('#password').attr('placeholder')).data('position', null).data('content', null);
						$('#password_ccsk').val('');	
					}
					//清除未验证通过的用户名
					if(key == 'username'){
						$('#username').val('');
					}
				},
				//输入帐号带出营业部
				carry: function(account){
					if(account.loginType == '1' && $scope.accountForm.username.$viewValue && $scope.accountForm.username.$viewValue.length>=4){
						var val = $scope.accountForm.username.$viewValue.substr(0,4),
							branches = $scope.account.branches;
						
						for(var i=0; i<branches.length; i++){
							if(branches[i].branchno == val){
								$scope.account.branch = branches[i];
							}
						}
					}else{
						$scope.account.branch = null;
					}
			  },
			  //检查登录 态
			  checkLogin: function(){
				  AccountService.checkLogin({}, function(data){
					  $scope.account.logined = data.hasLogin;
					  
					  if($scope.account.logined){
						  //跳转到会员中心
						  var target = common.getParams('target') || '';
						  
						  if(target){
							  target = target.indexOf('?')!=-1?target+'&f=l':target+'?f=1'; 
						  }
						  
						  window.location.href= target || urls.USER_CENTER+'?f=l';
					  }
				  });
			  }
		};
		
		$scope.account = account;
	}]);
	
	//导出公共方法，启动angular,一个页面启动一次。
	exports.run = function(){
		//启动
		ng.element(window.document).ready(function(){
			ng.bootstrap(document, ['ow'])
		});
	}
	
});
