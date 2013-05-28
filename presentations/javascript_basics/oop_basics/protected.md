# OOP: Basics
## Protected Values

<pre class="code javascript" >
function User() {

  // protected within class
  var name = 'admin';

  // access the value
  this.get_name = function() {
    return name;
  };
}

var user = new User;
  , name = user.get_name()
console.log( name ); // 'admin'
</pre>

* using `var` creates a locally scoped variable
* these variables are not avaiable outside the instance of the `class`