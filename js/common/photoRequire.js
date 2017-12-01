/**
 * 拍照要求
 * Created by land on 2017/12/1.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/photoRequire.html"], function ($, art, API, photoRequireTpl) {

    return function () {
        //编译模板
        var $photoRequire = $(photoRequireTpl);
        //把渲染好的元素放到页面中
        // 清除上一次的模板
        $("#modalPhotoRequire").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $photoRequire.appendTo("body").modal();
    };
})