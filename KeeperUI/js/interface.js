(function(){
    var interface = {};

    var urls = {
        // 查询目录是否存在
        queryPathExist: '/api/store/node/clientNode/checkDirBeforeAdd',
    }

    interface = {
        queryPathExist: function (param) {
            return $.ajax(
                $.extend({
                    url: urls.queryPathExist,
                    type: "POST"
                }, param)
            )
        }
    }

    return interface;
})()
