# If/Then
## Grouping

<pre class="code javascript" >
if ( logged_in &amp;&amp; ( admin || power_user ) )
  return 'welcome back';
else
  return 'access denied';
</pre>

* use nested parentheses to check for sets of conditions
* conditions are evaluated from left to right
* the contents of parentheses are not evaluated first