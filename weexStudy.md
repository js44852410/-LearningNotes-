# weex笔记 #
### 一、通用特性 ###
Weex 遵循 HTML attribute 命名规范, 所以请 不要在特性中使用驼峰风格（CamelCase） , 使用-连接符的羊肉串风格（kebab-case） 才是更好的命名方式。

##### 1.1 id 为template定义一个唯一的标识，用this.$el(id)访问
##### 1.2 if (beta版，vue文件使用vue语法 v-if)
##### 1.3 repeat (beta版，vue文件使用vue语法 v-for)
##### 1.4 append tree/node(意思理解，怎么用没理解)
>append="tree" 是一次性渲染整个节点树，渲染更高效，但是如果页面太大容易造成较长时间的白屏。

> append="node" 所有节点逐个渲染，整体渲染速度略慢，但是用户体验好一些。

### 二、内建组件 ###

##### 2.1 \<a>定义指向某个页面的超链接 #####
> 作用与html中a标签基本相同，区别在于weex的a组件中不能直接添加文本，文本必须用text标签包裹起来。

> 特性：href{string} 超链接的URL；

> \<a>支持所有通用样式和通用属性。

> **注意：因为不能保证click与href的执行顺序，所以不建议使用click事件来处理href跳转前的逻辑处理**

##### 2.2 \<slider>轮播图 #####
> 支持特殊的weex组件：\<indicator>用于显示轮播图指示器的效果。
>> \<indicator>组件只能充当slider组件的子组件，并且没有任何子组件。

>> \<indicator>有一些私有样式：
>>> item-color {color}:设置默认颜色；

>>> item-selected-color {color}:被选中时的颜色；

>>> item-size {number/number+px}: 元素的尺寸（正方形的宽高）；

>> **注意：\<indicator> 的 position 不仅依赖 top、left、bottom 和 right 样式，同时会参考 width和 height 样式。\<indicator> 默认的宽高继承于 \<slider>，如果 \<slider> 未设置宽高，需要显式的给 <indicator> 设置宽高值。**

> 特性：
>> auto-play{boolean}：默认值false；

>> interval{number}：值为毫秒数，设定slider切换时间间隔，当auto-play值为true时生效。

> \<slider>支持所有通用样式和通用属性。

> 特殊事件：change：当轮播索引值改变时，触发该事件。事件参数event对象属性index为展示的图片的索引（目前beta版event对象中没有index属性）

> eg：

```
<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true" onchange="changeFunc">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        imageList: [
          { src: '2.jpg'},
          { src: '2.jpg'},
          { src: '3.jpg'}
        ]
      }
    },
    method:{
      changeFunc(event){
        console.log(event.index);
      }
    },
  }
</script>
```

##### 2.3 \<switch>用来创建于ios一致样式的按钮
> 特性：
>>checked {boolean}：默认值为 false，表明按钮是否开启;

>> disabled {boolean}：默认值为 false，表明是否激活按钮。

> 样式：width、height、min-width、min-height、margin、padding、border 不能使用。

> **注意：如果 \<switch> 的容器没有设置为 align-items：flex-start，则 Android 中的开关将被拉伸。**

> 事件：
>> change：改变开关状态时触发该事件。事件中 event 对象属性：
>>> value: 组件布尔值真或假。

>>> timestamp: 事件的时间戳。

##### 2.4 \<text> 渲染文本
> 样式：
>> lines {number}: 指定文本的行数，默认是0，表示不限制

>约束：\<text> 里直接写文本头尾空白会被过滤，如果需要保留头尾空白，暂时只能通过数据绑定写头尾空格。

##### 2.5 \<textarea> 接收用户输入数据，可允许多行输入
>特性：
>> value {string}：组件的接收到的输入字符。

>> placeholder {string}：提示用户可以输入什么。 提示文本不能有回车或换行。

>> disabled {boolean}：表示是否支持输入。通常 click 事件在 disabled 控件上是失效的。

>> autofocus {boolean}：表示是否在页面加载时控件自动获得输入焦点。

>> rows {number}：接收 number 类型的数据，指定组件的高度，默认值是 2。

>事件：
>>input：输入的值发生变化时触发
>>> 事件中event对象：
>>>> value：触发事件的组件的值

>>>> timestamp:事件发生的时间戳

>>change:用户输入完成时，即blur后触发

