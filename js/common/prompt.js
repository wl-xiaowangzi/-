/**
 * 删除提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/prompt.html", "bootstrap"], function ($, art, API, promptTpl) {
    return function (iptinfo) {
        // 渲染数据
        var $prompt = $(promptTpl);
        // 移出上次模板
        $("#modalPrompt").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $prompt.appendTo("body").modal();
        $(".iptinfo").html(iptinfo);
    }
})