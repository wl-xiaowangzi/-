/**
 * 设备编辑
 * Created by land on 2017/9/4.
 */
define(["jquery","artTemplate","common/api","text!tpls/configDeviceEdit.html","bootstrap"],function($,art,API,configDeviceEditTpl){
    return function(dv_id){
        // 查询设备信息
        API.queryDevice(dv_id,function(res){
            // 渲染模板
            var configDeviceEdit=art.render(configDeviceEditTpl,res.data[0]);
            var $configDeviceEdit=$(configDeviceEdit);
            // 提交表单    
            $configDeviceEdit.on("submit","form",function(){
                //获取表单信息
                var formData=$(this).serialize();
                API.editDevice(formData,function(res){
                    //成功的更新了分类信息
                    $configDeviceEdit.modal("hide");//关闭模态框
                    $("#btnDeviceManagement").trigger("click");//刷新了分类列表模块
                })
                return false;//阻止表单的自动提交
            });
            //  移除上一次的模态框
            $("#modalConfigDeviceEdit").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $configDeviceEdit.appendTo("body").modal();
        });
    }
})