# Functions: Call/Apply
## More `This`

<pre class="code javascript" >
function load() { 
  var array = [].slice.call( arguments );
  console.log( arguments instanceof Array );
  console.log( array instanceof Array );
}

load();
// false
// true
</pre>

* changing context can be used in surprising places
* instance methods can now be executed using any context