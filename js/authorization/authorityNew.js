/**
 * 添加授权组
 * Author:land
 *   Date:2017/11/23
 */
define(["jquery", "artTemplate", "text!tpls/authorNew.html", "common/api"], function ($, art, authorNewTpl, API) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page") || 1;
        var start = 60 * (page - 1);
        var limit = 60;
        var keyword = $("#btnSearchWords").attr("deviceKeyword");
        // 渲染模板
        API.queryDeviceList(start, limit, keyword, function (res) {
            var authorNew = art.render(authorNewTpl, res);
            var $authorNew = $(authorNew);
            // 提交表单
            $authorNew
                .on("click", ".btn-blue", function () {
                    if($("#temp-group-name").val()==""){
                        $(".cfmPWD").removeClass("opacity0");
                        $("#temp-group-name").focus();
                        setTimeout(function(){
                            $(".cfmPWD").addClass("opacity0");
                        },2000)
                    }
                    // 获取表单参数 
                    var list = $("#box5").find(".back-gray");
                    var deviceids = $(list[0]).attr("deviceid");
                    for(var i = 1;i < list.length; i++){
                        deviceids += "," + $(list[i]).attr("deviceid");
                    }
                    console.log(deviceids)
                    // 接口
                    // API.addUser(formData, function (res) {
                    //     $authorGroupAdd.modal("hide");
                    //     //成功的添加用户->刷新用户管理页面
                    //     $("#btnUsersManager").trigger("click");
                    // })
                    return false; //阻止同步提交表单
                })
                .on("click", ".btn-default", function () {
                    // 获取表单参数 
                   $("#box5>span").removeClass("back-gray");
                   $("#box6>span").addClass("displayN");
                    return false; //阻止同步提交表单
                });
            // 清除上一次的模板
            $("#modalauthorNew").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $authorNew.appendTo("body").modal();
            $("#box5>.device-name").on("click", function () {
                $(this).addClass("back-gray");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box6>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("displayN");
            })
            $("#box6>.device-name").on("click", function () {
                $(this).addClass("displayN");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box5>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("back-gray");
            })
        })
    };
});