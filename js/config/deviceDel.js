/**
 * 删除提示
 * Created by land on 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configDeviceDel.html","bootstrap"],function($,art,configDeviceDelTpl){
    
    return function(){
     
            $("#modalConfigDeviceDel").remove();

            var $configDeviceDel=$(configDeviceDelTpl);
            
            $configDeviceDel.appendTo("body").modal();

    }
})