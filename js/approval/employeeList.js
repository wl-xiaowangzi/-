/**
 * 员工入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalList.html", "./show", "./refuse"], function ($, art, API, approvalListTpl, showApproval, refuse) {
    return function () {
        API.getPeopleApprovalList(0, 12, 1, function (res) {
            console.log(res)
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
                console.log(ep_id)
                var checksuggestion="审核通过";
                API.checkEmployee(ep_id,1,checksuggestion, function (res) {
                    console.log(res);
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
            

        //把渲染好的元素放到页面中
        $(".module-container").append($approvalList);
        $(".peopleType").html("员工");
        })

    }
});