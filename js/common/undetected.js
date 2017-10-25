/**
 * 未检测到人脸
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","text!tpls/undetected.html","bootstrap"],function($,art,undetectedTpl){
    return function(info){
            // 转换为jq对象
            var $undetected=$(undetectedTpl);
            var info = info;
            // 提交表单
            $undetected
            .on("click", ".btn-blue", function () {
                // 重绘清空canvas
                context.clearRect(0, 0, 640, 480);
                $undetected.modal("hide");
                return false;
            })
            .on("click",".btn-default",function(){
                // 重绘清空canvas
                context.clearRect(0, 0, 640, 480);
                $undetected.modal("hide");
                return false;
            })
            // 移除上一次呼出的母台科
            $("#modalUndetected").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $undetected.appendTo("body").modal();
            $(".cameraInfo").html(info)
    }
})