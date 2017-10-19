/**
 * 替换更新图提示
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","common/api","text!tpls/recordReplaceIMG.html","bootstrap"],function($,art,API,recordReplaceIMGTpl){
    return function(ps_id,ps_type,facedata,faceimage){
            // 移除模态框
            $("#modalRecordReplaceIMG").remove();
            // 渲染模板
            var $recordReplaceIMG=$(recordReplaceIMGTpl);
            // 提交表单
            $recordReplaceIMG.on("submit", "form", function () {
            API.replaceRecordIMG(ps_id,ps_type,facedata,faceimage, function (res) {
                $recordReplaceIMG.modal("hide");
            })
            return false;
        })
            $recordReplaceIMG.appendTo("body").modal();
    }
})