# OOP: Basics
## Assigning Properties

<pre class="code javascript" >
function User() {
  
  // an editable property
  this.name = 'admin';

}

var user = new User;
console.log( user.name ); // 'admin'
</pre>

* the `this` object is the instance of the class
* assigning to the `this` object exposes functionality to developers