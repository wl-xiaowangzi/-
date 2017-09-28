/**
 * 设备管理
 * Created by land 2017/9/4.
 */
define(["jquery", "artTemplate","common/api", "text!tpls/configDeviceManagement.html", "./deviceAdd", "./deviceEdit", "./deviceDel","pager"], function ($, art,API, configDeviceManagementTpl, deviceAdd, deviceEdit, deviceDel) {

    return function () {
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 30*(page-1);
        var limit = 30*(page);
        var keyword = $("#btnSearchWords").attr("keyword");
        $("#btnSearchWords").removeAttr("keyword");
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
                    console.log(dv_id)
                    deviceDel(dv_id);
                })
                .on("click",".btn-search",function(){
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword",keyword);
                    $("#btnDeviceManagement").trigger("click");//刷新
                })

            //把渲染好的元素放到页面中
            $(".module-container").append($configDeviceManagement);

            var num = Math.ceil(res.sumsize/30);
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