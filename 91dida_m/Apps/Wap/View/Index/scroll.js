/**
 * Created by llp on 2017/1/3.
 */

"use strict";
;!function (win, doc, undefined) {
  function scrollImg(json) {
    this.scrollImgWrap = json.scrollImgWrap;
    this.init();
  }

  scrollImg.prototype.init = function () {
    this.scrollImgWrap && this.doScroll();
  };
  scrollImg.prototype.doScroll = function () {
    var scrollWrap = this.scrollImgWrap,
      oUl = scrollWrap.querySelector('ul'),
      aLi = oUl.children,
      winW = window.innerWidth > 640 ? 640 : window.innerWidth,
      aTag = scrollWrap.querySelectorAll('.point'),
      tagLen = aTag.length;

    oUl.style.width = aLi.length > 0 ? winW * aLi.length + 'px' : winW + 'px';
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].style.width = winW + 'px';
    }
    if (tagLen <= 1) {
      scrollWrap.querySelector('.swipe-point').style.display = 'none';
      return false;
    }
    oUl.now = 0;
    oUl.x = oUl.offsetLeft;

    oUl.addEventListener('touchstart', function () {
      var startX = event.targetTouches[0].pageX,
        disX = startX - oUl.x;

      oUl.style.transition = 'none';
      doc.addEventListener('touchmove', moveFn, false);
      doc.addEventListener('touchend', endFn, false);

      function moveFn() {
        oUl.x = event.targetTouches[0].pageX - disX;
        oUl.style.webkitTransform = 'translate3d(' + oUl.x + 'px,0,0)';
        //alert(oUl.style.transform )
        event.preventDefault();
      }

      function endFn() {
        var endX = event.changedTouches[0].pageX;

        if (Math.abs(endX - startX) > 100) {
          if (endX > startX) {
            oUl.now--;
            oUl.now <= 0 && (oUl.now = 0);
          } else {
            oUl.now++;
            oUl.now > tagLen - 1 && (oUl.now = tagLen - 1);
          }
        }
        oUl.x = -oUl.now * winW;
        oUl.style.webkitTransform = 'translate3d(' + oUl.x + 'px,0,0)';
        oUl.style.webkitTransition = 'all .25s ease';

        oUl.addEventListener('webkitTransitionEnd', function () {
          var currLi = aLi[oUl.now];
          for (var i = 0; i < tagLen; i++) {
            aTag[i].classList.remove('curr');
          }
          aTag[oUl.now].classList.add('curr');

        }, false);

        doc.removeEventListener('touchmove', moveFn, false);
        doc.removeEventListener('touchend', endFn, false);
      }
    }, false);
  };
  win._scrollImg = scrollImg;
}(window, document, undefined);

new _scrollImg({
  "scrollImgWrap": document.getElementById("scrollImage")
});
