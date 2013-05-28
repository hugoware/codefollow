# OOP: Basics
## `This` Reference

<pre class="code javascript" >
function Service() {
  var $this = this;

  this.update = function() {

    // using a callback
    load( function( data ) {
      this.data = data;  // not the instance
      $this.data = data; // instance of Service      
    });
    
  };
}
</pre>

* it's a good idea to keep a reference to `this` 
* using `callbacks` can cause the correct `this` context to fall out of scope