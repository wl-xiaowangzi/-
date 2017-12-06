/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleBaseInfo.html","./edit", "./del"], function ($, art, API, peopleBaseInfoTpl,peopleEdit,peopleDel) {
    return function (ep_id) {
        //根据员工id获取员工基本信息
        API.getEmployeeBaseInfo(ep_id, function (res) {
            // 渲染模板
            var peopleBaseInfo = art.render(peopleBaseInfoTpl, res.data);
            var $peopleBaseInfo = $(peopleBaseInfo);
            // 选择照片
            var ps_id = ep_id;
            $peopleBaseInfo
            .on("click", "#PE-submit", function () {
                $peopleBaseInfo.modal("hide");
                peopleEdit(ps_id);
                return false;
            })
            .on("click",".btn-people-del",function(){
                var ep_id = $(this).attr("ep_id");
                // 传参
                peopleDel(ep_id);
                // 阻止表单自动提交
                return false;
            })
            // 移除模板
            $("#modalEditInfo").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            // 弹出模态框
            $peopleBaseInfo.appendTo("body").modal();
        })
    }
})