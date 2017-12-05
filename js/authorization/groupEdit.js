/**
 * 编辑授权组
 * Author:land
 *   Date:2017/11/23
 */
define(["jquery", "artTemplate", "text!tpls/authorGroupEdit.html", "common/api"], function ($, art, authorGroupEditTpl, API) {
    return function (datanumber) {
        // 获取参数
        var page = $("#btnPager").attr("page") || 1;
        var start = 60 * (page - 1);
        var limit = 60;
        var keyword = $("#btnSearchWords").attr("deviceKeyword");
        var datanumber = datanumber;
        // 渲染模板
        API.queryDeviceList(start, limit, keyword, function (res) {
            var authorGroupEdit = art.render(authorGroupEditTpl, res);
            var $authorGroupEdit = $(authorGroupEdit);
            // 提交表单
            $authorGroupEdit
                .on("click", ".btn-blue", function () {
                    if($("#group-edit-name").val()==""){
                        $(".cfmPWD").removeClass("opacity0");
                        $("#group-edit-name").focus();
                        setTimeout(function(){
                            $(".cfmPWD").addClass("opacity0");
                        },2000)
                    }
                    // 获取表单参数 
                    var list = $("#box3").find(".back-gray");
                    var deviceids = $(list[0]).attr("deviceid");
                    var name = $("#group-edit-name").val();
                    var status = 1;
                    for(var i = 1;i < list.length; i++){
                        deviceids += "," + $(list[i]).attr("deviceid");
                    }
                    console.log(datanumber,name,status,deviceids)
                    // 接口
                    API.editAuthorizationgroup(datanumber,name,status,deviceids, function (res) {
                        $authorGroupEdit.modal("hide");
                        //成功的添加授权组->刷新授权组页面
                        $("#btnAuthorization").trigger("click");
                    })
                    return false; //阻止同步提交表单
                })
                .on("click", ".btn-default", function () {
                    // 获取表单参数 
                   $("#box3>span").removeClass("back-gray");
                   $("#box4>span").addClass("displayN");
                    return false; //阻止同步提交表单
                });
            // 清除上一次的模板
            $("#modalauthorGroupEdit").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $authorGroupEdit.appendTo("body").modal();
            // 设置默认值
            API.queryAuthorizationgroup(datanumber,function(res){
                    console.log(res)
                    var name = res.data[0].name;
                    $("#group-edit-name").val(name);
                for(var i = 0;i<res.data[0].deiviceList.length;i++){
                    var deviceno = res.data[0].deiviceList[i].deviceno;
                    var box3device = "box3"+deviceno;
                    var box4device = "box4"+deviceno;
                    $("#"+box3device).addClass("back-gray");
                    $("#"+box4device).removeClass("displayN");
                }
            })
            $("#box3>.device-name").on("click", function () {
                $(this).addClass("back-gray");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box4>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("displayN");
            })
            $("#box4>.device-name").on("click", function () {
                $(this).addClass("displayN");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box3>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("back-gray");
            })
        })
    };
});