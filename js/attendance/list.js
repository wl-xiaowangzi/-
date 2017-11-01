/**
 * 用户列表
 * Created by land on 2017/9/1.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/attendanceList.html","pager"], function ($, art, API, attendanceListTpl) {

    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var keyword = $("#btnSearchWords").attr("keyword");
        var start = 30*(page-1);
        var limit = 30;
        // 移除参数
        setTimeout(function(){
            $("#btnSearchWords").removeAttr("keyword");
        },30000);
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 调用接口
        API.getUsersList(start, limit, keyword, function (res) {
            //编译模板
            // var attendanceList = art.render(usersListTpl, res);
            var $attendanceList = $(attendanceListTpl);
            //实现添加分类功能--->给添加分类的按钮绑定单击事件
            $attendanceList
                .on("click", "#btnUserAdd", function () {
                    // 获取该系统组织id
                    var organizationid = $.cookie("organizationid");
                    // 加载添加用户模块
                    addUsers(organizationid)
                })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($attendanceList);
            // 设置搜索关键字保留
            var searchWords=$("#btnKeepSearchWords").attr("searchWords")
            $(".search-word").val(searchWords)
            // 清除上一次的关键字
            $("#btnKeepSearchWords").removeAttr("searchWords")
            // 设置分页
            var num = Math.ceil(res.sumsize/30);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnAttendanceManager").trigger("click");//刷新
                }
            });
        })
    };
})