>> focus：组件获得焦点时触发

>> blur：组件失去焦点时触发

>> **注意：textarea不支持click事件**

##### 2.6 \<div>最基本容器
>需要注意：
>>1、\<div> 嵌套层级不可过深，否则容易引起性能问题，建议控制在 10 层以内。

>>2、不能直接在 \<div> 中添加文本。

>>3、\<div> 不可滚动，即使显式设置高度也一样。

##### 2.7 \<image>用于渲染图片，它不能包含任何子组件
>\<image>必须设置width和height，否则图片无法显示。

>特性：
>>src {string}：定义图片链接，目前图片暂不支持本地图片。

>>resize {string}：可以控制图片的拉伸状态:
>>>stretch：默认值，指定图片按照容器拉伸，有可能使图片产生形变。

>>>cover：指定图片可以被调整到容器，以使图片完全覆盖背景区域，图片有可能被剪裁。

>>>contain：指定可以不用考虑容器的大小，把图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。

>>> \<image>最终被编译的方式是background-image，因此可以对image设置background-position等来设置image显示方式。目前alpha版，图片是居中显示，但beta版则是左上显示，为了向后兼容，建议自己设置吧

##### 2.8 \<list>组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。最简单的使用方法是在 \<list> 标签内使用一组由简单数组 repeat 生成的 \<cell> 标签填充。
>子组件：
>>cell:用于定义列表中的子列表项

>>header (0.6.1+):当 <header> 到达屏幕顶部时，吸附在屏幕顶部。

>>refresh：用于给列表添加下拉刷新的功能。

>>loading：用于给列表添加上拉加载更多的功能。

>> **注意：\<list> 的子组件只能包括以上四种组件或是 fix 定位的组件，其他形式的组件将不能被正确的渲染。**

>特性：
>>loadmoreoffset{number}:默认值0，触发 loadmore 事件所需要的垂直偏移距离（设备屏幕底部与 <list> 底部之间的距离）。当 <list> 的滚动条滚动到足够接近 <list> 底部时将会触发 loadmore 这个事件。

>事件：
>>loadmore(0.5+):如果列表滚动到底部将会立即触发这个事件。

>注意：
>>2.不允许相同方向的 \<list> 或者 \<scroller> 互相嵌套

>>2.\<list> 为根节点时无需设置高度，但是内嵌 \<list> 高度必须可计算

##### 2.9 \<scroller>是一个竖直的，可以容纳多个排成一列的子组件的滚动器。如果子组件的总高度高于其本身，那么所有的子组件都可滚动。
>**注意： \<scroller> 可以当作根元素或者嵌套元素使用。此组件的滚动方向是垂直方向的形式。**

>支持任意类型的 Weex 组件作为其子组件,还支持refresh、loading两种特殊组件

>特性：
>>show-scrollbar {boolean}：默认值为 true。控制是否出现滚动条。

>> scroll-direction {string}：可选为 horizontal 或者 vertical，默认值为 vertical 。定义滚动的方向。

>> loadmoreoffset {number}：默认值为 0，触发 loadmore 事件所需要的垂直偏移距离（设备屏幕底部与页面底部之间的距离）。当页面的滚动条滚动到足够接近页面底部时将会触发 loadmore 这个事件。

>>loadmoreretry {number}：默认值为 0，当 loadmore 失败时是否重置 loadmore 相关的 UI，值不一样就会重置。

### 三、css ###

##### 3.1 长度：（px），不支持类似 em，rem，pt 这样的 CSS 标准中的其他长度单位。
>**注意：最好不要省略px单位，防坑！**

>width/height{number}:默认0

>padding/margin{number}:默认0
>>可以pading：10px; 可以padding-left：10px; padding-top:20px;

>> **不可以：padding:10px 20px;**

>border:不支持border:1px solid #000(beta版vue文件好像可以);
>>border-style: solid | dashed | dotted，默认值 solid;

>>border-width: 默认值 0;

>>border-color {color}; 默认值#000000。

>> border-radius{number}:默认0；
>>> **注意：目前在 \<image> 和 \<text> 组件上尚无法只定义一个或几个角的 border-radius**

##### 3.2 颜色：
>支持#000、#000000、rgb(0,0,0)、rgba(0,0,0,0)、transparent、orange、darkgray

