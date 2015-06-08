define(function(require, exports, module){
	/**
	 * 转帐管理
	 * 
	 */
	var ng = require('angularjs'),
		app = require('directive/cloudKeyboard'),
		common = require('common/common');
	
	require('models/transferService');
	require('models/accountService');
	require('directive/range');
	
	app.controller('TransferController', ['TransferService', 'AccountService', '$scope', 'URLS', '$log', function(TransferService, AccountService, $scope, urls, $log){
		$scope.CLOUD_SECURITY_KEYBOARD = urls.CLOUD_SECURITY_KEYBOARD;
		//服务器地址
		$scope.HOST = urls.HOST;
		
		var transfer = {
				//转帐类型1:银行卡转资金帐户，2：资金帐户转银行卡，3：帐户互转
				type: 1,
				//各页面显示状态
				status: 1,
				//默认选择的银行
				defaultBank: {},
				//帐户间互转:转出帐户
				fromAccount: null,
				//帐户间互转:转入帐户
				toAccount: null,
				//切换转帐类型
				switchType: function(type){
					if(type == 1){
						transfer.go(2);
						transfer.type=1;
						transfer.title='银行卡转证券';
						//初始化密码控件
						if(!transfer.bankPasswordInitialize){ transfer.bankPasswordInitialize=true; }
					}
					
					if(type == 2){
						transfer.go(3);
						transfer.type=2;
						transfer.title='证券转银行卡';
						//初始化密码控件
						if(!transfer.securityPasswordInitialize){ transfer.securityPasswordInitialize=true; }
					}
					
					if(type == 3){
						transfer.go(4);
						transfer.type=3;
						transfer.title='账户间转账';
					}
					
					transfer.message=null;
					transfer.formatAmount=null;
					transfer.amount=null;
					
					//清空密码
					$('#securityPassword_ccskinput, #bankPassword_ccskinput').addClass('placeholder').text($('#securityPassword').attr('placeholder')).data('position', null).data('content', null);
					$('#securityPassword_ccsk, #bankPassword_ccsk').val('');
				},
				//读取帐户列表信息
				getAccountList: function(){
					TransferService.getAccountList({}, function(data){
						$scope.transfer.banklist = data.allbanklist;
						$scope.transfer.moneyData = data.moneyData;
						
						
						if(!data.allbanklist || !data.moneyData){return;}
						
						//是否允许转帐
						transfer.iszzdate = data.iszzdate;
						
						//限制银转证的最大金额 
						transfer.bankToSecurityMaxAmount = +data.moneyData.china_available;
						//第一次自动 选择主帐户
						for(var i=0; i<data.allbanklist.length; i++){
							if(data.allbanklist[i].ismain == '1'){
								$scope.transfer.defaultBank = data.allbanklist[i];
								$scope.transfer.securityToBankMaxAmount = data.allbanklist[i].draw_avl_cash;
								
								//帐户单互转，设置转出帐户
								$scope.transfer.fromAccount = data.allbanklist[i];
							}else{
								//帐户单互转，设置转入帐户
								if(!$scope.transfer.toAccount){
									$scope.transfer.toAccount = data.allbanklist[i];
								}
							}
						}
					});
				},
				//选择银行
				chooseBank: function(account){
					if(!account){return;}
					
					var banklist = $scope.transfer.banklist;
					
					for(var i=0; i<banklist.length; i++){
						if(banklist[i].account == account){
							$scope.transfer.defaultBank = banklist[i];
							break;
						}
					}
					
					$scope.transfer.status = 2;
					$scope.transfer.lastStatus = 1;
				},
				//选择证券帐户
				chooseSecurity: function(account){
					if(!account){return;}
					
					var banklist = $scope.transfer.banklist;
					
					for(var i=0; i<banklist.length; i++){
						if(banklist[i].account == account){
							$scope.transfer.securityToBankMaxAmount = banklist[i].draw_avl_cash;
							$scope.transfer.defaultBank = banklist[i];
							break;
						}
					}
					
					$scope.transfer.status = 3;
					$scope.transfer.lastStatus = 1;
				},
				//帐户间互转选择
				chooseAccount: function(account, type){
					if(!account){return;}
					
					var banklist = $scope.transfer.banklist;
					
					for(var i=0; i<banklist.length; i++){
						if(banklist[i].account == account){
							if(type == 'from'){
								//证券转银行时
								if($scope.transfer.type == '2'){
									$scope.transfer.status = 3;
									$scope.transfer.defaultBank = banklist[i];
								}else{
								//证券间互转
									$scope.transfer.status = 4;
									$scope.transfer.fromAccount = banklist[i];
								}
							}else{
								$scope.transfer.status = 4;
								$scope.transfer.toAccount = banklist[i];
							}
							break;
						}
					}
					
					$scope.transfer.lastStatus = 1;
				},
				//银证互转
				bankSecurityTransfer: function(){
					var bank = $scope.transfer.defaultBank;
					
					//银行转证券
					if($scope.transfer.type == 1){
						var params = {
							transferAmount: $scope.transfer.amount,
							bankid: bank.ext_inst,
							bankname: bank.bank_name,
							bankvalue: bank.ext_acc,
							type: 'zr',
							pwdType: bank.pwdtype,
							bank: bank.data,
							currency: 0
						};
						
						//判断 密码类型
						var password = $('#bankPassword_ccsk').val();
						
						if(bank.ext_bank_pwd == 'showtrue'){
							params.ext_bank_pwd = password;
						}else if(bank.ext_trade_pwd == 'showtrue'){
							params.ext_trade_pwd = password;
						}else if(bank.ext_acc_pwd == 'showtrue'){
							params.ext_acc_pwd = password;
						}else{
							
						}
						
						TransferService.bankToSecurity(params, function(data, status, headers){
							$scope.transfer.finishDatetime = new Date(headers('date'));
							
							if(data.state && data.state == '0'){
								//更新金额
								$scope.transfer.getAccountList();
								
								$scope.transfer.status = 9;
							}else{
								$scope.transfer.message = data.info;
							}
						});
					}
					
					//证券转银行
					if($scope.transfer.type == 2){
						TransferService.securityToBank({
							accPwd: $('#securityPassword_ccsk').val(),
							account: bank.account,
							ext_inst: bank.ext_inst,
							cptl_amt: $scope.transfer.amount,
							ext_acc: bank.ext_acc
						}, function(data, status, headers){
							$scope.transfer.finishDatetime = new Date(headers('date'));
							
							if(data.state && data.state == '0'){
								//更新金额
								$scope.transfer.getAccountList();
								
								$scope.transfer.status = 9;
							}else{
								$scope.transfer.message = data.info;
							}
						});
					}
				},
				
				//帐户间互转
				accountToAccount: function(){
					TransferService.accountToAccount({
						out_account: $scope.transfer.fromAccount.account,
						in_account: $scope.transfer.toAccount.account,
						amount: $scope.transfer.amount
					}, function(data, status, headers){
						$scope.transfer.finishDatetime = new Date(headers('date'));
						
						if(data.state && data.state == '0'){
							//更新金额
							//更新金额
							$scope.transfer.getAccountList();
							$scope.transfer.status = 9;
						}else{
							$scope.transfer.message = data.info;
						}
					});
				},
				//页面跳转
				go: function(no){
					//记录上一次状态 
					$scope.transfer.lastStatus = $scope.transfer.status;
					$scope.transfer.status = no;
				},
				//返回
				back: function(){
					if($scope.transfer.status>1){
						switch($scope.transfer.status){
							case 6:
							case 7:
								//证券转银行时
								//到第三级页面，如选择资金帐户或银行列表，直接返回时
								if($scope.transfer.type == '3'){
									$scope.transfer.status = 4;
									$scope.transfer.lastStatus = 1;
								}
								
								if($scope.transfer.type == '2'){
									$scope.transfer.status = 3;
									$scope.transfer.lastStatus = 1;
								}
								break;
							case 5:
								$scope.transfer.status = 2;
								$scope.transfer.lastStatus = 1;
								break;
							default:
								$scope.transfer.status = $scope.transfer.lastStatus;
						}
						
					}else{
						window.history.go(-1);
					}
				},
				//检查登录 态
			    checkLogin: function(){
				  AccountService.checkLogin({}, function(data){
					  $scope.transfer.logined = data.hasLogin;
					  
					  if(!$scope.transfer.logined){
						  //跳转登录
						  window.location.href= urls.LOGIN +'?target='+urls.TRANSFER_TYPE;
					  }
				  });
			  }
		};
		
		//监控输入的金额
		$scope.$watch('transfer.amount', function(val){
			if(!val){return;}
			$scope.transfer.formatAmount = common.chineseNum(val);
		});
		
		$scope.transfer = transfer;
	}]);
	
	//导出公共方法，启动angular,一个页面启动一次。
	exports.run = function(){
		//启动
		ng.element(window.document).ready(function(){
			ng.bootstrap(document, ['ow'])
		});
	}
	
});
