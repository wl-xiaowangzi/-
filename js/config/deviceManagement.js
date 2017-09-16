/**
 * 设备管理
 * Created by land 2017/9/4.
 */
define(["jquery", "artTemplate","common/api", "text!tpls/configDeviceManagement.html", "./deviceAdd", "./deviceEdit", "./deviceDel"], function ($, art,API, configDeviceManagementTpl, deviceAdd, deviceEdit, deviceDel) {

    return function () {

        API.getDeviceList(0,12,function(res){
        
            //编译模板
            var configDeviceManagement = art.render(configDeviceManagementTpl, res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $configDeviceManagement = $(configDeviceManagement);

            //实现编辑设备
            $configDeviceManagement
                .on("click", ".btn-device-add", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    deviceAdd();
                })
                .on("click", ".btn-device-edit", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    deviceEdit(dv_id);
                })
                .on("click", ".btn-device-del", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    console.log(dv_id)
                    deviceDel(dv_id);
                })

            //把渲染好的元素放到页面中
            $(".module-container").append($configDeviceManagement);
        })



    }
})