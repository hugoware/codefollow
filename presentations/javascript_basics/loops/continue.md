# Loops
## Continue

<pre class="code javascript" >
for ( var u in users ) {

  // if true, move to next
  if ( users[u].admin ) continue;

  delete( users[u] );
}
</pre>

* Using `continue` will cancel any remaining work in the current iteration 
* If there are remaining elements in the loop, `continue` will resume with the next item.