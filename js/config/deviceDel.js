/**
 * 删除提示
 * Created by land on 2017/9/4.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configDeviceDel.html", "bootstrap"], function ($, art, API, configDeviceDelTpl) {

    return function (dv_id) {
        $("#modalConfigDeviceDel").remove();

        var $configDeviceDel = $(configDeviceDelTpl);

        $configDeviceDel.on("submit", "form", function () {
            
            API.delDevice(dv_id, function (res) {
                 $configDeviceDel.modal("hide");
                $("#btnDeviceManagement").trigger("click");
            })
            return false;//阻止表单的自动提交
        })

        $configDeviceDel.appendTo("body").modal();

    }
})