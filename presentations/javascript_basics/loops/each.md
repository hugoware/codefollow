# Loops
## For Each: Arrays

<pre class="code javascript" >
var fruit = [ 'apple', 'orange', 'pear' ];
for ( var f in fruit )
  console.log( f, fruit[f] );    

// 0 'apple'
// 1 'orange'
// 2 'pear'
</pre>

* JavaScript does not have a `foreach` operator, but instead uses only `for` and `in`.
* for Arrays, each numeric index is used