>不支持hsl(), hsla(), currentColor, 8个字符的十六进制颜色。

> rgb(a,b,c) 或 rgba(a,b,c,d) 的性能比其他颜色格式差很多

##### 3.3暂不支持百分比单位

##### 3.4 flex容器
>在 Weex 中，Flexbox 是默认且唯一的布局模型

> flex-direction:定义了 flex 容器中 flex 成员项的排列方向。可选值为 row | column，默认值为 column。

>justify-content：定义了 flex 容器中 flex 成员项在主轴方向上如何排列以处理空白部分。可选值为 flex-start | flex-end | center | space-between，默认值为 flex-start。

>align-items：定义了 flex 容器中 flex 成员项在纵轴方向上如何排列以处理空白部分。可选值为 stretch | flex-start | center | flex-end，默认值为 stretch。

>flex:定义了 flex 成员项可以占用容器中剩余空间的大小，默认0，即有剩余空间也不放大。

>flex-wrap:wrap/nowrap 是否换行（官方文档并未提及，但可以使用）

##### 3.5 position(默认值relative)
>sticky :仅当元素滚动到页面之外时，元素会固定在页面窗口的顶部。其他与web中一致

>注意：
>>1、Weex 目前不支持 z-index 设置元素层级关系，但靠后的元素层级更高，因此，对于层级高的元素，可将其排列在后面。

>>2、如果定位元素超过容器边界，在 Android 下，超出部分将不可见，原因在于 Android 端元素 overflow 默认值为 hidden，但目前 Android 暂不支持设置 overflow: visible。

##### 3.6 background
>只支持background-color，不支持background-image。

>其他的background-position、background-repeat可以在image上使用，定位image显示方式,比如居中

### 四、ViewModel 选项
##### 4.1 data、methods
```
module.exports = {
  data: function () {
    return {x: 1, y: 2}
  },
  methods: {
    doThis: function () {...},
    doThat: function () {...}
  },
  ...
}
```
##### 4.2 生命周期
如果使用的是we文件：
有init、created、ready、destroyed四种状态，注意：init时不能操作data/methos中的数据或方法
如果使用的是vue文件，参考vue生命周期

### 五、通用事件
##### 5.1 click
> \<input> 和 \<switch> 组件目前不支持 click 事件，请使用 change 或 input 事件来代替。

##### 5.2 longpress 长按事件

##### 5.3 appear 事件，当这个组件的状态变为在屏幕上可见时，该事件将被触发。
>事件对象：
>>direction : 触发事件时屏幕的滚动方向，up 或 down；

>>target：组件对象

##### 5.4 disappear 事件，当这个组件被滑出屏幕变为不可见状态时，该事件将被触发。
>事件对象
>>direction : 触发事件时屏幕的滚动方向，up 或 down；

>>target：组件对象

### 六、内建模块
##### 6.1 animation动画
> transition(el, options, callback)

```
const animation = weex.requireModule('animation');
animation.transition(testEl, {
  styles: {
    color: '#FF0000',
    transform: 'translate(250, 100)',
    transformOrigin: 'center center'
  },
  duration: 800, //ms
  timingFunction: 'ease',
  delay: 0 //ms
}, function () {
  //callback someFunction
})
```

##### 6.2 picker 用于数据选择，日期选择，时间选择(目前H5暂不支持)
>pick(options, callback[options])

```
const picker = weex.requireModule('picker')
picker.pick({
    index:0,
    items:["red","green","blue"]
}, function(ret){
    if(ret.result === "success"){
        console.log(ret.data);//选择的选项index值，仅在成功时存在
    } else if(ret.result === "cancel"){
        //取消callback
    } else if(ret.result === "error"){
        //失败callback
    }
})
```

>pickDate(options, callback[options])

```
const picker = weex.requireModule('picker')
picker.pickDate({
    value:"2017-02-13",//必填，格式为yyyy-MM-dd
    max:"",//选填，最大值
    min:"",//选填，最小值
}, function(ret){
    if(ret.result === "success"){
        console.log(ret.data);//选择的值 date 的字符，格式为 yyyy-MM-dd, 仅成功确认的时候存在
    } else if(ret.result === "cancel"){
        //取消callback
    } else if(ret.result === "error"){
        //失败callback
    }
})
```

>pickTime(options, callback[options])

