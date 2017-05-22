# 前端规范

### 1、	所有语句必须以 “;” 结束，且“;”前后不许有空格；
>error:
>> var a = "str"

>> var a = "str" ;

>right:
>> var a = "str";

### 2、	所有对象，以换行形式显示时，必须在最后一个属性加 “,”，如果在一行显示，则不允许加 “,” ；
>error:
>> var obj = {name:"obj", value:"test",};

>> var obj = {

>>    name:"obj",

>>    value:"test"

>>   };

>right:
>>var obj = {name:"obj", value:"test"};

>> var obj = {

>>    name:"obj",

>>    value:"test",

>>   };

### 3、	缩进为两个空格；
### 4、	使用 “,” 时，必须放在行末尾；
>error:
>> var arr = [{

>>   name:"1",

>> }, {

>>   name: "2",

>> }];

>right:
>> var arr = [{

>>   name:"1",

>> },

>> {

>>   name: "2",

>> }];

### 5、	必须使用 “===”、“!==”;
>error:
>> a == 1

>> a != 1

>right:
>> a === 1

>> a !== 1

### 6、	对象"："前不能有空格，"："后必须加空格；
eg:
> var obj = {

> name: "test",

>};

### 7、	函数定义时，括号前不许有空格；
eg:
> function test() {};

### 8、	禁止出现多行空行；

### 9、import语句要放在js代码的最开头位置；

### 10、if、for括号前后要有空格；

### 11、不允许定义未使用的变量;

### 12、其它规则待完善中