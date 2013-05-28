# If/Then
## Switch

<pre class="code javascript" >
// don't ever really do this...
switch( a ) {
  case 1  : return '1st';
  case 2  : return '2nd';
  case 3  : return '3rd';
  default : return a+'th';
}
</pre>

* use `switch` to check to check a single value against multiple conditions
* use `break` or `return` to exit the `switch` statement
