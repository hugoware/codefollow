# OOP: Basics
## Constructors

<pre class="code javascript" >
function User( name ) {
  this.name = name || 'guest';
}

var user = new User('ted');
console.log( user.name ); // 'ted'
</pre>

* constructor arguments are defined within the `function` parentheses