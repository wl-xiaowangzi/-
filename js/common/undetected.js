/**
 * 未检测到人脸
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","text!tpls/undetected.html","bootstrap"],function($,art,undetectedTpl){
    
    return function(){
     
            $("#modalUndetected").remove();

            var $undetected=$(undetectedTpl);

            $undetected.on("click", ".btn-blue", function () {
            context.clearRect(0, 0, 640, 480);
            $undetected.modal("hide");
            return false;
        })
            $undetected.appendTo("body").modal();

    }
})