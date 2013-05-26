# Working With Objects
## Removing Properties

Using the `delete` command will allow you to completely remove properties from an object.

<pre class="code javascript" >
var user = { 
  name: 'fred' 
};

// property still exists
user.name = null;
'name' in user; // true

// property is gone
delete user.name;
'name' in user; // false
</pre>