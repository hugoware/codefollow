# Operators: Comparison
## Type Checking

<pre class="code javascript" >
1 == '1'   //  true
1 === '1'  //  false

typeof 1 == 'number'  //  true
[ ] instanceof Array  //  true
</pre>

* Double equals will convert a type before checking
* Triple equals will **not** convert a type -- it's recommended to use this
* `typeof` and `instanceof` have specific uses and can help determine types of objects