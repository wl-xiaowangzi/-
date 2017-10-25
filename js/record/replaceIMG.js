/**
 * 替换更新图提示
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","common/api","text!tpls/recordReplaceIMG.html","common/prompt","bootstrap"],function($,art,API,recordReplaceIMGTpl,prompt){
    return function(ps_id,ps_type,facedata,faceimage){
            // 移除模态框
            $("#modalRecordReplaceIMG").remove();
            // 渲染模板
            var $recordReplaceIMG=$(recordReplaceIMGTpl);
            // 提交表单
            $recordReplaceIMG.on("submit", "form", function () {
            API.replaceRecordIMG(ps_id,ps_type,facedata,faceimage, function (res) {
                $recordReplaceIMG.modal("hide");
                // var iptinfo="更新图设置成功";
                // prompt(iptinfo);
            })
            return false;
        })
            $recordReplaceIMG.appendTo("body").modal();
    }
})