```
const picker = weex.requireModule('picker')
picker.pickTime({
    value:"11:56",//必填，格式为hh:mm
}, function(ret){
    if(ret.result === "success"){
        console.log(ret.data);//选择的值 time 格式为 HH:mm, 仅成功确认的时候存在
    } else if(ret.result === "cancel"){
        //取消callback
    } else if(ret.result === "error"){
        //失败callback
    }
})
```

##### 6.3 clipboard(未实践)
>getString(callback):从系统粘贴板读取内容
>>ret.data：获取到的文本内容；
  ret.result：返回状态，可能为 success 或 fail。

>setString(text):将一段文本复制到剪切板

##### 6.4 dom(未实践)
>scrollToElement(node, options)让页面滚动到那个对应的节点，这个API只能在 <scroller> 和 <list> 组件中用。

> getComponentRect(ref, callback)(v0.9.4+):通过标签的 ref 获得其布局信息，返回的信息在 callBack 中。

##### 6.5 modal
>toast(options):
>> message {string}：展示的内容

>> duration {number}：展示的持续时间（以秒为单位）

>alert(options, callback):
>>message {string}：警告框内显示的文字信息

>>okTitle {string}：确定按钮上显示的文字信息，默认是“OK”

>>callback {Function}：用户操作完成后的回调

>confirm(options, callback):
>>message {string}：确认框内显示的文字信息

>> okTitle {string}：确认按钮上显示的文字信息，默认是 OK

>> cancelTitle {string}：取消按钮上显示的文字信息，默认是 Cancel

>>callback:回调函数的参数 result 是确定按钮上的文字信息字符串

>prompt(options, callback):
>>message {string}：提示框内要显示的文字信息

>> okTitle {string}：确认按钮上显示的文字信息，默认是 OK

>> cancelTitle {string}：取消按钮上显示的文字信息，默认是 Cancel

>>callback {function (ret)}:
>>> result {string}：用户按下的按钮上的文字信息

>>> data {string}：用户输入的文字信息

##### 6.6 navigator
>push(options, callback):把一个weex页面URL压入导航堆栈中，可指定在页面跳转时是否需要动画，以及操作完成后需要执行的回调函数
>>options: url {stirng}：要压入的 Weex 页面的 URL

>>options: animated {string}："true" 示意为页面压入时需要动画效果，"false" 则不需要，默认值为 "true"

>pop(options, callback):把一个 Weex 页面 URL 弹出导航堆栈中，可指定在页面弹出时是否需要动画，以及操作完成后需要执行的回调函数。
>>options: animated {string}："true" 示意为弹出页面时需要动画效果，"false" 则不需要，默认值为 "true"

##### 6.6 storage
>是一个在前端比较常用的模块，可以对本地数据进行存储、修改、删除，并且该数据是永久保存的，除非手动清除或者代码清除。有一个限制就是浏览器端（H5）只能存储小于5M的数据。与html5 LocalStorage API一致

##### 6.7 stream 网络请求
>fetch(options, callback[,progressCallback])
>>options {Object}：
>>>method {string}：HTTP 方法 GET 或是 POST

>>> url {string}：请求的 URL

>>> headers {Object}：HTTP 请求头

>>> type {string}：响应类型, json,text 或是 jsonp {在原生实现中其实与 json 相同)

>>> body {string}：HTTP 请求体。

>>>注意： 1、body 参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。
2、GET 请求不支持 body 方式传递参数，请使用 url 传参。

>> callback{function}:响应结果回调
>>>status {number}：返回的状态码

>>>ok {boolean}：如果状态码在 200~299 之间就为真。

>>> statusText {string}：状态描述文本

>>> data {Object | string}: 返回的数据，如果请求类型是 json 和 jsonp，则它就是一个 object ，如果不是，则它就是一个 string。

>>> headers {Object}：响应头

>>progressCallback{function}:关于请求状态的回调

>注意：1、默认 Content-Type 是 ‘application/x-www-form-urlencoded’。
   2、如果你需要通过 POST json ， 你需要将 Content-Type 设为 ‘application/json’。

##### 6.8 webview
>web组件的一系列接口，控制web组件的src页面的资源

##### 6.9 globalEvent
```
var globalEvent = require('@weex-module/globalEvent');

globalEvent.addEventListener("geolocation", function (e) {
 console.log("get geolocation")
});
```

