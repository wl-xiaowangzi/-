/**
 * 设备管理
 * Created by land 2017/9/4.
 */
define(["jquery", "artTemplate","common/api", "text!tpls/configDeviceManagement.html", "./deviceAdd", "./deviceEdit", "./deviceDel","pager"], function ($, art,API, configDeviceManagementTpl, deviceAdd, deviceEdit, deviceDel) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var start = 60*(page-1);
        var limit = 60;
        var keyword = $("#btnSearchWords").attr("deviceKeyword");
        // 移除参数
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("visitantkeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("peoplekeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("visitantSearchWords");
        $("#btnKeepSearchWords").removeAttr("recordSearchWords");
        $("#btnKeepSearchWords").removeAttr("peoplesearchwords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
        // 获取设备列表
        API.getDeviceList(start,limit,keyword,function(res){
            //编译模板
            var configDeviceManagement = art.render(configDeviceManagementTpl, res);
            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $configDeviceManagement = $(configDeviceManagement);
            //实现编辑设备
            $configDeviceManagement
                .on("click", ".btn-device-add", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    deviceAdd();
                })
                .on("click", ".btn-device-edit", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    deviceEdit(dv_id);
                })
                .on("click", ".btn-device-del", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    deviceDel(dv_id);
                })
                .on("click","#device_search_btn",function(){
                    var keyword = $("#device_search_word").val();
                    $("#search").val(keyword);
                    $("#btnSearchWords").attr("deviceKeyword",keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("deviceSearchWords",keyword);
                    $("#btnDeviceManagement").trigger("click");//刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($configDeviceManagement);
            // 去掉左侧菜单栏激活状态
            $("#sidebar-menu .side-menu li").removeClass("activate");
            // 设置搜索关键字保留
            var searchWords=$("#btnKeepSearchWords").attr("deviceSearchWords")
            $("#device_search_word").val(searchWords);
            $("#search").val(searchWords);
            // 分页
            var num = Math.ceil(res.sumsize/60);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnDeviceManagement").trigger("click");//刷新
                }
            });
        })
    }
})