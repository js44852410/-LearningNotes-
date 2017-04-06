/**
 * Created by llp on 2017/1/3.
 * params:{
 *  container:图片轮播dom元素
 *  intervalTime：轮播间隔时间
 *    大于0的数字：轮播间隔
 *    0或false或undefined：不轮播
 * }
 */

if (!DD) {
  var DD = {};
}

DD.Swipe = function (params) {
  this.container = params.container;
  this.intervalTime = Number(params.intervalTime) ? Number(params.intervalTime) : false;

  this._init();
}

DD.Swipe.prototype = {
  constructor: Swipe,
  swipeInterval: null,
  transitionIng: false,
  currIndex: 0,
  swipteL: 0,
  wWidth: 0,
  _init: function () {
    var swipeContainer = this.container.querySelector(".swipe-container"),
      pointContainer = this.container.querySelector(".swipe-point");

    this.wWidth = window.innerWidth;

    this.swipteL = swipeContainer.children.length;
    for (var i = 0; i < this.swipteL; i++) {
      swipeContainer.children[i].style.width = this.wWidth + "px";
    }

    if (this.swipteL > 1) {
      this.currIndex = this.swipteL;

      swipeContainer.style.width = this.wWidth * (this.swipteL + 2) + "px";
      swipeContainer.appendChild(swipeContainer.children[0].cloneNode(true));
      swipeContainer.appendChild(swipeContainer.children[1].cloneNode(true));

      swipeContainer.style.webkitTransform = 'translate(' + (-this.wWidth * this.swipteL) + 'px,0)' + 'translateZ(0)';
      swipeContainer.style.msTransform = this.container.style.MozTransform = this.container.style.oTransform = 'translateX(' + (-this.wWidth * this.swipteL) + 'px)';

      pointContainer.children[this.currIndex % this.swipteL].classList.add("active");

      if (this.intervalTime) {
        var _self = this;
        this.swipeInterval = setInterval(function () {
          _self.currIndex++;
          _self.touchendTransition();
        }, this.intervalTime);
      }

      this._initEvents(swipeContainer, pointContainer, this.swipteL);
    } else {
      pointContainer.style.display = "none";
    }
  },

  touchendTransition: function () {
    if (this.transitionIng) {
      return false;
    }
    this.transitionIng = true;
    var swipeContainer = this.container.querySelector(".swipe-container"),
      pointContainer = this.container.querySelector(".swipe-point"),
      endX = -this.currIndex * this.wWidth,
      _self = this;

    swipeContainer.style.webkitTransition = "transform 0.3s ease-out";

    swipeContainer.style.webkitTransform = 'translate(' + endX + 'px,0)' + 'translateZ(0)';
    swipeContainer.style.msTransform = swipeContainer.style.MozTransform = swipeContainer.style.oTransform = 'translateX(' + endX + 'px)';

    function transitionEndFunc() {
      _self.currIndex %= _self.swipteL;
      _self.currIndex = _self.currIndex ? _self.currIndex : _self.swipteL;
      swipeContainer.style.webkitTransition = "";
      swipeContainer.style.webkitTransform = 'translate(' + (-_self.currIndex * _self.wWidth) + 'px,0)' + 'translateZ(0)';
      swipeContainer.style.msTransform = swipeContainer.style.MozTransform = swipeContainer.style.oTransform = 'translateX(' + (-_self.currIndex * _self.wWidth) + 'px)';
      pointContainer.querySelector(".active").classList.remove("active");
      pointContainer.children[_self.currIndex % _self.swipteL].classList.add("active");
      swipeContainer.removeEventListener("webkitTransitionEnd", transitionEndFunc);
      swipeContainer.removeEventListener("msTransitionEnd", transitionEndFunc);
      swipeContainer.removeEventListener("oTransitionEnd", transitionEndFunc);
      swipeContainer.removeEventListener("otransitionend", transitionEndFunc);
      swipeContainer.removeEventListener("transitionend", transitionEndFunc);
      _self.transitionIng = false;
    }

    swipeContainer.addEventListener("webkitTransitionEnd", transitionEndFunc);
    swipeContainer.addEventListener("msTransitionEnd", transitionEndFunc);
    swipeContainer.addEventListener("oTransitionEnd", transitionEndFunc);
    swipeContainer.addEventListener("otransitionend", transitionEndFunc);
    swipeContainer.addEventListener("transitionend", transitionEndFunc);
  },

  _initEvents: function (swipeContainer) {
    var _self = this;
    swipeContainer.addEventListener("touchstart", function (event) {
      if (_self.transitionIng) {
        return false;
      }
      var touches = event.touches;
      if (touches.length <= 1) {
        if (_self.intervalTime) {
          clearInterval(_self.swipeInterval);
        }

        var initX = touches[0].pageX,
          initLeft = -_self.currIndex * _self.wWidth,
          changeX = 0;

        function touchmoveFunc(event) {
          event.preventDefault();
          var touch = event.touches[0];

          changeX = touch.pageX - initX;

          swipeContainer.style.webkitTransform = 'translate(' + (initLeft + changeX) + 'px,0)' + 'translateZ(0)';
          swipeContainer.style.msTransform = swipeContainer.style.MozTransform = swipeContainer.style.oTransform = 'translateX(' + (initLeft + changeX) + 'px)';
        }

        function touchendFunc() {
          if (Math.abs(changeX) > _self.wWidth / 4) {
            _self.currIndex -= changeX / Math.abs(changeX);
          }

          _self.touchendTransition();
          document.removeEventListener("touchmove", touchmoveFunc);
          document.removeEventListener("touchend", touchendFunc);

          if (this.intervalTime) {
            _self.swipeInterval = setInterval(function () {
              _self.currIndex++;
              _self.touchendTransition();
            }, _self.intervalTime);
          }
        }

        document.addEventListener("touchmove", touchmoveFunc);
        document.addEventListener("touchend", touchendFunc);
      }
    })
  }
}

if (document.getElementById("scrollImage")) {
  new DD.Swipe({
    "container": document.getElementById("scrollImage"),
    "intervalTime": 3000
  })
}