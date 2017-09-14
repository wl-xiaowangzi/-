/**
 * 删除提示
 * Created by land on 2017/9/4.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configDeviceDel.html", "bootstrap"], function ($, art, API, configDeviceDelTpl) {

    return function (dv_id) {
        $("#modalConfigDeviceDel").remove();

        var $configDeviceDel = $(configDeviceDelTpl);

        $configDeviceDel.on("click", ".btn-del-device", function () {
            console.log(dv_id)
            $configDeviceDel.modal("hide");
            API.delDevice(dv_id, function (res) {
                $("#btnDeviceManagement").trigger("click");
            })
        })

        $configDeviceDel.appendTo("body").modal();

    }
})