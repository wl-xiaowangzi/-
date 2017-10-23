/**
 * 访客入库审批列表
 * Author:land
 *   Date:2017/9/18
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalList.html", "./visitantShow", "./visitantRefuse","./agree","pager"], function ($, art, API, approvalListTpl, showApproval, visitantRefuse,agree) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var start = 30*(page-1);
        var limit = 30;
        var keyword = $("#btnSearchWords").attr("keyword");
        // 移除参数
        $("body").removeClass("noResult");
        setTimeout(function(){
            $("#btnSearchWords").removeAttr("keyword");
        },30000);
        $("#btnPager").removeAttr("page");
        // 获取访客审批列表
         API.getVisitorApprovalList(start,limit, 1,keyword, function (res) {
        //编译模板
        var approvalList=art.render(approvalListTpl,res);
        var $approvalList = $(approvalList);
        //入库审批点击事件
        $approvalList
            .on("click", ".btn-show-approval", function () {
                //获取人员id
                var vs_id=$(this).parent().parent().attr("vs_id");
                //加载审批信息的模块
                showApproval(vs_id);
            })
             .on("click", ".btn-pass", function () {
                //获取人员id
                var vs_id=$(this).parent().parent().attr("vs_id");
                //调用员工审查接口
                 API.checkEmployee(vs_id,1,"审核通过", function (res) {
                    agree();
                    // 刷新审核页面
                    $("#btnApproval").trigger("click");
                })
            })
            .on("click", ".btn-refuse", function () {
                //获取人员id
                var vs_id=$(this).parent().parent().attr("ps_id");
                //加载员工驳回模块
                visitantRefuse(vs_id);
            })
            .on("click", "#btn-employee", function () {
                $("#btnEmployeeApproval").trigger("click");
            })
            .on("click", "#btn-visiter", function () {
                $("#btnVisitorApproval").trigger("click");
            })
            .on("click", ".btn-all", function () {
                $("#btnApproval").trigger("click");
            })
            .on("click",".btn-search",function(){
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword",keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("searchWords",keyword);
                    $("#btnVisitorApproval").trigger("click");//刷新
            })

        //把渲染好的元素放到页面中
        $(".module-container").append($approvalList);
        // 下拉选项变为鼠标移入触发
        $('div.dropdown').mouseover(function() {   
        $(this).addClass('open');}).mouseout(function(){$(this).removeClass('open');});  
         // 设置搜索关键字保留
        var searchWords=$("#btnKeepSearchWords").attr("searchWords")
        $(".search-word").val(searchWords)
        // 清除上一次的关键字
        $("#btnKeepSearchWords").removeAttr("searchWords")

        $(".peopleType").html("访客");
        // 分页
         var num = Math.ceil(res.sumsize/30);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnVisitorApproval").trigger("click");//刷新
                }
            });
        })

    }
});