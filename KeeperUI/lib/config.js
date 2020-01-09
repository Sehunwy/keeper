function loongKeeper() {
    this.homePage = null;
    this.pathName = "../../../KeeperUI";

}

loongKeeper.prototype.getMenu = function () {
    var user = window.sessionStorage.getItem("user");
    var role = getUserRoles(user, "loongDisk");
    if (role.admin) {
        this.homePage = {
            "txt": doI18n("loong_keeper"),
            "dst": "/DiskUI/page/dashboard.html",
            "css": "/DiskUI/css/dashboard.css"
        }
        return {
            "txt": doI18n("loong_keeper"),
            "dst": "",
            "css": "",
            "firstIcon": "#iconyunpanshouqi",
            "iconSelected": "#iconyunpanzhankai",
            "children": [{
                "dst": "/KeeperUI/page/object-node.html",
                "css": "",
                "icon": "#icon-fuwuguanli",
                "txt": doI18n("keeper_object_node"),
                "iconSelected": "#icon-fuwuguanli"
            }, {
                "dst": "/KeeperUI/page/storage-pool.html",
                "css": "",
                "icon": "#icon-bumenguanli",
                "txt": doI18n("keeper_storage_pool"),
                "iconSelected": "#icon-bumenguanli"
            }, {
                "dst": "/KeeperUI/page/user.html",
                "css": "",
                "icon": "#icon-chengyuanguanli",
                "txt": doI18n("keeper_user_mana"),
                "iconSelected": "#icon-chengyuanguanli"
            }
            ]
        }
    }
    if (role.orgadmin) {
        // this.homePage = {
        //     "txt" : "云盘",
        //     "dst" : "/DiskUI/page/dashboard.html",
        //     "css" : "/DiskUI/css/dashboard.css"
        // }
        return {
            "txt": doI18n("disk_loongKeeper"),
            "dst": "",
            "css": "",
            "firstIcon": "#iconyunpanshouqi",
            "iconSelected": "#iconyunpanzhankai",
            "children": [{
                "dst": "/KeeperUI/page/user.html",
                "css": "",
                "icon": "#icon-chengyuanguanli",
                "txt": doI18n("keeper_user_mana"),
                "iconSelected": "#icon-iscsiguanli"
            }]
        }
    }

};

loongKeeper.prototype.getSetting = function () {
    // return {
    //  "name" : "云盘管理设置",
    //  "dst" : "",
    //  "children" : [ {
    //      "name" : "日志查询",
    //      "dst" : "/DiskUI/page/set/query/log-query.html"
    //  }, {
    //      "name" : "文件过滤",
    //      "dst" : "/DiskUI/page/set/files-filter.html"
    //  } ]
    // }
}

loongKeeper.prototype.getGuide = function () {
    return {
        "stepArry": {
            "title": doI18n("disk_loongStore"),
            "url": "/DiskUI/page/guide-set.html",
            "export": "/DiskUI/js/guide.js",
            "module": "guideGlobal.diskGuide"
        },
        "tipArry": {
            "url": "/DiskUI/page/guide-tip.html"
        }
    }
}

loongKeeper.prototype.getIconfont = function () {
    return {
        "fontPath": "/KeeperUI/font/iconfont.js"
    }
}
loongKeeper.prototype.getValidate = function () {
    return {
        "name": "keeper",
        "path": "/KeeperUI/validate"
    }
}
loongKeeper.prototype.getAsyncTask = function () {
    return {
        "name": "keeper",
        "export": "/KeeperUI/js/asyncTask.js",
    }
}

var loongKeeper = new loongKeeper();
window.loongData = loongKeeper;
