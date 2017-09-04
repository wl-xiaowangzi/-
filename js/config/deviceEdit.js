/**
 * 设备添加
 * Created by land on 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configDeviceEdit.html","bootstrap"],function($,art,configDeviceEditTpl){
    
    return function(){
     
            $("#modalConfigDeviceEdit").remove();

            var $configDeviceEdit=$(configDeviceEditTpl);
            
            $configDeviceEdit.appendTo("body").modal();

    }
})