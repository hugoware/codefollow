# Operators: Comparison
## Equality

<pre class="code javascript" >
1 == 1      // true
'a' == 'a'  // true
1 == '1'    // true

var a = { }, b = a;
a == { }  // false 
a == b    // true
</pre>

* JavaScript will convert values when attempting to check equality
* Comparing objects will check the internal memory references