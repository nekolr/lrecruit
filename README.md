# lrecruit    
使用SSM框架，除mybatis的sql映射文件外，无xml文件    
后台使用mybatis的分页插件PageHelper，前台使用js分页插件layPage    
使用AspectJ进行aop的简单登录日志记录   
前台使用XMLHttpRequest Level2 ajax的方式上传图片，后台使用Servlet 3.0以上的新方法进行二进制文件的接收(getPart)    
简单使用了Sea.js加载部分js文件   
使用Spring整合Junit的方式进行测试，测试项目中的DAO层、Service层和Controller层    
使用Spirng封装的JavaMail进行邮件的发送      

1.独立一个tomcat来使用 D:\apache-tomcat-8.0.38

2.修改了conf下的server.xml文件(其实只要修改eclipse中的Servers中的server.xml文件即可)加入以下内容：
```
<Context path="LRecruit/file" docBase="D:\apache-tomcat-8.0.38\upload\file"></Context>
<Context path="LRecruit/image" docBase="D:\apache-tomcat-8.0.38\upload\image"></Context>
```
这样就能够将上传的文件独立出来，避免每次部署清空文件的情况
