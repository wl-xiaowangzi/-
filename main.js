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
require(["jquery", "artTemplate", "users/list", "people/list", "approval/list", "people/baseInfo", "record/list", "common/personalCenter", "common/changePWD", "config/postManagement", "config/causeManagement", "config/viewLog", "config/deviceManagement", "config/organizationalManagement","common/loading", "common/checkLogin"], function ($, art, usersList, peopleList, approvalList, peopleBaseInfo,recordList, personalCenter, changePWD, configPostManagement, configCauseManagement, configViewLog, configDeviceManagement, configOrganizationalManagement) {


    //处理用户名
    var username = $.cookie("username");

    //$("#userImage").attr("src",tc_avatar);
    $("#userName").html(username);


    //给退出这个按钮绑定事件实现退出登录的功能
    $("#btnLogout").on("click", function () {

        // $.post("/api/logout",function(res){
        //     if(res.code==200){

        //清除cookie值
        $.removeCookie("username");
     
        //跳转到登录页
        location.href = "login.html";
        //     }
        // })
    });

    // 搜索
    $("#search").on("click",function(){

    })

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


    $("#btnApproval").on("click", function () {
        //入库审批
        $(".module-container").empty();

        approvalList();
    });





    $("#btnUsersManager").on("click", function () {
        //用户管理
        $(".module-container").empty();


        //加载用户管理模块
        usersList();
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