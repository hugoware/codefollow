# OOP: Inheritance
## Extending Classes

<pre class="code javascript" >
Function.prototype.extend = function( define ) {
  var instance = function() { };

  // inheriting from source
  for ( var v in this.prototype )
    instance.prototype[v] = this.prototype[v];

  // unique for this instance
  for ( var v in define )
    instance.prototype[v] = define[v];

  // return the final class
  return instance;
};
</pre>

* you can't assign `prototype` since they'll share the same reference
* copying each `prototype` value is a common approach for handling inheritance