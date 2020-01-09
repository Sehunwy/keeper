$(function () {
    let userTable = {};
    searchUser();
    // setUser();
    setTenantUser();
    createUser();
    deleUser();

    function searchUser() {
        $(".user-query").loongQuery({
            inputWidth: '300px',
            placeholderTxt: doI18n("keeper_user_search"),
            doquery: function (value, name) {
                console.log(value, name)
            }
        });
    }

    function setUser() {
        userTable = $('.keeper_user_container').loongTable({
            "url": "http://13.15.11.34:3000/getUserlist",
            "height": "full-125",
            "ajaxData": true,
            "pagination": true,
            "hasCheckbox": true,
            "method": "GET",
            "params": {},
            "fields": [
                {
                    "name": "userName",
                    "title": "用户名称",
                    'width': '100px',
                    'formater': function (v, all) {
                        let div = $('<div></div>');
                        let spanName = $('<span>' + v + '</span>');
                        let moreInfo = '邮箱：' + all.email + '<br>' + '备注：' + all.note;
                        let spanMore = $('<span style="cursor: pointer;font-size: 16px;color: #1188dd;padding-left: 5px" class="more-info">' +
                            '<svg class="icon" aria-hidden="true">\n' +
                            '    <use xlink:href="#icon-chakanxiangqing"></use>\n' +
                            '</svg>' +
                            '</span>');
                        $(div).append(spanName);
                        $(div).append(spanMore);
                        $(spanMore).loongPopOver({
                            content: moreInfo,
                            width: "220px",
                            position: "right"
                        })
                        return div;
                    }
                },
                {
                    "name": "owningPool",
                    "title": "所属存储池",
                    'formater': function (v, all) {
                        let str = ''
                        for (var i = 0; i < v.length; i++) {
                            str = str + v[i] + '    ';
                        }
                        return '<span style="white-space: pre">' + str + '</span>'
                    }
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
                    'width': '120px',
                    "operations": [
                        {
                            "text": "重置密码",
                            "icon": '#icon-zhongxincaozuo',
                            "callBack": function (index) {
                                resetPassword(index);
                            }
                        },
                        {
                            "text": "修改信息",
                            "icon": '#icon-xiugai',
                            "callBack": function (index) {
                                modifyInfo(index)
                            }
                        }
                    ]
                }]
        });
    }

    function setTenantUser() {
        userTable = $('.keeper_user_container').loongTableTree({
            "url": "http://13.15.11.34:3000/getTenantUserlist",
            "height": "full-125",
            "ajaxData": true,
            "pagination": true,
            "hasCheckbox": true,
            "isSpread": false,
            "method": "GET",
            "params": {},
            "fields": [
                {
                    "name": "userName",
                    "title": "存储池/用户名称",
                },
                {
                    "name": "secretKey",
                    "title": "秘钥个数"
                },
                {
                    "name": "bucket",
                    "title": "存储桶数量"
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
                    'width': '120px',
                    "operations": [
                        {
                            "text": "重置密码",
                            "icon": '#icon-zhongxincaozuo',
                            "callBack": function (index) {
                                resetPassword(index);
                            }
                        },
                        {
                            "text": "修改信息",
                            "icon": '#icon-xiugai',
                            "callBack": function (index) {
                                modifyInfo(index)
                            }
                        }
                    ]
                }]
        });
    }

    function createUser() {
        $('.create-user').on('click', function () {
            var formStr = "form[name=addUserForm]";
            $.loongDialog({
                "title": doI18n("keeper_create_pool"),
                "isInfo": false,
                "isClosed": true,
                "content": $('.create-user-dialog').html(),
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
                width: "380px",
                name: "user-poll",
                'data': [
                    {
                        'key': '默认存储池',
                        'value': '1'
                    },
                    {
                        'key': '研发存储池',
                        'value': '2'
                    },
                    {
                        'key': '测试存储池',
                        'value': '3'
                    },
                    {
                        'key': '支持存储池',
                        'value': '3'
                    }
                ],
            });
            var $form = $(".dialog-wrap").find(formStr);
            formValid($form);
        })
    }

    function deleUser() {
        $('.delKeeperUser').on('click', function () {
            let userIndexs = userTable.getCheckedIndex();
            let length = userIndexs.length;
            if (length == 0) {
                $.loongDialog({
                    "content": doI18n('keeper_select_user_dele'),
                    "msgType": "warning",
                    "isModal": false
                });
            } else {
                let str = ''
                if (length > 5) {
                    var children;
                    var len = length;
                    for (var i = 0; i < 5; i++) {
                        children = userTable.getRowData(userIndexs[i]).children;
                        if (children == undefined || children.length == 0) {
                            var comma = ',';
                            if (str == "") {
                                comma = ''
                            }
                            str = str + comma + userTable.getRowData(userIndexs[i]).userName;
                        }
                        else {
                            len--;
                        }
                    }
                    for (var i = 5; i < length; i++) {
                        children = userTable.getRowData(userIndexs[i]).children;
                        if (children != undefined && children.length > 0) {
                            len--
                        }
                    }
                    str = '您确定要删除' + str + '等' + len + '项吗？';
                } else {
                    var children;
                    // var children = userTable.getRowData(userIndexs[0]).children;
                    // if (children == undefined || children.length == 0) {
                    //     str = userTable.getRowData(userIndexs[0]).userName
                    // }
                    for (let i = 0; i < length; i++) {
                        children = userTable.getRowData(userIndexs[i]).children;
                        if (children == undefined || length == 0) {
                            var comma = ',';
                            if (str == "") {
                                comma = ''
                            }
                            str = str + comma + userTable.getRowData(userIndexs[i]).userName;
                        }
                    }
                    str = '您确定要删除' + str + '吗？';
                }
                $.loongDialog({
                    "title": doI18n("keeper_remove_users"),
                    "isInfo": true,
                    "isClosed": true,
                    "content": str,
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
        })
    }

    function resetPassword(index) {
        $.loongDialog({
            "title": doI18n("keeper_remove_users"),
            "isInfo": true,
            "isClosed": true,
            "content": doI18n("keeper_reset_password_info"),
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

    function modifyInfo(index) {
        var formStr = "form[name=modifyUserForm]";
        let data = userTable.getRowData(index);
        $.loongDialog({
            "title": doI18n("keeper_modify_info"),
            "isInfo": false,
            "isClosed": true,
            "content": $('.modify-info').html(),
            "buttons": [{
                "txt": doI18n("btn_ok"),
                "callback": function () {
                    return true;
                }
            }, {
                "txt": doI18n("btn_cancel")
            }]
        });
        $('.dialog-wrap .username-text').html(data.userName);
        $('.dialog-wrap .modify-email-input').val(data.email);
        $('.dialog-wrap .modify-note-input').val(data.note);
        var $form = $(".dialog-wrap").find(formStr);
        formValid($form);
    }
})



