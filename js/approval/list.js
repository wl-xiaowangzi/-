/**
 * 入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalList.html", "./show", "./refuse","./visitantRefuse"], function ($, art, API, approvalListTpl, showApproval, refuse,visitantRefuse) {
    return function () {
        API.getApprovalList(0,50,function(res){
            console.log(res)
        //编译模板
        var approvalList=art.render(approvalListTpl,res);
        var $approvalList = $(approvalList);

        //入库审批点击事件
        $approvalList
            .on("click", ".btn-show-approval", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                var ps_type=$(this).parent().attr("ps_type");
                //加载审批信息的模块
                showApproval(ps_id,ps_type);
            })
             .on("click", ".pass1", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                var checksuggestion="审核通过";
                //调用员工审查接口
                 API.checkEmployee(ps_id,1,checksuggestion, function (res) {
                    console.log(res);
                    // 刷新审核页面
                    $("#btnApproval").trigger("click");
                })
            })
            .on("click", ".pass2", function () {
                //获取人员id
                var ps_id=$(this).parent().attr("ps_id");
                var checksuggestion="审核通过";
                //加载访客审查接口
                 API.checkVisitor(ps_id,1,"checksuggestion", function (res) {
                    console.log(res);
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
                // API.getPeopleApprovalList(0, 12, 1, function (res) {
                //     console.log(res)
                //     if (res.sumsize == 0) {
                //         // 清空原内容 
                //         $(".table").empty()
                //         $("body").css({
                //             "background-image": "url(imgs/noResult.png)"
                //         })
                //         $(".peopleType").html("员工");
                //     } else {
                //         $(".module-container").empty()
                //         //编译模板
                //         var approvalList = art.render(approvalListTpl, res);
                //         var $approvalList = $(approvalList);
                //         //把渲染好的元素放到页面中
                //         $(".module-container").append($approvalList);
                //         $(".peopleType").html("员工");
                //     }

                // })
                $("#btnEmployeeApproval").trigger("click");
            })
            .on("click", "#btn-visiter", function () {
                // API.getVisitorApprovalList(0, 12, 1, function (res) {
                //     console.log(res)
                //     if (res.sumsize == 0) {
                //         // 清空原内容
                //         $(".table").empty()
                //         $("body").css({
                //             "background-image": "url(imgs/noResult.png)"
                //         })
                //         $(".peopleType").html("访客");
                //     } else {
                //         $("body").css({
                //             "background-image": "none"
                //         })
                //         $(".module-container").empty()
                //         //编译模板
                //         var approvalList = art.render(approvalListTpl, res);
                //         var $approvalList = $(approvalList);
                //         //把渲染好的元素放到页面中
                //         $(".module-container").append($approvalList);
                //         $(".peopleType").html("访客");
                //     }
                // })
                 $("#btnVisitorApproval").trigger("click");
            })
            

        //把渲染好的元素放到页面中
        $(".module-container").append($approvalList);
        })

    }
});