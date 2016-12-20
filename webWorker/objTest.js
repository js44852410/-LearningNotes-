/**
 * Created by llp on 2016/12/19.
 */

addEventListener("message", function (event) {
  var id = event.data.id;

  function add() {
    postMessage({"id":++id});
    setTimeout(add, 1000)
  }

  add();
})