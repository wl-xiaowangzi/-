/**
 * 设备添加
 * Created by land on 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configDeviceAdd.html","bootstrap"],function($,art,configDeviceAddTpl){
    
    return function(){
     
            $("#modalConfigDeviceAdd").remove();

            var $configDeviceAdd=$(configDeviceAddTpl);
            
            $configDeviceAdd.appendTo("body").modal();

    }
})