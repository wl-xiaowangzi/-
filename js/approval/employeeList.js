/**
 * 员工入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalList.html", "./show", "./refuse","./agree","pager"], function ($, art, API, approvalListTpl, showApproval, refuse,agree) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var start = 30*(page-1);
        var limit = 30*(page);
        var keyword = $("#btnSearchWords").attr("keyword");
        // 移除参数
        $("#btnSearchWords").removeAttr("keyword");
        $("#btnPager").removeAttr("page");
        // 调用人员列表
        API.getPeopleApprovalList(start,limit, 1,keyword, function (res) {
        //编译模板
        var approvalList=art.render(approvalListTpl,res);
        var $approvalList = $(approvalList);
        //入库审批点击事件
        $approvalList
            .on("click", ".btn-show-approval", function () {
                //获取人员id
                var ep_id=$(this).attr("ep_id");
                //加载审批信息的模块
                showApproval(ep_id);
            })
             .on("click", ".btn-pass", function () {
                //获取人员id
                var ep_id=$(this).attr("ep_id");
                //调用员工审查接口
                var checksuggestion="审核通过";
                API.checkEmployee(ep_id,1,checksuggestion, function (res) {
                    agree();
                    // 刷新审核页面
                    $("#btnApproval").trigger("click");
                })
            })
            .on("click", ".btn-refuse", function () {
                //获取人员id
                var ep_id=$(this).attr("ep_id");
                //加载员工驳回模块
                refuse(ep_id);
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
                    $("#btnEmployeeApproval").trigger("click");//刷新
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

        $(".peopleType").html("员工");
        var num = Math.ceil(res.sumsize/30);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnEmployeeApproval").trigger("click");//刷新
                }
            });
        })
    }
});