/**
 * 添加授权组
 * Author:land
 *   Date:2017/11/23
 */
define(["jquery", "artTemplate", "text!tpls/authorGroupAdd.html", "common/api","common/prompt"], function ($, art, authorGroupAddTpl, API,prompt) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page") || 1;
        var start = 60 * (page - 1);
        var limit = 60;
        var keyword = $("#btnSearchWords").attr("deviceKeyword");
        // 渲染模板
        API.queryDeviceList(start, limit, keyword, function (res) {
            var authorGroupAdd = art.render(authorGroupAddTpl, res);
            var $authorGroupAdd = $(authorGroupAdd);
            // 提交表单
            $authorGroupAdd
                .on("click", ".btn-blue", function () {
                    if($("#group-name").val()==""){
                        $(".cfmPWD").removeClass("opacity0");
                        $("#group-name").focus();
                        setTimeout(function(){
                            $(".cfmPWD").addClass("opacity0");
                        },2000)
                    }
                    // 获取表单参数 
                    var list = $("#box1").find(".back-gray");
                    var deviceids = $(list[0]).attr("deviceid");
                    var name = $("#group-name").val();
                    var status=1;
                    for(var i = 1;i < list.length; i++){
                        deviceids += "," + $(list[i]).attr("deviceid");
                    }
                    if(deviceids==undefined){
                        // prompt("设备不能为空！")
                        alert("请选择设备")
                    }
                    console.log(deviceids,name)
                    // 接口
                    API.addAuthorizationgroup(name,deviceids,status, function (res) {
                        $authorGroupAdd.modal("hide");
                        //成功的添加授权组->刷新授权组页面
                        $("#btnAuthorization").trigger("click");
                    })
                    return false; //阻止同步提交表单
                })
                .on("click", ".btn-default", function () {
                    // 获取表单参数 
                   $("#box1>span").removeClass("back-gray");
                   $("#box2>span").addClass("displayN");
                    return false; //阻止同步提交表单
                });
            // 清除上一次的模板
            $("#modalauthorGroupAdd").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $authorGroupAdd.appendTo("body").modal();
            $("#box1>.device-name").on("click", function () {
                $(this).addClass("back-gray");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box2>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("displayN");
            })
            $("#box2>.device-name").on("click", function () {
                $(this).addClass("displayN");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box1>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("back-gray");
            })
        })
    };
});