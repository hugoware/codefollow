# Working With Objects
## Removing Properties

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

* Setting a property to `null` does not remove it from the object
* Using the `delete` operator will completely remove a properties from an object