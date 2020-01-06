$(function () {
    setPool();
    createPool();

    function setPool() {
        $(".keeper_user_container").loongTable({
            "url": "http://13.15.11.34:3000/getPoollist",
            "height": "full-125",
            "ajaxData": true,
            "pagination": true,
            "hasCheckbox": false,
            "method": "GET",
            "params": {},
            "fields": [
                {
                    "name": "poolName",
                    "title": "存储名称",
                    'width': '100px'
                },
                {
                    "name": "path",
                    "title": "路径",
                    "overflowTips": true
                },
                {
                    "name": "type",
                    "title": "存储池类型",
                    'width': '100px'
                },
                {
                    "name": "fileType",
                    "title": "文件分布类型",
                    'width': '120px'
                },
                {
                    "name": "createTime",
                    "title": "创建时间",
                    'width': '180px',
                    "formater": "dateFormat",
                    "pattern": "yyyy-MM-dd HH:mm",
                },
                {
                    "name": "operation",
                    "title": "操作",
                    "type": "button",
                    'width': '80px',
                    "operations": [{
                        "text": "删除",
                        "icon": '#icon-shanchu',
                        "callBack": function (index) {
                            delePool(index)
                        }
                    }
                    ]
                }]
        });
    }

    function createPool() {
        $('.create-pool').on('click', function () {
            var formStr = "form[name=addPoolForm]";
            $.loongDialog({
                "title": doI18n("keeper_create_pool"),
                "isInfo": false,
                "isClosed": true,
                "content": $('.create-storage-pool').html(),
                "buttons": [{
                    "txt": doI18n("btn_ok"),
                    "callback": function () {
                        var formData = $form.serializeArray();
                        console.log(formData);
                    }
                }, {
                    "txt": doI18n("btn_cancel")
                }]
            });
            $('.pool-select-box').loongSelect({
                width: "410px",
                name: "poolStyle",
                'data': [
                    {
                        'key': '普通',
                        'value': '1'
                    },
                    {
                        'key': '文件系统',
                        'value': '2'
                    },
                    {
                        'key': '合并',
                        'value': '3'
                    }
                ],
            });
            $('.file-select-box').loongSelect({
                width: "410px",
                name: "poolStyle",
                'data': [
                    {
                        'key': '副本',
                        'value': '1'
                    },
                    {
                        'key': '副本1',
                        'value': '2'
                    },
                    {
                        'key': '副本2',
                        'value': '3'
                    }
                ],
            });
            var $form = $(".dialog-wrap").find(formStr);
            formValid($form);
            fileTable();
        })
    }

    function delePool() {
        $.loongDialog({
            "title": doI18n("keeper_dele_pool"),
            "isInfo": true,
            "isClosed": true,
            "content": doI18n("keeper_dele_pool_info"),
            "buttons": [{
                "txt": doI18n("btn_ok"),
                "callback": function () {
                    return true;
                }
            }, {
                "txt": doI18n("btn_cancel")
            }]
        });
    }

    function fileTable() {
        $(".dialog-wrap").on('click', '.browse-file-icon', function () {
            var $input = $(".dialog-wrap").find(".create-pool-form").find("input[name=path]");
            isBroseFile.init($input);
        });
    }
})



