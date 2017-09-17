/**
 * 入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "common/noResult", "text!tpls/approvalList.html", "./show", "./refuse"], function ($, art, API, noResult, approvalListTpl, showApproval, refuse) {
    return function () {
        API.getApprovalList(0,12,function(res){

        //编译模板
        var approvalList=art.render(approvalListTpl);
        var $approvalList = $(approvalList);

        //入库审批点击事件
        $approvalList
            .on("click", ".btn-show-approval", function () {

                //获取课时id
                // var ct_id=$(this).parent().attr("ct_id");

                //加载编辑课时的模块
                // editCourseTime(ct_id);
                showApproval();
            })
            .on("click", "#btn-employee", function () {
                API.getPeopleApprovalList(0, 12, 2, function (res) {
                    if (res.sumsize == 0) {
                        // 清空原内容 
                        $(".table").empty()
                        $("body").css({
                            "background-image": "url(imgs/noResult.png)"
                        })
                        $(".peopleType").html("员工");
                    } else {
                        $(".module-container").empty()
                        //编译模板
                        var approvalList = art.render(approvalListTpl, res);
                        var $approvalList = $(approvalList);
                        //把渲染好的元素放到页面中
                        $(".module-container").append($approvalList);
                        $(".peopleType").html("员工");
                    }

                })
            })
            .on("click", "#btn-visiter", function () {
                API.getVisitorApprovalList(0, 12, 2, function (res) {
                    if (res.sumsize == 0) {
                        // 清空原内容
                        $(".table").empty()
                        $("body").css({
                            "background-image": "url(imgs/noResult.png)"
                        })
                        $(".peopleType").html("访客");
                    } else {
                        $("body").css({
                            "background-image": "none"
                        })
                        $(".module-container").empty()
                        //编译模板
                        var approvalList = art.render(approvalListTpl, res);
                        var $approvalList = $(approvalList);
                        //把渲染好的元素放到页面中
                        $(".module-container").append($approvalList);
                        $(".peopleType").html("访客");
                    }
                })
            })
            .on("click", ".btn-refuse", function () {
                refuse();
            })


        //把渲染好的元素放到页面中
        $(".module-container").append($approvalList);
        })

    }
});