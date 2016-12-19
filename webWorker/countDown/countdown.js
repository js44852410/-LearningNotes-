/**
 * Created by llp on 2016/12/19.
 *
 * params Object
 *  element:元素对象或元素列表
 *  time:倒计时时间，String/Number/Date对象
 *  type:
 * ES6
 */

class CountDown {
  constructor(params){
    this.element = params.element;
    this.time = params.time;
    this.type = params.type;
    this.callback = params.callback;

    this._init();
  }

  _init(){
    if(typeof this.time != "object" && Number.isNaN(this.time)){
      console.log("时间参数不正确");
      return false;
    }

    this._checkTime();
    this.start();
  }

  _checkTime(){
    if(typeof this.time == "object"){
      this.time = this.time.getTime();
    } else {
      this.time = Number(this.time);
    }
  }

  initDom(){
    if(this.time < 0){
      postMessage(this.time);
    } else {
      let second = this.time%60,
        minute = Math.floor(this.time/60)%60,
        hour = Math.floor(this.time/3600);

      postMessage(`<span>${hour}</span>时<span>${minute}</span>分<span>${second}</span>秒`);
    }
  }

  /*开始倒计时*/
  start(){
    setInterval(function () {
      this.time--;
      this.initDom();
    }.bind(this), 1000);
  }
}

onmessage = function(event){
  new CountDown({
    "time":event.data
  })
}
