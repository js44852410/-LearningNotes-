/**
 * Created by llp on 2016/12/19.
 *
 * params Object
 *  time:倒计时时间，String/Number/Date对象
 *  format:返回时间格式，dd:hh:mm:ss/hh:mm:ss, 默认dd:hh:mm:ss
 *  type:天、时、分、秒为0时处理方案 Number
 *    0:不显示0项(默认)
 *    1:显示0项
 * ES6
 */

class CountDown {
  constructor(params){
    this.time = params.time;
    this.format = params.format && params.format.toLowerCase() == "hh:mm:ss" ? "hh:mm:ss" : "dd:hh:mm:ss";
    this.type = params.type;

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

  toDouble(num){
    return num < 10 ? `0${num}` : num;
  }

  initDom(){
    if(this.time < 0){
      postMessage(this.time);
    } else {
      let innerHTML = "",
          second = this.time%60,
          minute = Math.floor(this.time/60)%60;

      if(this.format == 'hh:mm:ss'){
        let hour = Math.floor(this.time/3600);

        if(this.type){
          innerHTML = `<span>${this.toDouble(hour)}</span>时<span>${this.toDouble(minute)}</span>分<span>${this.toDouble(second)}</span>秒`;
        } else {
          if(hour){
            innerHTML += `<span>${this.toDouble(hour)}</span>时`;
          }

          if(minute){
            innerHTML += `<span>${this.toDouble(minute)}</span>分`;
          }

          if(second){
            innerHTML += `<span>${this.toDouble(second)}</span>秒`;
          }
        }
      } else {
        let hour = Math.floor(this.time/3600)%24,
            day = Math.floor(this.time/(3600*24));

        if(this.type){
          innerHTML = `<span>${this.toDouble(day)}</span>天<span>${this.toDouble(hour)}</span>时<span>${this.toDouble(minute)}</span>分<span>${this.toDouble(second)}</span>秒`;
        } else {
          if(day){
            innerHTML += `<span>${this.toDouble(day)}</span>天`;
          }

          if(hour){
            innerHTML += `<span>${this.toDouble(hour)}</span>时`;
          }

          if(minute){
            innerHTML += `<span>${this.toDouble(minute)}</span>分`;
          }

          if(second){
            innerHTML += `<span>${this.toDouble(second)}</span>秒`;
          }
        }
      }

      postMessage(innerHTML);
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
