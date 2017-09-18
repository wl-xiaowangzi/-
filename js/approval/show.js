/**
 * 入库审批编辑
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalShow.html", "./refuse"], function ($, art, API, approvalShowTpl, refuse) {

    return function (ps_id) {
        //获取对应的审批信息
        API.showRecord(ps_id, function (res) {
            console.log(res)
            //删除原来的模态框
            $("#modalShowInfo").remove();
            //编译模板文件，获取含有真正数据的字符串
            var approvalShow = art.render(approvalShowTpl, res);
            //将字符串转换为jq对象
            var $approvalShow = $(approvalShow);
            $approvalShow
                .on("click", ".btn-refuse", function () {
                    $approvalShow.on("submit", "form", function () {
                        $approvalShow.modal("hide");
                        refuse();
                        return false; //阻止表单同步提交
                    })
                })
            //把jq对象中包含的dom元素放到页面中，并以模态框的形式展现出来
            $approvalShow.appendTo("body").modal();
        })
    }
})