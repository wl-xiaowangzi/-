/**
 * 入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalList.html", "./show","./visitantShow" ,"./refuse","./visitantRefuse","./agree","pager"], function ($, art, API, approvalListTpl, showApproval,showVisitantApproval ,refuse,visitantRefuse,agree) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var start = 30*(page-1);
        var limit = 30;
        var keyword = $("#btnSearchWords").attr("approvalKeyword");
        var qtype=$("#btnApQtype").attr("qtype")*1||1;
        var persontype=$("#btnAptype").attr("persontype");
        var checkresult=$("#btnCheckresult").attr("checkresult")||0;
        // 移除参数
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("visitantkeyword");
        $("#btnSearchWords").removeAttr("peoplekeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("visitantSearchWords");
        $("#btnKeepSearchWords").removeAttr("peoplesearchwords");
        $("#btnKeepSearchWords").removeAttr("recordsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
        // 获取审批列表
        console.log(start,limit,keyword,qtype,checkresult,persontype)
        API.getApprovalList(start,limit,keyword,qtype,checkresult,persontype,function(res){
            console.log(res)
            if (res.data.list.length == 0) {
                $("#messages").removeClass("opacity1").addClass("opacity0");
                $(".people-icon").append("<style>.people-icon::after{background-color: transparent;}</style>");
            } else {
                $("#messages").removeClass("opacity0").addClass("opacity1");
                $(".people-icon").append("<style>.people-icon::after{background-color: red;}</style>");
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
                $("#btnAptype").removeAttr("persontype");
                $("#btnApproval").trigger("click");
            })
            .on("click", ".btn-employee", function () {
                $("#btnAptype").attr("persontype",1);
                $("#btnApproval").trigger("click");
            })
            .on("click", ".btn-visiter", function () {
                $("#btnAptype").attr("persontype",2);
                 $("#btnApproval").trigger("click");
            })
            .on("click","#deal-n",function(res){
                $("#btnApQtype").attr("qtype",1);
                $("#btnApproval").trigger("click");
            })
            .on("click","#deal-y",function(res){
                $("#btnApQtype").attr("qtype",2);
                $("#btnApproval").trigger("click");
            })
            .on("click","#btn-agree",function(res){
                $("#btnCheckresult").attr("checkresult",1);
                $("#btnApproval").trigger("click");
            })
            .on("click","#btn-refuse",function(res){
                $("#btnCheckresult").attr("checkresult",2);
                $("#btnApproval").trigger("click");
            })
            .on("click","#btn-overtimer",function(res){
                $("#btnCheckresult").attr("checkresult",3);
                $("#btnApproval").trigger("click");
            })
            .on("click","#approval_search_btn",function(){
                var keyword = $("#approval_search_word").val();
                $("#btnSearchWords").attr("approvalKeyword",keyword);
                // 设置搜索关键字保留
                $("#btnKeepSearchWords").attr("approvalSearchWords",keyword);
                $("#btnApproval").trigger("click");//刷新
            })
            .on("click","#approval_search_btn_n",function(){
                var keyword = $("#approval_search_word_n").val();
                $("#btnSearchWords").attr("approvalKeyword",keyword);
                // 设置搜索关键字保留
                $("#btnKeepSearchWords").attr("approvalSearchWords",keyword);
                $("#btnApproval").trigger("click");//刷新
            })

        //把渲染好的元素放到页面中
        $(".module-container").empty();
        $(".module-container").append($approvalList);
        if(qtype==2){
            $("#deal").addClass("active");
            $("#deal-y").parent().addClass("active");
            $("#undeal").removeClass("active");
            $("#deal-n").parent().removeClass("active");
        }
        if(persontype==1){
            $(".peopleType").html("员工");
            $("#btn-overtimer").addClass("displayN");
        }else if(persontype==2){
            $(".peopleType").html("访客");
            $("#btn-overtimer").removeClass("displayN");
        }else{
            $(".peopleType").html("所有人员");
            $("#btn-overtimer").removeClass("displayN");
        }
        if(checkresult==1){
            $(".checkresult").html("已通过");
        }else if(checkresult==2){
            $(".checkresult").html("已驳回");
        }else if(checkresult==3){
            $(".checkresult").html("已失效");
        }else{
            $(".checkresult").html("审批结果");
        }
        // 下拉选项变为鼠标移入触发
        $('div.dropdown').mouseover(function() {   
        $(this).addClass('open');}).mouseout(function(){$(this).removeClass('open');});  
         // 设置搜索关键字保留
        var searchWords=$("#btnKeepSearchWords").attr("approvalSearchWords")
        $("#approval_search_word").val(searchWords);
        $("#approval_search_word_n").val(searchWords);
        // 分页
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