# Functions: Callbacks
## `Closures`

<pre class="code javascript" >
function List() {
  var $items = [ ];

  // callback can still access
  ajax('/list', function( data ) {
    $items = data.items;
  });
}
</pre>

* `closures` allow you to access previously scoped variables within the context of a callback
* `closures` can be confusing, but after a bit of practice, they're very powerful