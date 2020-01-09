$(function () {
    let nodeTable = {};
    let ipTable = {};
    searchNode();
    deleNode();
    setNode();
    startNode();
    stopNode();
    createNode();

    function setNode() {
        nodeTable = $(".keeper_user_container").loongTable({
            "url": "http://13.15.11.34:3000/getNodelist",
            "height": "full-125",
            "ajaxData": true,
            "pagination": true,
            "hasCheckbox": true,
            "method": "GET",
            "params": {},
            "fields": [
                {
                    "name": "number",
                    "title": "对象节点编号",
                    'width': '100px'
                },
                {
                    "name": "ips",
                    "title": "IP",
                    "formater": function (data) {
                        var str = '';
                        var div = $('<div></div>')
                        var spanOuter;
                        var span;
                        for (var i = 0; i < 5; i++) {
                            if (data[i] != undefined) {
                                str = str + data[i] + '    ';
                            }
                        }
                        spanOuter = $("<span style='white-space: pre'>" + str + "</span>");
                        $(div).append(spanOuter);
                        if (data.length > 5) {
                            var more_ip = ''
                            for (var i = 5; i < data.length; i++) {
                                more_ip = more_ip + data[i] + "</br>";
                            }
                            span = $('<span class="ip-more"  data-toggle="tooltip" data-placement="top" data-title="' + more_ip + '" >等' + data.length + '项</span>')
                        }
                        $(div).append(span);
                        $.loongToolTip(div);
                        return div;
                    }
                },
                {
                    "name": "serviceStatus",
                    "title": "服务状态",
                    'width': '100px',
                    'formater': function(data) {
                        if(data) {
                            data = '已启动';
                        }else {
                            data = '已停止';
                        }
                        return data;
                    }
                },
                {
                    "name": "serviceStatus",
                    "title": "操作",
                    'width': '100px',
                    'formater': function (data, all) {
                        var style = 'cursor: pointer;color:#1188dd';
                        var classClick = 'class-click';
                        if (!data) {
                            style = 'color:#999';
                            classClick = '';
                        }
                        var $span = $('<span title="修改节点" class="' + classClick + '" style="' + style + '">' +
                            '  <svg class="icon fs14">' +
                            '    <use xlink:href="#icon-tipsuccess"></use>' +
                            '  </svg>' +
                            '</span>');
                        $span.on('click', function (event) {
                            event.stopPropagation();
                            if ($(this).hasClass('class-click')) {
                                modifyNode(all)
                            }
                        })
                        return $span;
                    }
                }
            ]
        });
    }

    function deleNode() {
        $('.del-node').on('click', function () {
            var nodeIndexs = nodeTable.getCheckedIndex();
            var length = nodeIndexs.length;
            var nodeData = '';
            var content = '节点';
            for (var i = 0; i < 5; i++) {
                if (nodeIndexs[i] != undefined) {
                    if (i != 0) {
                        content = ',节点';
                    }
                    nodeData = nodeData + content + nodeTable.getRowData(nodeIndexs[i]).number
                }
            }
            if (length > 5) {
                nodeData = '您确定要删除' + nodeData + '等' + length + '项吗？';
            } else {
                nodeData = '您确定要删除' + nodeData + '吗？';
            }
            if (length != 0) {
                $.loongDialog({
                    "title": doI18n("keeper_remove_nodes"),
                    "isInfo": true,
                    "isClosed": true,
                    "content": nodeData,
                    "buttons": [{
                        "txt": doI18n("btn_ok"),
                        "callback": function () {
                            return true;
                        }
                    }, {
                        "txt": doI18n("btn_cancel")
                    }]
                });
            } else {
                $.loongDialog({
                    "content": doI18n('keeper_select_node_dele'),
                    "msgType": "warning",
                    "isModal": false
                });
            }
        })
    }

    function searchNode() {
        $(".node-query").loongQuery({
            inputWidth: '300px',
            placeholderTxt: doI18n("keeper_ip_search"),
            doquery: function (value, name) {
                console.log(value, name)
            }
        });
    }

    function startNode() {
        $('.start-Node').on('click', function () {
            var nodeIndexs = nodeTable.getCheckedIndex();
            var length = nodeIndexs.length;
            var nodeData = '';
            var content = '节点';
            for (var i = 0; i < 5; i++) {
                if (nodeIndexs[i] != undefined) {
                    if (i != 0) {
                        content = ',节点';
                    }
                    nodeData = nodeData + content + nodeTable.getRowData(nodeIndexs[i]).number
                }
            }
            if (length > 5) {
                nodeData = '您确定要启动' + nodeData + '等' + length + '项吗？';
            } else {
                nodeData = '您确定要启动' + nodeData + '吗？';
            }
            if (nodeIndexs.length == 0) {
                $.loongDialog({
                    "content": doI18n('keeper_select_node_start'),
                    "msgType": "warning",
                    "isModal": false
                });
            }else {
                $.loongDialog({
                    "title": '启动节点',
                    "isInfo": true,
                    "isClosed": true,
                    "content": nodeData,
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

    function stopNode() {
        $('.stop-Node').on('click', function () {
            var nodeIndexs = nodeTable.getCheckedIndex();
            var length = nodeIndexs.length;
            var nodeData = '';
            var content = '节点';
            for (var i = 0; i < 5; i++) {
                if (nodeIndexs[i] != undefined) {
                    if (i != 0) {
                        content = ',节点';
                    }
                    nodeData = nodeData + content + nodeTable.getRowData(nodeIndexs[i]).number
                }
            }
            if (length > 5) {
                nodeData = '您确定要停止' + nodeData + '等' + length + '项吗？';
            } else {
                nodeData = '您确定要停止' + nodeData + '吗？';
            }
            if (nodeIndexs.length == 0) {
                $.loongDialog({
                    "content": doI18n('keeper_select_node_stop'),
                    "msgType": "warning",
                    "isModal": false
                });
            }else {
                $.loongDialog({
                    "title": '停止节点',
                    "isInfo": true,
                    "isClosed": true,
                    "content": nodeData,
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

    function createNode() {
        $('.create-node').on('click', function () {
            let span = $('<span style="cursor: pointer" class="des-tip" data-toggle="tooltip" data-placement="right" data-title="一个节点中的IP需在同一台服务器上，选择多个服务器将创建出多个对应的对象节点">' +
                '  <svg class="icon fs14">' +
                '    <use xlink:href="#icon-wenhaobangzhu"></use>' +
                '  </svg>' +
                '</span>');
            let div = $('<div></div>');
            div.append(doI18n("keeper_create_nodes"));
            div.append(span);
            $.loongToolTip(div);
            $.loongDialog({
                "title": div,
                "isInfo": false,
                "isClosed": true,
                "modalType": 'max',
                "content": $('.create-object-node').html(),
                "buttons": [{
                    "txt": doI18n("btn_ok"),
                    "callback": function () {
                        return true;
                    }
                }, {
                    "txt": doI18n("btn_cancel")
                }]
            });
            $(".ip-query").loongQuery({
                inputWidth: '300px',
                placeholderTxt: doI18n("keeper_server_ip_search"),
                doquery: function (value, name) {
                    console.log(value, name)
                }
            });
            ipTable = $(".node-table").loongTable1({
                "url": "http://13.15.11.34:3000/getNodelist",
                "height": "383",
                "ajaxData": true,
                "pagination": true,
                "hasCheckbox": true,
                "method": "GET",
                "params": {},
                "fields": [
                    {
                        "name": "number",
                        "title": "服务器id",
                        'width': '70px'
                    },
                    {
                        "name": "service",
                        "title": "运行服务",
                        'width': '220px',
                        "formater": function (data) {
                            var str = '';
                            for (var i = 0; i < data.length; i++) {
                                str = str + data[i] + '   ';
                            }
                            return '<div class="test" style="white-space: pre-wrap;">' + str + '</divclass>';
                        }
                    },
                    {
                        "name": "ips",
                        "title": "可选节点IP",
                        "formater": function (val, all) {
                            var ips = all.ips;
                            var noIps = all.noIps;
                            var $checkbox;
                            var div = $('<div style="white-space: pre-wrap;"></div>');
                            var ipsDiv;
                            for (var i = 0; i < ips.length; i++) {
                                ipsDiv = $('<div class="fl"></div>');
                                $checkbox = $("<div class='checkbox-normal fl'><svg class='icon' aria-hidden='true'><use xlink:href='#icon-gou'></use></svg><input type='checkbox' class='checkbox-input'></div>");
                                let str = '<span> ' + ips[i] + ' （已使用） </span>'
                                ipsDiv.append($checkbox);
                                ipsDiv.append(str);
                                div.append(ipsDiv);
                                $checkbox.on("click", function () {
                                    $(this).toggleClass("checkbox-select");
                                    var td = $(this).parents("td").not(".checkbox-col,.table-operation,.has-click");
                                    ipTable.setCheck(td);
                                    event.stopPropagation();
                                });
                            }
                            for (var i = 0; i < noIps.length; i++) {
                                ipsDiv = $('<div class="fl"></div>');
                                $checkbox = $("<div class='checkbox-normal fl'><svg class='icon' aria-hidden='true'><use xlink:href='#icon-gou'></use></svg><input type='checkbox' class='checkbox-input'></div>");
                                let str = '<span> ' + noIps[i] + ' （未使用） </span>'
                                ipsDiv.append($checkbox);
                                ipsDiv.append(str);
                                div.append(ipsDiv);
                                $checkbox.on("click", function () {
                                    $(this).toggleClass("checkbox-select");
                                    event.stopPropagation()
                                });
                            }
                            return div
                        }
                    }]
            });
            checkboxClick();
        })
    }

    function checkboxClick() {
        $('.loong-table').on('click', function () {
            var indexs = ipTable.getCheckedIndex();
            var data = [];
            for (var i = 0; i < indexs.length; i++) {
                data.push(ipTable.getRowData(indexs[i]));
            }
        })
    }

    function modifyNode(data) {
        $.loongDialog({
            "title": '修改节点',
            "isInfo": false,
            "isClosed": true,
            "modalType": 'max',
            "content": $('.modify-object-node').html(),
            "buttons": [{
                "txt": doI18n("btn_ok"),
                "callback": function () {
                    return true;
                }
            }, {
                "txt": doI18n("btn_cancel")
            }]
        });
        $(".modify-node-table").loongTable({
            height: "383",
            // withIndex: false,
            hasCheckbox: true,
            fields: [
                {
                    "name": "number",
                    "title": "服务器id",
                    'width': '70px'
                },
                {
                    "name": "service",
                    "title": "运行服务",
                    'width': '220px',
                    "formater": function (data) {
                        var str = '';
                        for (var i = 0; i < data.length; i++) {
                            str = str + data[i] + '   ';
                        }
                        return '<div class="test" style="white-space: pre-wrap;">' + str + '</divclass>';
                    }
                },
                {
                    "name": "ips",
                    "title": "可选节点",
                    "formater": function (val, all) {
                        var ips = all.ips;
                        var noIps = all.noIps;
                        var $checkbox;
                        var div = $('<div style="white-space: pre-wrap;"></div>');
                        var ipsDiv;
                        for (var i = 0; i < ips.length; i++) {
                            ipsDiv = $('<div class="fl"></div>');
                            $checkbox = $("<div class='checkbox-normal fl'><svg class='icon' aria-hidden='true'><use xlink:href='#icon-gou'></use></svg><input type='checkbox' class='checkbox-input'></div>");
                            let str = '<span> ' + ips[i] + ' （已使用） </span>'
                            ipsDiv.append($checkbox);
                            ipsDiv.append(str);
                            div.append(ipsDiv);
                            $checkbox.on("click", function () {
                                $(this).toggleClass("checkbox-select");
                                event.stopPropagation();
                            });
                        }
                        for (var i = 0; i < noIps.length; i++) {
                            ipsDiv = $('<div class="fl"></div>');
                            $checkbox = $("<div class='checkbox-normal fl'><svg class='icon' aria-hidden='true'><use xlink:href='#icon-gou'></use></svg><input type='checkbox' class='checkbox-input'></div>");
                            let str = '<span> ' + noIps[i] + ' （未使用） </span>'
                            ipsDiv.append($checkbox);
                            ipsDiv.append(str);
                            div.append(ipsDiv);
                            $checkbox.on("click", function () {
                                $(this).toggleClass("checkbox-select");
                                event.stopPropagation()
                            });
                        }
                        return div
                    }
                }],
            ajaxData: false,
            data: [data]
        });
    }
})



