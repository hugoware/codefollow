# Functions: Arguments
## Passing Arguments

<pre class="code javascript" >
function save( file ) {
  console.log('saving:', file );
}

save('file.txt'); // saving: file.txt
save('image.jpg'); // saving: image.jpg
save('music.mp3'); // saving: music.mp3
</pre>

* When invoking a method, provide a variable or value for each defined argument
* If a value is not provided, a `null` will be pass in it's place