/**
 * 验证用户是否登录
 * Created by land on 2017/9/6.
 */
define(["jquery","cookie"],function($){
    //验证用户是否登录？-->条件：通过cookie访问到tc_name
    var tc_name=$.cookie("tc_name");
    if(!tc_name){
        //用户并没有登录过
        location.href="login.html";
    }
})