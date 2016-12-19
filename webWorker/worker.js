/**
 * Created by llp on 2016/12/19.
 */

onmessage = function(event){
  var i = event.data;

  function add() {
    postMessage(++i);
    setTimeout(add, 1000);
  }

  add();
}