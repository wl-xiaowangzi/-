/**
 * 员工入库审批详情
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalShow.html", "./refuse"], function ($, art, API, approvalShowTpl, refuse) {

    return function (ps_id) {
        console.log(ps_id)
        //获取对应的审批信息
        API.getEmployeeBaseInfo(ps_id, function (res) {
            
            //删除原来的模态框
            $("#modalShowInfo").remove();
            //编译模板文件，获取含有真正数据的字符串
            var approvalShow = art.render(approvalShowTpl, res.data);
            //将字符串转换为jq对象
            var $approvalShow = $(approvalShow);
            $approvalShow
                .on("click", ".btn-pass", function () {
                    //获取人员id
                    var ep_id = $(this).parent().attr("ep_id");
                    var checksuggestion = "审核通过";
                    //加载访客审查接口
                    API.checkVisitor(ep_id, 1, checksuggestion, function (res) {
                        
                        // 刷新审核页面
                        $("#btnApproval").trigger("click");
                    })
                })
                .on("click", ".btn-refuse", function () {
                        //获取人员id
                        var ep_id = $(this).parent().attr("ep_id");
                        
                        $approvalShow.modal("hide");
                        refuse(ep_id);
                        return false; //阻止表单同步提交
                })
            //把jq对象中包含的dom元素放到页面中，并以模态框的形式展现出来
            $approvalShow.appendTo("body").modal();
        })
    }
})