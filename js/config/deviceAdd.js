/**
 * 设备添加
 * Created by land on 2017/9/4.
 */
define(["jquery", "artTemplate","common/api", "text!tpls/configDeviceAdd.html", "bootstrap"], function ($, art,API, configDeviceAddTpl) {

    return function () {

        $("#modalConfigDeviceAdd").remove();

        var $configDeviceAdd = $(configDeviceAddTpl);
        $configDeviceAdd
            .on("submit", "form", function () {

                var formData = $(this).serialize();

                API.addDevice(formData, function (res) {
                    console.log(res)
                    $configDeviceAdd.modal("hide");

                    //成功的添加设备-->刷新设备管理页面
                    $("#btnDeviceManagement").trigger("click");

                })

                return false; //阻止同步提交表单
            });

        $configDeviceAdd.appendTo("body").modal();

    }
})