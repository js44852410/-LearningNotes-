1. canvas
2. video 视频
> video支持三种视频格式：ogg、mpeg4、webm。
> video中可以包含多个source元素，source的src指向不同类型的视频文件，浏览器可以自动识别第一个可以识别的视频。

>  属性：
  - autoplay 是否自动播放
  - controls 是否显示控制栏
  - width/height 宽高
  - src 引用路径
  - loop  是否循环播放
  - prevload 是否预加载

> 方法
  - play() 播放
  - pause() 暂停

3. audio 音频
> audio支持三种音频格式：ogg、mp3、wav。

> audio属性、方法与video相同。

4. 获取地理位置
> navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
5. localStorage、sessionStorage 客户端存储
- localStorage没有时间限制的存储
- sessionStorage 是针对一个session的存储
  
  window.localStorage.setItem("key", "value");
  window.localStorage.getItem("key");
  
6. window.history 新特性
  - 
  - 
  - 
  
7. 表单元素 
> input type新值
  - date 选择日期
  - email 邮箱
  - number 数字
  - tel 电话号码，纯数字
  - url 链接
  
> 新属性
  - autocomplete 允许/禁止自动补全
  - placeholder 默认显示内容
  
8. header、footer
  
  
  