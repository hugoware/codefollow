# If/Then
## Or (`||`)

<pre class="code javascript" >
if ( user.admin || user.power_user )
  return 'changes were saved';
else
  return 'you do not have access';
</pre>

* use `||` to check that at least one of the conditions are met
* if any one argument is `true` then then entire condition will pass