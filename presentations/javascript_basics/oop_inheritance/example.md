
# OOP: Inheritance
## Extend Example

<pre class="code javascript" >
// base class
var Vehicle = Function.extend({
  wheels: 4,
  engine: true
});

// extend vehicle
var Motorcycle = Vehicle.extend({
  wheels: 2
});

var m = new Motorcycle();
console.log( m.wheels ); // 2;
console.log( m.engine ); // true;
</pre>

* the `extend` method is available from all `functions` now
* using `Object.defineProperty` with `enumerable` can make it hidden