/**
 * 删除提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/prompt.html", "bootstrap"], function ($, art, API, promptTpl) {
    return function (iptinfo) {
        // 移出上次模板
        $("#modalPrompt").remove();
        // 渲染数据
        var $prompt = $(promptTpl);
        // 提交表单
        $prompt.appendTo("body").modal();
        $(".iptinfo").html(iptinfo);
    }
})