(function(){
    var util = {};

    util.validateForm = function($form, fn){
        var ret = $.loongValidate($form);
        if (ret.hasError) {
            var input = ret.element;
            showValid($form, input, ret);
        } else {
            fn && fn();
        }
    };

    util.dealAjaxError = function(data, error, success){
        if (data && data.error) {
            var errorTip;
            if(data.error == doI18n("store_util_unknow_error")){
                errorTip = i18n[data.error] ? doI18n(data.error,data.error_message) : data.error || data.error_message;
            }else{
                errorTip = i18n[data.error] ? doI18n(data.error,data.error_message?data.error_message.split(","):data.error_message) : data.error || data.error_message;
            }
            $.loongDialog({
                "content": errorTip,
                "isModal": false,
                "msgType": "error"
            });
            error && error();
        } else {
            success && success();
        }
    };

    util.byteWithUnitFloat = function(num){
        if (!num) {
            return {
                quota: 0,
                rate: 0,
                unit: "B"
            }
        }
        if (num / (1024 * 1024 * 1024 * 1024 * 1024) >= 1) {
            return {
                quota: (num / ( 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2),
                rate: 1024 * 1024 * 1024 * 1024 * 1024,
                unit: "PB"
            }
        } else if (num / (1024 * 1024 * 1024 * 1024) >= 1) {
            return {
                quota: (num / ( 1024 * 1024 * 1024 * 1024)).toFixed(2),
                rate: 1024 * 1024 * 1024 * 1024,
                unit: "TB"
            }
        } else if (num / (1024 * 1024 * 1024) >= 1) {
            return {
                quota: (num / ( 1024 * 1024 * 1024)).toFixed(2),
                rate: 1024 * 1024 * 1024,
                unit: "GB"
            }
        } else if (num / (1024 * 1024) >= 1) {
            return {
                quota: (num / ( 1024 * 1024 )).toFixed(2),
                rate: 1024 * 1024,
                unit: "MB"
            }
        } else if (num / (1024) >= 1) {
            return {
                quota: (num / ( 1024 )).toFixed(2),
                rate: 1024,
                unit: "KB"
            }
        } else {
            return {
                quota: num,
                rate: 1,
                unit: "B"
            }
        }
    };

    return util;
})();
