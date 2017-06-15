# 博学谷第5天
## cookie
1. cookie的作用：实现跨页面访问数据(状态保持-->服务器session)
    //      比如：a.html
    //              document.cookie="userName=ccc";
    //              document.cookie="userPwd=123456";
    //          就可以在同一个域名下面的另一个文件中:b.html
    //              console.log(document.cookie);
    //                      -->"userName=ccc; userPwd=123456"

2. 原生JS设置cookie值
    //<font color="red">切记:一行代码只能设置一个cookie</font>：
    //      通过document.cookie="名称=值";       设置了一个cookie
    //
3. 原生JS获取cookie值(要用服务器才能访问cookie)：
    //      document.cookie -->打印出当前域名下面的所有的cookie的集合：
    //                         -->"userName=ccc; userPwd=123456"

4. 默认情况下设置的cookie都是关闭浏览器就会消失
    //      如果希望某个cookie存储很久：document.cookie="id=888;expires="+new Date("2017-06-11 8:00:00")

## jquery.cookie插件
1. 设置cookie
$.cookie("uId",888);

2. 获取cookie
console.log($.cookie("uId"));

3. 删除cookie
$.removeCookie("uId");

4. 设置过期时间
    - $.cookie("uName","jackyChen",{ expires:new Date("2017-06-11") });     //cookie将会在指定时间过期
    - $.cookie("uName","jackyChen",{ expires:7);    //cookie将会在7天后过期

## cookie使用特点
+ 设置cookie值只能是一个字符串值，如果不是字符串也会强制转换为字符串存储    -->(sessionStorage/localStorage)

## cookie的缺点
+ 不能跨域
+ 不能存储安全性较高的内容(密码)

## JSON的序列化和反序列化
+ JSON.stringify(obj);//会将对象序列化为一个字符串格式

+ JSON.parse(objString);//会将一个JSON字符串反序列化为一个对象格式

## cookie和session的比较
+ 都是实现状态保持的一种手段
    - 跨页面访问数据
+ cookie通过浏览器端来实现、session通过服务器端来实现
+ cookie值保存的数据都不安全,session保存的数据相对安全性较高
+ cookie主要保存一些使用比较频繁，但是安全性不高的数据(比如用户名、昵称、头像)
+ session可以保存一些安全性要求较高的数据
    - 保存登录状态

## 退出登录的实现步骤：
+ 通过ajax调用退出登录的接口，接口调用成功，并且返回的数据中含有code=200，说明已经成功的退出登录
+ 删除本地存储的用户名等cookie值
+ 跳转到登录页

## uploadify
### 基本使用
<input  id="uploadify" type="file" />
<script>
    $('#uploadify').uploadify({
        swf: '/lib/uploadify/uploadify.swf',
        uploader: '/v6/uploader/avatar',
        fileTypeExts: '*.gif; *.jpg; *.png'
    });
</script>

### 属性配置
+ fileObjName   设置提交给后端文件数据对应的key
默认值为'Filedata'

+ formData  配置除fileObjName，需要额外提交的数据
值为key、value形式的对象

+ fileSizeLimit 限制文件大小
值为字符串，可以使用B、KB、MB、GB作为描述大小的单位

+ fileTypeExts  限制上传文件的类型
默认值为'*'

+ buttonText    设置按钮文本

+ buttonClass   设置按钮class属性值，用来控制按钮样式

+ auto  配置选取文件后是否自动上传
默认值为：true

+ onUploadSuccess   文件上传成功的回调
回调接收的第一个参数为文件对象，第二个参数为请求回来的数据

### 方法调用
+ upload  使用脚本的方式随时提交选择的文件
$('#uploadify').uploadify('upload');

+ disable 禁用或开启上传功能
$('#uploadify').uploadify('disable', true ||false);

+ destroy 卸载插件
$('#uploadify').uploadify('destroy');

+ settings    动态修改属性配置
$('#uploadify').uploadify('settings', 'buttonText', '按钮');



## 作业
+ 面试题
    类似的还有："bxg.com/1.html?id=666&name=ccc&pwd=123456"
                -->获取该地址中所有的get请求的数据，把数据保存在一个对象中
                    -->{ id:'666',name:'ccc',pwd:'123456' }

+ 6.11作业
+ (必做)添加分类/编辑分类的功能用文字描述出来
+ (选做)实现根据指定课程获取课时列表-->调用接口：1.5.7. 课时管理
    - 点击编辑按钮实现课时编译——>1.5.9. 编辑课时
    - 实现编辑课时修改功能——>1.5.10. 修改课时