<template>
  <div id="canvas_container" class="canvas_container">
    <canvas ref="canvas" class="canvas" :width="width" :height="height"></canvas>
  </div>
</template>
<style>
  .canvas_container {
    padding-top: 130px;
    padding-left: 40px;
    padding-right: 40px;
  }
</style>
<script>
  export default {
    data() {
      return {
        leftCenter: 335,
        topCenter: 335,
        radius: 264,
      };
    },

    props: {
      width: {
        type: Number,
        default: 670,
      },
      height: {
        type: Number,
        default: 670,
      },
      result: {
        type: Array,
      },
    },

    methods: {
      draw(context) {
        let _self = this;
        let l = this.result.length;
        let mAngle = Math.PI * 2 / l;
        let index = 1;
        let number = 0;
        let range = 0;

        let requestAnimFrame = function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            window.setTimeout(a, 1E3 / 60);
          };
        }();

        function drawFont() {
          context.font = '24px Microsoft Yahei';
          context.fillStyle = "#FFF";
          context.textAlign = "center";
          context.beginPath();

          for (let i = 0; i < l; i++) {
            context.save();
            /*let x = _self.leftCenter - (_self.radius) * Math.sin(mAngle * i);
             let y = _self.topCenter - (_self.radius) * Math.cos(mAngle * i);*/

            let endAngle = mAngle * i;
            let x = 0;
            let y = 0;

            if (endAngle >= Math.PI / 2 && endAngle <= Math.PI * 3 / 2) {
              x = _self.leftCenter - (_self.radius + 44) * Math.sin(endAngle);
              y = _self.topCenter - (_self.radius + 44) * Math.cos(endAngle);
              endAngle -= Math.PI;
            } else {
              x = _self.leftCenter - (_self.radius + 20) * Math.sin(endAngle);
              y = _self.topCenter - (_self.radius + 20) * Math.cos(endAngle);
            }

            context.translate(x, y);

            context.rotate(-endAngle);
            context.fillText(_self.result[i].name, 0, 0);
            context.restore();
          }

          context.closePath();
        }

        /*画结果边框及圆点*/
        function drawResult() {
          if (range < 100) {
            range++;

            context.clearRect(0, 0, _self.width, _self.height);
            drawEndContainer();
            drawEndArc();

            if (range >= 30) {
              drawFont();
            }

            context.beginPath();

            let initPoint = Math.min(_self.radius * range / 100, _self.result[0].value);
            context.moveTo(_self.leftCenter - _self.radius * Math.sin(0) * initPoint / 100, _self.topCenter - _self.radius * Math.cos(0) * initPoint / 100);

            context.strokeStyle = "#FFF";
            context.lineWidth = 5;

            for (let i = 0; i < l; i++) {
              let point = Math.min(_self.result[i].value, _self.radius * range / 100);

              var x = _self.leftCenter - _self.radius * Math.sin(mAngle * i) * point / 100;
              var y = _self.topCenter - _self.radius * Math.cos(mAngle * i) * point / 100;

              context.lineTo(x, y);
            }
            context.closePath();
            context.stroke();

            let r = _self.leftCenter / 30;
            for (let i = 0; i < l; i++) {
              let point = Math.min(_self.result[i].value, _self.radius * range / 100);

              let x = _self.leftCenter - _self.radius * Math.sin(mAngle * i) * point / 100;
              let y = _self.topCenter - _self.radius * Math.cos(mAngle * i) * point / 100;

              context.beginPath();
              context.arc(x, y, r, 0, Math.PI * 2);
              context.fillStyle = _self.result[i].color;
              context.fill();
            }

            requestAnimFrame(drawResult);
          }
        }

        /*一次性画圆*/
        function drawEndArc() {
          for (let index = 1; index <= 11; index++) {
            context.strokeStyle = `rgba(255,255,255,${0.07 * (11 - index)})`;
            context.lineWidth = 25;
            context.beginPath();
            context.arc(_self.leftCenter, _self.topCenter, 25 * index + 3, 0, Math.PI * 2, true);
            context.stroke();
          }
        }

        /*渐变式画圆*/
        function drawArc() {
          if (index <= 11) {
            context.strokeStyle = `rgba(255,255,255,${0.07 * (11 - index)})`;
            context.lineWidth = 25;
            context.beginPath();
            context.arc(_self.leftCenter, _self.topCenter, 25 * index + 3, 0, Math.PI * 2, true);
            context.stroke();

            index++;

            setTimeout(drawArc, 50);
          } else {
            drawResult();
          }
        }

        /*画外围边框*/
        function drawEndContainer(number = 0) {
          let changeAngle = -number * Math.PI / 30;
          context.clearRect(0, 0, _self.width, _self.height);

          context.strokeStyle = "#FFF";
          context.lineWidth = 1;

          context.beginPath();
          context.arc(_self.leftCenter, _self.topCenter, _self.radius, 0, Math.PI * 2, true);

          context.moveTo(_self.leftCenter - _self.radius * Math.sin(changeAngle), _self.topCenter - _self.radius * Math.cos(changeAngle));
          for (let i = 0; i < l; i++) {
            let x = _self.leftCenter - _self.radius * Math.sin(mAngle * i + changeAngle);
            let y = _self.topCenter - _self.radius * Math.cos(mAngle * i + changeAngle);

            context.lineTo(x, y);
          }
          context.closePath();

          for (let i = 0; i < l; i++) {
            let x = _self.leftCenter - _self.radius * Math.sin(mAngle * i + changeAngle);
            let y = _self.topCenter - _self.radius * Math.cos(mAngle * i + changeAngle);

            context.moveTo(x, y);
            context.lineTo(_self.leftCenter, _self.topCenter);
          }

          context.closePath();
          context.stroke();

          drawCenterArc();
        }

        /*画中心圆*/
        function drawCenterArc() {
          context.save();
          context.beginPath();

          context.fillStyle = "#FFF";
          context.arc(_self.leftCenter, _self.topCenter, 25, 0, Math.PI * 2, true);
          context.closePath();
          context.fill();

          context.restore();
          context.save();

          context.beginPath();
          context.strokeStyle = "#FFF";
          context.lineWidth = 1;

          context.arc(_self.leftCenter, _self.topCenter, 28, 0, Math.PI * 2, true);
          context.closePath();

          context.stroke();
        }

        /*外围边框旋转*/
        function drawContainer() {
          if (number >= 60) {
            drawArc();
            return;
          }

          number++;
          drawEndContainer(number);

          requestAnimFrame(drawContainer);
        }

        //drawFont();
        drawContainer();
      },
    },

    mounted() {
      let canvasEle = this.$refs.canvas;

      if (canvasEle.getContext) {
        canvasEle.width = this.width;
        canvasEle.height = this.height;

        this.draw(canvasEle.getContext("2d"));
      }
    },
  };
</script>