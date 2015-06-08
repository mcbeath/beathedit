/**
 * Native接口定义
 */
;(function() {
    // 定义Native对象
    window.Native = {};
    var index = 0, toString = Object.prototype.toString, slice = Array.prototype.slice;
    var ua = navigator.userAgent.toLowerCase(), //
    android = ua.indexOf('android') != -1, //
    ios = ua.indexOf('iphone os') != -1;
    ios = true;

    /**
     * @private
     * 封装一个适配器, 用于通过统一的方法在JavaScript中调用Native接口
     */
    var call = function(name) {
        var args = slice.call(arguments, 1), callback = '', item = null;

        for(var i = 0, len = args.length; i < len; i++) {
            item = args[i];
            if(item === undefined) {
                item = '';
            }

            if(toString.call(item) == '[object Function]') {
                callback = name + 'Callback' + i;
                window[callback] = item;
                item = callback;
            }
            args[i] = item;
        }

        if(android) {
            try {
                for(var i = 0, len = args.length; i < len; i++) {
                    args[i] = '"' + args[i] + '"';
                }
                eval('window.android.' + name + '(' + args.join(',') + ')');
            } catch(e) {
                alert(e);
            }
            eval();
        } else if(ios) {
            if(args.length) {
                args = '|' + args.join('|');
            }
            location.href = '#call:' + name + args + '|' + index++;
        }
    }
    // 设备相关接口
    Native.Device = {
        /**
         * 获取设备信息
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Object} data 以对象方式返回的设备信息
         *     {
         *         uuid: '', //设备的全球唯一标识符(UUID)
         *         model: '', //设备型号, 如GT-9100, iPhone4S
         *         name: '', //设备名称
         *         token: '', //设备令牌
         *         platformName: '', //系统名称, 如ios, android
         *         platformVersion: '', //系统版本号
         *         appVersion: '' //应用版本号
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         *
         * @examples
         * Native.Device.getDeviceInfo(function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         console.log(data.uuid);
         *     }else {
         *         // TODO
         *     }
         * });
         *
         */
        // Android注册方法: window.android.Device_getDeviceInfo(String callback);
        // IOS监听URL: #call:Device_getDeviceInfo|callback|1
        getDeviceInfo : function(callback) {
            call('Device_getDeviceInfo', callback);
        }
    }

    // 相册及摄像头接口
    Native.Camera = {
        /**
         * 从相册获取图片, 或使用摄像头拍照
         * @param {Number} type 获取类型
         *     1 - 用户自由选取
         *     2 - 从相册获取
         *     3 - 调用摄像头拍摄
         * @param {Boolean} base64 是否以Base64字符串的形式返回图片信息, 默认返回图片路径
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, String data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {String} data 照片文件路径, 或Base64字符串
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         *
         * @examples
         * Native.Camera.getPicture(1, true, function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         img.src = data;
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Camera_getPicture(Number type, Boolean base64, String callback);
        // IOS监听URL: #call:Camera_getPicture|type|base64|callback|1
        getPicture : function(type, base64, callback) {
            call('Camera_getPicture', type, base64, callback);
        }
    }

    // 本地存储接口
    Native.Storage = {
        /**
         * 存储数据
         * @param {String} key 索引键
         * @param {String} value 保存值
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         *
         * @examples
         * Native.Storage.save('name', 'wubing', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Storage_save(String key, String value, String callback);
        // IOS监听URL: #call:Storage_save|key|value|callback|1
        save : function(key, value, callback) {
            call('Storage_save', key, value, callback);
        },
        /**
         * 获取数据
         * @param {String} key 索引键
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, String value, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         *
         * @examples
         * Native.Storage.get('name', function(isSuccess, value, timestamp) {
         *     if(isSuccess) {
         *         console.log(value);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Storage_get(String key, String callback);
        // IOS监听URL: #call:Storage_get|key|callback|1
        get : function(key, callback) {
            call('Storage_get', key, callback);
        }
    }

    // 地理位置定位接口
    Native.Geolocation = {
        /**
         * 获取当前位置信息
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         *
         * @param {Object} data 以对象方式返回的位置信息
         *     {
         *         longitude: '', //经度
         *         latitude: '', //纬度
         *         altitude: '', //海拔高度
         *         address: '' //地址
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Geolocation.getCurrentPosition(function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         console.log(data.longitude);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Geolocation_getLocation(String callback);
        // IOS监听URL: #call:Geolocation_getLocation|callback|1
        getCurrentPosition : function(callback) {
            call('Geolocation_getLocation', callback);
        }
    }

    // 三重数据加密算法
    Native.TripleDES = {
        /**
         * 对明文进行加密
         * @param {String} str 明文字符串
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.TripleDES.encode('', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.TripleDES_encode(String str, String callback);
        // IOS监听URL: #call:TripleDES_encode|str|callback|1
        encode : function(str, callback) {
            call('TripleDES_encode', str, callback);
        }
    }

    // 获取设备移动的方向。(罗盘)
    Native.Compass = {
        /**
         * 获取罗盘的当前朝向。
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Object} data 以对象方式返回的罗盘信息
         *     {
         *         magneticHeading: 153, //罗盘在某一时刻的朝向，取值范围是0 - 359.99度。(数字类型)
         *         trueHeading: 55, //罗盘在某一时刻相对于北极的朝向，取值范围是0 - 359.99度。如果是负值则表明该参数不确定。(数字类型)
         *         headingAccuracy: 1 //实际度数和记录度数之间的偏差。(数字类型)
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Compass.getCurrentHeading(function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         console.log(data.magneticHeading);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Compass_getCurrentHeading(String callback);
        // IOS监听URL: #call:Compass_getCurrentHeading|callback|1
        getCurrentHeading : function(callback) {
            call('Compass_getCurrentHeading', callback);
        }
    }

    // 采集设备在x、y、z方向上的动作。(重力感应)
    Native.Accelerometer = {
        /**
         * 返回当前沿x、y和z方向的加速度。
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Object} data 以对象方式返回的速度信息
         *     {
         *         x: 153, //在X轴的运动量，[0, 1]范围
         *         y: 55, //在Y轴的运动量，[0, 1]范围
         *         z: 1 //在Z轴的运动量，[0, 1]范围
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Accelerometer.getCurrentAcceleration(function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         console.log(data.x);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Accelerometer_getCurrentAcceleration(String callback);
        // IOS监听URL: #call:Accelerometer_getCurrentAcceleration|callback|1
        getCurrentAcceleration : function(callback) {
            call('Accelerometer_getCurrentAcceleration', callback);
        }
    }

    // 快速检查网络状况以及蜂窝网络的信息
    Native.NetworkStatus = {
        /**
         * 获取当前网络信息
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, String type, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {String} type 以对象方式返回的网络信息(字符串枚举类型)
         *     UNKNOWN-未知网络
         *     ETHERNET-以太网
         *     WIFI-WIFI网络
         *     CELL_2G-2G网络
         *     CELL_3G-3G网络
         *     CELL_4G-4G网络
         *     NONE-没有网络连接
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.NetworkStatus.getStatus(function(isSuccess, type, timestamp) {
         *     if(isSuccess) {
         *         console.log(type);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.NetworkStatus_getStatus(String callback);
        // IOS监听URL: #call:NetworkStatus_getStatus|callback|1
        getStatus : function(callback) {
            call('NetworkStatus_getStatus', callback);
        }
    }

    // 对设备通讯录数据库的访问
    /**
     * 联系人数据格式定义(Contact)
     * {
     *     id: '',//全局唯一标识符。（String类型）
     *     displayname: '',//联系人显示名称，适合向最终用户展示的联系人名称。（String类型）
     *     name: '',//联系人姓名所有部分的对象。（String类型）
     *     nickname: '',//昵称，对联系人的非正式称呼。（tring类型）
     *     phoneNumbers: ['', ''],//联系人所有联系电话的数组。（Array类型）
     *     emails: ['', ''],//联系人所有email地址的数组。（Array[]类型）
     *     addrsses: [ContactAddresses, ContactAddresses],//联系人所有联系地址的数组。（ContactAddresses[]类型）
     *     ims: ['', ''],//联系人所有IM地址的数组。（Array[]类型）
     *     organizations: [ContactOrganization, ContactOrganization],//联系人所属所有组织的数组。（ContactOrganization[]类型）
     *     birthday: '',//联系人的生日。（String类型, 格式如1970-01-01）
     *     note: '',//联系人的注释信息。（String类型）
     *     urls: ['', ''] //与联系人相关网页的数组。（Array[]类型）
     * }
     *
     * 联系人地址数据格式定义(ContactAddresses)
     * {
     *     pref: '', //用户是否设定为首选值。（布尔类型）
     *     type: '', //用来标示该地址对应的类型的字符串（例如：“home”）。（String类型）
     *     formatted: '', //完整的地址显示格式。（String格式）
     *     streeAddress: '', //完整的街道地址。（String格式）
     *     locality: '', //城市或地区。（String格式）
     *     region: '', //州或省份。（String格式）
     *     postalCode: '', //邮政编码。（String格式）
     *     country: '' //国家名称。（String格式）
     * }
     *
     * 联系人所属所有组织的数组(ContactOrganization)
     * {
     *     pref: '', //用户是否设定为首选值。（布尔类型）
     *     type: '', //用来标示该所属组织对应的类型的字符串（例如：“home”）。（String类型）
     *     name: '', //组织的名称。（String类型）
     *     department: '', //联系人工作的部门。（String类型）
     *     title: '' //联系人在所属组织内的职务。（String类型）
     * }
     */
    Native.Contacts = {
        /**
         * 获取当前设备的所有联系人列表
         * @param {Function} callback 回调方法
         *
         *
         * callback回调形式: callback(Boolean isSuccess, Array contacts, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Array} contacts 联系人数组（联系人数据请参考"Contact"数据格式定义）
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Contacts.find(function(isSuccess, contacts, timestamp) {
         *     if(isSuccess) {
         *         console.log(contacts[0]['displayname']);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Contacts_find(String callback);
        // IOS监听URL: #call:Contacts_find|callback|1
        find : function(callback) {
            call('Contacts_find', callback);
        }
    }

    // 设备视觉、声音和触觉反馈
    Native.Notification = {
        /**
         * 显示一个定制的警告或对话框。
         * @param {String} title 弹出框标题（默认为“提示”）
         * @param {String} content 弹出框内容
         * @param {String} buttonText 弹出框按钮文字（默认为“确定”）
         * @param {Function} callback 回调方法
         *
         * callback回调方法在用户取消或确认弹出框后调用
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Notification.alert('提示', '请输入您的联系方式！', '确定', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Notification_alert(String title, String content, String buttonText, String callback);
        // IOS监听URL: #call:Notification_alert|title|content|buttonText|callback|1
        alert : function(title, content, buttonText, callback) {
            call('Notification_alert', title, content, buttonText, callback);
        },
        /**
         * 显示一个可定制的确认对话框。
         * @param {String} title 弹出框标题（默认为“提示”）
         * @param {String} content 弹出框内容
         * @param {String} okButtonText 确认按钮文字（默认为“确定”）
         * @param {String} cancelButtonText 取消按钮文字（默认为“取消”）
         * @param {Function} okCallback 点击确认回调方法
         * @param {Function} cancelCallback 点击取消回调方法
         *
         * okCallback回调方法在用户点击确认按钮后调用
         * cancelCallback回调方法在用户点击取消按钮后调用
         * 回调形式: callback(Number timestamp);
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Notification.confirm('警告', '您确定要删除这条记录吗？', '确定', '取消', function(timestamp) {
         *     // DELETE
         * }, function(timestamp) {
         *     // CANCEL
         * });
         */
        // Android注册方法: window.android.Notification_confirm(String title, String content, String okButtonText, String cancelButtonText, String okCallback, String cancelCallback);
        // IOS监听URL: #call:Notification_confirm|title|content|okButtonText|cancelButtonText|okCallback|cancelCallback|1
        confirm : function(title, content, okButtonText, cancelButtonText, okCallback, cancelCallback) {
            call('Notification_confirm', title, content, okButtonText, cancelButtonText, okCallback, cancelCallback);
        },
        /**
         * 设备将发出蜂鸣声。
         * @param {Number} times 蜂鸣声的重复次数。（默认为1次）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Notification.beep(2, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Notification_beep(Number times, String callback);
        // IOS监听URL: #call:Notification_beep|times|callback|1
        beep : function(times, callback) {
            call('Notification_beep', times, callback);
        },
        /**
         * 使设备震动指定的时长。（默认为1000ms）
         * @param {Number} milliseconds 以毫秒为单位的设备震动时长，1000毫秒为1秒。（数字类型）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Notification.vibrate(2000, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Notification_vibrate(Number milliseconds, String callback);
        // IOS监听URL: #call:Notification_vibrate|milliseconds|callback|1
        vibrate : function(milliseconds, callback) {
            call('Notification_vibrate', milliseconds, callback);
        }
    }

    // 录制和播放音频文件
    Native.Media = {
        /**
         * 生成并获取一个音频文件标识, 该标识用于方便操作本地文件
         * @param {String} src 一个包含音频内容的URI。
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, String mediaId, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {String} mediaId：一个用于标识某个媒体资源的id。
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Media.vibrate('/sdcard/SomeTimes.mp3', function(isSuccess, mediaId, timestamp) {
         *     if(isSuccess) {
         *         console.log(mediaId);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_getMediaId(String src, String callback);
        // IOS监听URL: #call:Media_getMediaId|src|callback|1
        getMediaId : function(src, callback) {
            call('Media_getMediaId', milliseconds, callback);
        },
        /**
         * 获取一个音频资源的信息
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Object} data 以对象方式返回的资源信息
         *     {
         *         duration: '', //音频文件的播放时长（以毫秒数为单位）
         *         size: '', //文件大小（以字节为单位）
         *         createtime: '' //文件的创建时间
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.vibrate(mediaId, function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         console.log(data.duration);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_getMediaData(String mediaId, String callback);
        // IOS监听URL: #call:Media_getMediaData|mediaId|callback|1
        getMediaData : function(mediaId, callback) {
            call('Media_getMediaData', mediaId, callback);
        },
        /**
         * 开始或恢复播放一个音频文件。
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.play(mediaId, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_play(String mediaId, String callback);
        // IOS监听URL: #call:Media_play|mediaId|callback|1
        play : function(mediaId, callback) {
            call('Media_play', mediaId, callback);
        },
        /**
         * 返回一个音频文件的当前的位置。
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} position：资源当前播放的位置（以毫秒数为单位），如果文件未开始播放或已播放完毕则为-1
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.getCurrentPosition(mediaId, function(isSuccess, position, timestamp) {
         *     if(isSuccess) {
         *         console.log(position);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_getCurrentPosition(String mediaId, String callback);
        // IOS监听URL: #call:Media_getCurrentPosition|mediaId|callback|1
        getCurrentPosition : function(mediaId, callback) {
            call('Media_getCurrentPosition', mediaId, callback);
        },
        /**
         * 设置音频文件的当前播放的位置。
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Number} position 资源当前播放的位置（以毫秒数为单位）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.seekTo(mediaId, 500, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_seekTo(String mediaId, Number position, String callback);
        // IOS监听URL: #call:Media_seekTo|mediaId|position|callback|1
        seekTo : function(mediaId, position, callback) {
            call('Media_seekTo', mediaId, position, callback);
        },
        /**
         * 暂停播放一个音频文件。
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.pause(mediaId, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_pause(String mediaId, String callback);
        // IOS监听URL: #call:Media_pause|mediaId|callback|1
        pause : function(mediaId, callback) {
            call('Media_pause', mediaId, callback);
        },
        /**
         * 释放底层操作系统音频资源。
         * media.release是一个用于释放系统音频资源的同步函数。
         * 该函数对于Android系统尤为重要，因为Android系统的OpenCore（多媒体核心）的实例是有限的。
         * 开发者需要在他们不再需要相应Media资源时调用“release”函数释放它。
         *
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.release(mediaId, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_release(String mediaId, String callback);
        // IOS监听URL: #call:Media_release|mediaId|callback|1
        release : function(mediaId, callback) {
            call('Media_release', mediaId, callback);
        },
        /**
         * 停止播放一个音频文件。
         * @param {String} mediaId 资源标识（通过getMediaId()方法获取）
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * var mediaId = '';
         * Native.Media.stop(mediaId, function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_stop(String mediaId, String callback);
        // IOS监听URL: #call:Media_stop|mediaId|callback|1
        stop : function(mediaId, callback) {
            call('Media_stop', mediaId, callback);
        },
        /**
         * 开始录制一个音频文件。
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Media.startRecord(function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         console.log(timestamp);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_startRecord(String callback);
        // IOS监听URL: #call:Media_startRecord|callback|1
        startRecord : function(callback) {
            call('Media_startRecord', callback);
        },
        /**
         * 停止录制一个音频文件。
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Object} data 以对象方式返回的资源信息
         *     {
         *         mediaId: '', //资源文件的标识
         *         src: '', //文件存储的路径
         *         duration: '', //音频文件的播放时长（以毫秒数为单位）
         *         size: '', //文件大小（以字节为单位）
         *         createtime: '' //文件的创建时间
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Media.stopRecord(function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         Native.Media.play(data.mediaId);
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Media_stopRecord(String callback);
        // IOS监听URL: #call:Media_stopRecord|callback|1
        stopRecord : function(callback) {
            call('Media_stopRecord', callback);
        }
    }

    // 获取设备的电池信息
    Native.Battery = {
        /**
         * 获取设备的电池信息
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Object} data 以对象方式返回的电池信息
         *     {
         *         status: '', //状态
         *         health: '', //健康值
         *         level: '', //剩余电量
         *         scale: '', //最大电量值
         *         plugged: '', //连接的电源插座
         *         temperature: '', //温度
         *         technology: '' //电池类型
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.Battery.getBatteryInfo(function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.Battery_getBatteryInfo(String callback);
        // IOS监听URL: #call:Battery_getBatteryInfo|callback|1
        getBatteryInfo : function(callback) {
            call('Battery_getBatteryInfo', callback);
        }
    }

    // 设备令牌相关
    Native.DeviceToken = {
        /**
         * 获取设备令牌(Android为deviceID)，用于推送功能
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, String token, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {String} token token字符串或deviceID
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.DeviceToken.getDeviceToken(function(isSuccess, token, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.DeviceToken_getDeviceToken(String callback);
        // IOS监听URL: #call:DeviceToken_getDeviceToken|callback|1
        getDeviceToken : function(callback) {
            call('DeviceToken_getDeviceToken', callback);
        }
    }

    // 本地文件系统相关
    Native.File = {
        /**
         * 检查一个目录或文件是否存在
         * @param {String} path 进行检查的目录或文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Boolean result, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Boolean} result：文件或目录是否存在
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileExists('/sdcard/log', function(isSuccess, result, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileExists(String path, String callback);
        // IOS监听URL: #call:File_fileExists|path|callback|1
        fileExists : function(path, callback) {
            call('File_fileExists', path, callback);
        },
        /**
         * 获取某个目录下的所有文件夹和文件列表
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Array data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Array} data 对象形式的文件列表数组
         *     [{
         *         type: 'file', //类型, file-文件类型, folder-目录类型
         *         name: '', //文件或目录名称
         *         ext: '', //文件扩展名（如果是目录则为空）
         *         size: 0, //文件大小（以字节为单位，如果是目录则为空）
         *         createtime: '' //文件或目录的创建时间
         *     }]
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.getList('/sdcard', function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         for(var i = 0; i < data.length; i++) {
         *             // TODO
         *         }
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_getList(String path, String callback);
        // IOS监听URL: #call:File_getList|path|callback|1
        getList : function(path, callback) {
            call('File_getList', path, callback);
        },
        /**
         * 获取某个目录下的所有子目录列表
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Array data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Array} data 对象形式的目录列表数组
         *     [{
         *         name: '', //目录名称
         *         createtime: '' //目录的创建时间
         *     }]
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.getFolderList('/sdcard', function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         for(var i = 0; i < data.length; i++) {
         *             // TODO
         *         }
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_getFolderList(String path, String callback);
        // IOS监听URL: #call:File_getFolderList|path|callback|1
        getFolderList : function(path, callback) {
            call('File_getFolderList', path, callback);
        },
        /**
         * 获取某个目录的详细信息
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Array} data 对象形式的目录数据
         *     {
         *         name: '', //目录名称
         *         path: '', //目录的完整路径
         *         size: '', //目录中所有文件的大小
         *         readonly: '', //是否为只读
         *         hidden: '', //是否为隐藏
         *         createtime: '', //目录创建时间
         *         updatetime: '' //目录修改时间
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.getFolderInfo('/sdcard/log', function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_getFolderInfo(String path, String callback);
        // IOS监听URL: #call:File_getFolderInfo|path|callback|1
        getFolderInfo : function(path, callback) {
            call('File_getFolderInfo', path, callback);
        },
        /**
         * 创建目录
         * @param {String} name 目录名称
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.folderCreate('log', '/sdcard', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_folderCreate(String name, String path, String callback);
        // IOS监听URL: #call:File_folderCreate|name|path|callback|1
        folderCreate : function(name, path, callback) {
            call('File_folderCreate', name, path, callback);
        },
        /**
         * 删除目录
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.folderRemove('/sdcard/log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_folderRemove(String path, String callback);
        // IOS监听URL: #call:File_folderRemove|path|callback|1
        folderRemove : function(path, callback) {
            call('File_folderRemove', path, callback);
        },
        /**
         * 对目录进行重命名
         * @param {String} name 新的目录名称
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.folderRename('applog', '/sdcard/log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_folderRename(String name, String path, String callback);
        // IOS监听URL: #call:File_folderRename|name|path|callback|1
        folderRename : function(name, path, callback) {
            call('File_folderRename', name, path, callback);
        },
        /**
         * 将一个目录复制到粘贴板
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.folderCopy('/sdcard/log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_folderCopy(String path, String callback);
        // IOS监听URL: #call:File_folderCopy|path|callback|1
        folderCopy : function(path, callback) {
            call('File_folderCopy', path, callback);
        },
        /**
         * 将一个目录剪切到粘贴板
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.folderCut('/sdcard/log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_folderCut(String path, String callback);
        // IOS监听URL: #call:File_folderCut|path|callback|1
        folderCut : function(path, callback) {
            call('File_folderCut', path, callback);
        },
        /**
         * 将粘贴板中已复制的目录粘贴到某个目录下
         * @param {String} path 进行粘贴的目标目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调方法在目录粘贴成功后调用
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.folderPaste('/sdcard/newfolder', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_folderPaste(String path, String callback);
        // IOS监听URL: #call:File_folderPaste|path|callback|1
        folderPaste : function(path, callback) {
            call('File_folderPaste', path, callback);
        },
        /**
         * 获取某个目录下的所有文件列表
         * @param {String} path 目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Array data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Array} data 对象形式的文件列表数组
         *     [{
         *         name: '', //文件名称
         *         ext: '', //文件扩展名
         *         size: 0, //文件大小（以字节为单位）
         *         createtime: '' //文件的创建时间
         *     }]
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.getFileList('/sdcard', function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         for(var i = 0; i < data.length; i++) {
         *             // TODO
         *         }
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_getFileList(String path, String callback);
        // IOS监听URL: #call:File_getFileList|path|callback|1
        getFileList : function(path, callback) {
            call('File_getFileList', path, callback);
        },
        /**
         * 获取某个文件的详细信息
         * @param {String} path 文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Object data, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Array} data 对象形式的文件数据
         *     {
         *         name: '', //文件名称
         *         ext: '', //文件扩展名
         *         path: '', //文件的完整路径
         *         size: '', //文件大小
         *         readonly: '', //是否为只读
         *         hidden: '', //是否为隐藏
         *         createtime: '', //文件创建时间
         *         updatetime: '' //最后修改时间
         *     }
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.getFileInfo('/sdcard/error.log', function(isSuccess, data, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_getFileInfo(String path, String callback);
        // IOS监听URL: #call:File_getFileInfo|path|callback|1
        getFileInfo : function(path, callback) {
            call('File_getFileInfo', path, callback);
        },
        /**
         * 创建文件
         * @param {String} name 文件名称
         * @param {String} path 文件存放路径
         * @param {String} content 文件内容
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileCreate('20130307.log', '/sdcard', '', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileCreate(String name, String path, String content, String callback);
        // IOS监听URL: #call:File_fileCreate|name|path|content|callback|1
        fileCreate : function(name, path, content, callback) {
            call('File_fileCreate', name, path, content, callback);
        },
        /**
         * 修改文件内容
         * @param {String} path 文件存放路径
         * @param {String} content 文件内容
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileUpdateContent('/sdcard/20130307.log', '', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileUpdateContent(String path, String content, String callback);
        // IOS监听URL: #call:File_fileUpdateContent|path|content|callback|1
        fileUpdateContent : function(path, content, callback) {
            call('File_fileUpdateContent', path, content, callback);
        },
        /**
         * 向文件的末尾追加内容
         * @param {String} path 文件存放路径
         * @param {String} content 追加的内容
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.filePushContent('/sdcard/20130307.log', '', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_filePushContent(String path, String content, String callback);
        // IOS监听URL: #call:File_filePushContent|path|content|callback|1
        filePushContent : function(path, content, callback) {
            call('File_filePushContent', path, content, callback);
        },
        /**
         * 删除文件
         * @param {String} path 文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileRemove('/sdcard/20130307.log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileRemove(String path, String callback);
        // IOS监听URL: #call:File_fileRemove|path|callback|1
        fileRemove : function(path, callback) {
            call('File_fileRemove', path, callback);
        },
        /**
         * 对文件进行重命名
         * @param {String} name 新的文件名称
         * @param {String} path 文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileRename('20130307.log', '/sdcard/error.log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileRename(String name, String path, String callback);
        // IOS监听URL: #call:File_fileRename|name|path|callback|1
        fileRename : function(name, path, callback) {
            call('File_fileRename', name, path, callback);
        },
        /**
         * 将一个文件复制到粘贴板
         * @param {String} path 文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileCopy('/sdcard/20130307.log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileCopy(String path, String callback);
        // IOS监听URL: #call:File_fileCopy|path|callback|1
        fileCopy : function(path, callback) {
            call('File_fileCopy', path, callback);
        },
        /**
         * 将一个文件剪切到粘贴板
         * @param {String} path 文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileCut('/sdcard/20130307.log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileCut(String path, String callback);
        // IOS监听URL: #call:File_fileCut|path|callback|1
        fileCut : function(path, callback) {
            call('File_fileCut', path, callback);
        },
        /**
         * 将粘贴板中已复制的文件粘贴到某个目录下
         * @param {String} path 进行粘贴的目标目录路径
         * @param {Function} callback 回调方法
         *
         * callback回调方法在文件粘贴成功后调用
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.filePaste('/sdcard/20130307.log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_filePaste(String path, String callback);
        // IOS监听URL: #call:File_filePaste|path|callback|1
        filePaste : function(path, callback) {
            call('File_filePaste', path, callback);
        },
        /**
         * 调用系统自带的应用打开文件
         * @param {String} path 需要打开的文件路径
         * @param {Function} callback 回调方法
         *
         * callback回调形式: callback(Boolean isSuccess, Number timestamp);
         * @param {Boolean} isSuccess 是否成功
         *     true-成功
         *     false-失败
         * @param {Number} timestamp：以毫秒为单位的回调时间戳。
         *
         * @examples
         * Native.File.fileOpen('/sdcard/20130307.log', function(isSuccess, timestamp) {
         *     if(isSuccess) {
         *         // TODO
         *     }else {
         *         // TODO
         *     }
         * });
         */
        // Android注册方法: window.android.File_fileOpen(String path, String callback);
        // IOS监听URL: #call:File_fileOpen|path|callback|1
        fileOpen : function(path, callback) {
            call('File_fileOpen', path, callback);
        }
    }

    /**
     * @private
     *
     * JavaScript向Native提供的方法定义
     */
    var methodList = {};
    /**
     * @private
     *
     * 定义一个用于触发监听到某个方法中所有事件的函数
     * @param {String} method
     */
    var trigger = function(method) {
        var evts = methodList[method], args = slice.call(arguments, 1);
        for(var i = 0, len = evts.length; i < len; i++) {
            evts[i].apply(window, args);
        }
    }
    /**
     * @private
     *
     * 注册一个JavaScript方法供Native调用
     * @param {String} method
     */
    var register = function(method) {
        var evts = methodList[method];
        if(!evts) {
            evts = [];
            methodList[method] = evts;
            window['JS_' + method] = function() {
                var args = slice.call(arguments, 0);
                args.unshift(method);
                trigger.apply(window, args);
            }
        }

        return evts;
    }
    /**
     * 监听事件, 当Native调用一个已注册的JavaScript方法时被触发
     * @param {String} method
     * @param {Function} fn
     */
    Native.addEventListener = function(method, fn) {
        var evts = methodList[method];
        evts.push(fn);
    }
    /**
     * 移除监听事件
     * @param {String} method
     * @param {Function} fn
     */
    Native.removeEventListener = function(method, fn) {
        var evts = methodList[method], e = null;
        for(var i = 0, len = evts.length; i < len; i++) {
            e = evts[i];
            if(e === fn) {
                evts[i] = null;
                evts.splice(i, 1);
            }
        }
    }
    /**
     * 移除某个方法中监听的所有事件
     * @param {String} method
     */
    Native.removeEventListenerByType = function(method) {
        methodList[method] = [];
    }
    /**
     * 移除所有监听事件
     */
    Native.removeAllEventListener = function() {
        for(var method in methodList) {
            Native.removeEventListenerByType(method);
        }
    }
    /**
     * 当Native从后台切换到前台时触发该事件
     *
     * @example
     * Native.addEventListener('resume', function() {
     *     // TODO
     * });
     */
    // Native调用方法 window.JS_resume()
    register('resume');
    /**
     * 当Native收到服务器推送消息时发送给Web
     *
     * @example
     * Native.addEventListener('pushMessage', function(data, timestamp) {
     *     // TODO
     * });
     */
    // Native调用方法 window.JS_pushMessage(data, timestamp)
    // @param {Mixed} data 服务器推送的消息数据
    // @param {Number} timestamp 客户端收到消息的时间戳
    register('pushMessage');
})();
