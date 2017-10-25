/**
 * 删除提示
 * Created by land on 2017/9/4.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configDeviceDel.html", "bootstrap"], function ($, art, API, configDeviceDelTpl) {
    return function (dv_id) {
        // 渲染模板
        var $configDeviceDel = $(configDeviceDelTpl);
        // 提交表单
        $configDeviceDel.on("submit", "form", function () {
            API.delDevice(dv_id, function (res) {
                 $configDeviceDel.modal("hide");
                $("#btnDeviceManagement").trigger("click");
            })
            return false;//阻止表单的自动提交
        })
        // 移除上一次的模态框
        $("#modalConfigDeviceDel").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $configDeviceDel.appendTo("body").modal();
    }
})