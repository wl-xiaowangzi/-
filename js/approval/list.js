/**
 * 入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalList.html", "./show","./visitantShow" ,"./refuse","./visitantRefuse","./agree","pager"], function ($, art, API, approvalListTpl, showApproval,showVisitantApproval ,refuse,visitantRefuse,agree) {
    return function () {
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 30*(page-1);
        var limit = 30*(page);
        var keyword = $("#btnSearchWords").attr("keyword");
        $("#btnSearchWords").removeAttr("keyword");

        API.getApprovalList(start,limit,keyword,function(res){
            if (res.data.length == 0) {
                $("#messages").removeClass("opacity1").addClass("opacity0")
            } else {
                $("#messages").removeClass("opacity0").addClass("opacity1").html(res.data.length);
            }
        //编译模板
        
        var approvalList=art.render(approvalListTpl,res);
        var $approvalList = $(approvalList);

        //入库审批点击事件
        $approvalList
            .on("click", ".show1", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                //加载审批信息的模块
                showApproval(ps_id);
            })
            .on("click", ".show2", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                //加载审批信息的模块
                showVisitantApproval(ps_id);
            })
             .on("click", ".pass1", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                var checksuggestion="审核通过";
                //调用员工审查接口
                 API.checkEmployee(ps_id,1,checksuggestion, function (res) {
                    console.log(res);
                    agree()
                    // 刷新审核页面
                    $("#btnApproval").trigger("click");
                })
            })
            .on("click", ".pass2", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                var checksuggestion="审核通过";
                //加载访客审查接口
                 API.checkVisitor(ps_id,1,checksuggestion, function (res) {
                    console.log(res);
                    agree();
                    // 刷新审核页面
                    $("#btnApproval").trigger("click");
                })
            })
            .on("click", ".refuse1", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                //加载员工驳回模块
                refuse(ps_id);
            })
            .on("click", ".refuse2", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                //加载访客驳回模块
                visitantRefuse(ps_id);
            })
            .on("click", ".btn-all", function () {
                $("#btnApproval").trigger("click");
            })
            .on("click", "#btn-employee", function () {
                $("#btnEmployeeApproval").trigger("click");
            })
            .on("click", "#btn-visiter", function () {
                 $("#btnVisitorApproval").trigger("click");
            })
            .on("click",".btn-search",function(){
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword",keyword);
                    $("#btnApproval").trigger("click");//刷新
            })

        //把渲染好的元素放到页面中
        $(".module-container").append($approvalList);

         var num = Math.ceil(res.sumsize/30);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnApproval").trigger("click");//刷新
                }
            });

        })

    }
});