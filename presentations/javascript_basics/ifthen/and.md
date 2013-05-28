# If/Then
## And (`&&`)

<pre class="code javascript" >
if ( user.active &amp;&amp; user.logged_in )
  return 'welcome ' + user.name;
else
  return 'please log in';
</pre>

* use `&&` to check that multiple conditions are met
* if any argument is `false` then then entire condition will fail