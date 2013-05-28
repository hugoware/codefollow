# Loops
## For Each: Objects

<pre class="code javascript" >
var person = { name: 'Fred', age: 30, admin: false };
for ( var p in person )
  console.log( p, person[p] );

// name 'Fred'
// age 30
// admin false
</pre>

* JavaScript does not have a `foreach` operator, but instead uses only `for` and `in`.
* for Object, each property name is used