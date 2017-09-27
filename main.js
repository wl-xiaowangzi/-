/**
 * 2017.9.11
 * Created by land
 */
// 配置文件路径
require.config({
    baseUrl: "./js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        cookie: "lib/jquery.cookie",
        text: "lib/text",
        artTemplate: "lib/template-web",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        //配置模板文件夹的路径
        tpls: "../tpls",
        upload: "../assets/uploadify/jquery.uploadify",
        datetimepicker: "../assets/datetimepicker/js/bootstrap-datetimepicker",
        daterangepicker: "../assets/daterangepicker/js/daterangepicker",
        moment: "../assets/daterangepicker/js/moment.min",
        datetimepickerLang: "../assets/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        //UE主文件
        UEditor: "../assets/UEditor/ueditor.all",
        //UE配置文件
        UEditorConf: "../assets/UEditor/ueditor.config",
        eCharts: "lib/echarts.min"
    },
    // 设置依赖
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepickerLang: {
            deps: ["datetimepicker"]
        },
        daterangepicker: {
            deps: ["moment"]
        }
    }
})

//因为checkLogin依赖了cookie，所以cookie已经被加载
require(["jquery", "artTemplate", "users/list", "people/list", "people/visitant", "approval/list", "approval/employeeList", "approval/visitorList", "people/baseInfo", "record/list", "common/personalCenter", "common/changePWD", "common/api", "config/postManagement", "config/causeManagement", "config/viewLog", "config/deviceManagement", "config/organizationalManagement", "common/loading", "common/checkLogin"], function ($, art, usersList, peopleList, visitant, approvalList, approvalEmployeeList, approvalVisitorList, peopleBaseInfo, recordList, personalCenter, changePWD, API, configPostManagement, configCauseManagement, configViewLog, configDeviceManagement, configOrganizationalManagement) {

    //处理用户名
    var username = $.cookie("username");

    $("#userName").html(username);


    //给退出这个按钮绑定事件实现退出登录的功能
    $("#btnLogout").on("click", function () {
        API.logout(function (res) {
            if (res.code == 0) {
                var usid = $.cookie("USERID")
                if (usid == undefined) {
                    //清除cookie值
                    $.removeCookie("username");
                }
                //跳转到登录页
                location.href = "login.html";
            }

        })
    });
    // 获取审批信息
    var keyword;
    setInterval(function () {
        API.getApprovalList(0, 100,keyword, function (res) {
            if (res.data.length == 0) {
                $("#messages").removeClass("opacity1").addClass("opacity0")
            } else {
                $("#messages").removeClass("opacity0").addClass("opacity1").html(res.data.length);
            }
        })
    }, 30000)

    //系统设置
    $("#btnPostManagement").on("click", function () {
        $(".module-container").empty();
        configPostManagement();
    })
    $("#btnCauseManagement").on("click", function () {
        $(".module-container").empty();
        configCauseManagement();
    })
    $("#btnLog").on("click", function () {
        $(".module-container").empty();
        configViewLog();
    })
    $("#btnDeviceManagement").on("click", function () {
        $(".module-container").empty();
        configDeviceManagement();
    })
    $("#BtnOrganizationalManagement").on("click", function () {
        $(".module-container").empty();
        configOrganizationalManagement();
    })

    //个人中心
    $("#btnPersonalCenter").on("click", function () {
        personalCenter();
    })
    // 修改密码
    $("#btnChangePWD").on("click", function () {
        changePWD();
    })

    //实现点击不同功能菜单，出现不同功能的页面

    $("#btnRecord").on("click", function () {
        //识别记录
        $(".module-container").empty();
        recordList();
    })
    

    $("#btnPeopleManager").on("click", function () {
        //人员管理
        $(".module-container").empty();
        peopleList();
    });

    $("#btnVisitorManager").on("click", function () {
        //访客管理
        $(".module-container").empty();
        visitant();
    });

    $(".btnVisitantList").on("click", function () {
        //访客管理
        $(".module-container").empty();
        visitant();
    });



    $("#btnApproval").on("click", function () {
        //全部入库审批
        $(".module-container").empty();

        approvalList();
    });
    $("#btnEmployeeApproval").on("click", function () {
        //员工入库审批
        $(".module-container").empty();

        approvalEmployeeList();
    });
    $("#btnVisitorApproval").on("click", function () {
        //访客入库审批
        $(".module-container").empty();

        approvalVisitorList();
    });


    $("#btnUsersManager").on("click", function () {
        //用户管理
        $(".module-container").empty();


        //加载用户管理模块
        usersList();
    });
    $(function () { 
        document.onkeydown = function (event) { 
        var e = event || window.event || arguments.callee.caller.arguments[0]; 
        if (e && e.keyCode == 13) { 
            $(".btn-search").trigger("click");
        } 
    }; 
    }); 
    


    //希望一开始就渲染出识别记录
    //  -->触发识别记录的点击事件
    $("#btnRecord").trigger("click");

    // 给侧边栏添加点击效果
    $("#sidebar-menu .side-menu li").on("click", function () {
        $("#sidebar-menu .side-menu li").removeClass("activate");
        $(this).addClass("activate")
    })
})