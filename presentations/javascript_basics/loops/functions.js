var add, find;

(function() {
  window.mx = {
    add: 0,
    find: 0
  };

  add = function() { window.mx.add++; };
  find = function() { return window.mx.add++ < 50; };


})();