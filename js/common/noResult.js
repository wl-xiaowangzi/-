/**
 * 搜索无结果
 * Author:land
 *   Date:2017/9/11
 */

define(["jquery", "artTemplate", "text!tpls/noResult.html"], function ($, art, noResultTpl) {

    return function () {
        //清空原页面元素
        $(".module-container").empty();

        //转换为dom元素
        var $noResult = $(noResultTpl);

        //把渲染好的元素放到页面中
        $(".module-container").append($noResult);

    }
})