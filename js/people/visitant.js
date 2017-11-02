/**
 * 访客列表
 * Created by land on 2017/9/2.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleVisitantList.html", "./visitantinfo", "./visitantAdd", "./visitantDel", "./visitantExpired","common/visitorCamera","pager"], function ($, art, API, peopleVisitantListTpl, visitantinfo, visitantAdd, visitantDel, visitantExpired,visitorCamera) {
    return function () {
        var page = $("#btnPager").attr("page")||1;
        var start = 40*(page-1);
        var limit = 40;
        var keyword = $("#btnSearchWords").attr("visitantKeyword");
        $("#btnPager").removeAttr("page");
        // 渲染前清空数据
        $(".module-container").empty();
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("peoplekeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("peoplesearchwords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("recordsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
        // 调用接口
        API.getVisitorList(start, limit, keyword, function (res) {
            //编译模板
            var peopleVisitantList = art.render(peopleVisitantListTpl, res);
            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $peopleVisitantList = $(peopleVisitantList);
            //编辑入库信息
            $peopleVisitantList
                .on("click", ".btn-peopleList", function () {
                    $("#btnPeopleManager").trigger("click");
                })
                .on("click", ".btn-edit-visitant-baseinfo", function () {
                    var vs_id = $(this).parent().attr("vs_id");
                    visitantinfo(vs_id);
                })
                .on("click", "#visitantAdd", function () {
                    visitorCamera();
                })
                .on("click", ".btn-visitant-del", function () {
                    var vs_id = $(this).attr("vs_id");
                    var vs_status = $(this).attr("vs_status");
                    if(vs_status==3){
                        visitantExpired(vs_id);
                    }else{
                        visitantDel(vs_id);
                    }
                })
                .on("click", "#visitant_search_btn", function () {
                    var keyword = $("#visitant_search_word").val();
                    $("#search").val(keyword);
                    $("#btnSearchWords").attr("visitantKeyword", keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("visitantSearchWords",keyword);
                    $("#btnVisitorManager").trigger("click"); //刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($peopleVisitantList);
            // 设置下拉菜单鼠标移入触发
            $('div.dropdown').mouseover(function() {   
            $(this).addClass('open');}).mouseout(function(){$(this).removeClass('open');});  
            // 设置搜索关键字保留
            var searchWords=$("#btnKeepSearchWords").attr("visitantSearchWords");
            $("#visitant_search_word").val(searchWords);
            $("#search").val(searchWords);
            // 设置分页
            var num = Math.ceil(res.sumsize/40);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnVisitorManager").trigger("click"); //刷新
                }
            });
        })
    }
})