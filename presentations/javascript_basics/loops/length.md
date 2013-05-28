# Loops
## Basics

<pre class="code javascript" >
var fruit = [ 'apple', 'orange', 'pear' ];
for ( var i = 0; i &lt; fruit.length; i++ ) {
  console.log( i, fruit[i] );
}

// 0 'apple'
// 1 'orange'
// 2 'pear'
</pre>

* loops can be used by defining initialization, a condition to stop, and an 'iteration' expression
* curly braces can be used to wrap a loop if the body requires more than one line
* like with other variable declarations, you can place multiple variables separated by commas