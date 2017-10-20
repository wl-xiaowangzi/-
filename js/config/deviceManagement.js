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
        var keyword = $("#btnSearchWords").attr("keyword");
        // 移除参数
        setTimeout(function(){
            $("#btnSearchWords").removeAttr("keyword");
        },30000);
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
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
                .on("click",".btn-search",function(){
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword",keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("searchWords",keyword);
                    $("#btnDeviceManagement").trigger("click");//刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").append($configDeviceManagement);
            // 去掉左侧菜单栏激活状态
            $("#sidebar-menu .side-menu li").removeClass("activate");
            // 设置搜索关键字保留
            var searchWords=$("#btnKeepSearchWords").attr("searchWords")
            $(".search-word").val(searchWords)
            // 清除上一次的关键字
            $("#btnKeepSearchWords").removeAttr("searchWords")
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