/**
 * 相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api", "datetimepicker", "datetimepickerLang"], function ($, art, cameraTpl, API) {
    return function () {
        $("#modalcamera").remove();

        var $camera = $(cameraTpl);
        
           
        
        $camera.appendTo("body").modal();

    };
});