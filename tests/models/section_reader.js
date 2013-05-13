require('../test')( module, {


  reads_type_for_section: function() {
    var reader = new SectionReader('[first]');
    this.equal( reader.type, 'first' );

    reader = new SectionReader('[second a:1]');
    this.equal( reader.type, 'second' );
  },

  reads_type_for_malformed_section: function() {
    var reader = new SectionReader('[ third a:1]');
    this.equal( reader.type, 'third' );
  },

  reads_malformed_parameter: function() {
    var reader = new SectionReader('[file   color   :green  ]');
    this.equal( reader.color, 'green', 'did not read correct parameter' );
  },

  reads_single_section_parameter: function() {
    var reader = new SectionReader('[slide color:red follow]');

    this.equal( reader.type, 'slide', 'did not read correct type' );
    this.equal( reader.color, 'red', 'did not read correct parameter' );
    this.equal( reader.value, 'follow', 'did not read correct value' );
  },

  reads_multiple_section_parameters: function() {
    var reader = new SectionReader('[test color:red title:user   local:false value with spaces]');

    this.equal( reader.type, 'test', 'did not read correct type' );
    this.equal( reader.title, 'user', 'did not read first correct parameter' );
    this.equal( reader.local, 'false', 'did not read second correct parameter' );
    this.equal( reader.value, 'value with spaces', 'did not read correct value' );
  },

  reads_with_only_a_value: function() {
    var reader = new SectionReader('[temp value with spaces]');

    this.equal( reader.type, 'temp', 'did not read correct type' );
    this.equal( reader.value, 'value with spaces', 'did not read correct value' );
  },

  reads_quoted_parameter_values: function() {
    var reader = new SectionReader('[user name:"fred smith" ]');
    this.equal( reader.type, 'user', 'did not read correct type' );
    this.equal( reader.name, 'fred smith', 'did not read correct double quoted parameter value' );

    reader = new SectionReader("[admin name:'mike smith' ]");
    this.equal( reader.type, 'admin', 'did not read correct type' );
    this.equal( reader.name, 'mike smith', 'did not read correct single quoted parameter value' );

    reader = new SectionReader("[profile name:'suzie smith' " + ' address:"123 street"]');
    this.equal( reader.type, 'profile', 'did not read correct type' );
    this.equal( reader.name, 'suzie smith', 'did not read correct mix double quoted parameter value' );
    this.equal( reader.address, '123 street', 'did not read correct mix single quoted parameter value' );
  },

  reads_escaped_quoted_parameter_values: function() {
    var reader = new SectionReader("[quoted title:'pat o\\'neil' ]");
    this.equal( reader.type, 'quoted', 'did not read correct type' );
    this.equal( reader.title, "pat o'neil", 'did not read escaped quoted parameter value' );
  },

  ignores_value_when_empty: function() {
    var reader = new SectionReader('[kind    ]');
    this.equal( reader.value, null, 'still had a value property when empty' );

    reader = new SectionReader('[kind  a:1  ]');
    this.equal( reader.value, null, 'still had a value property with parameter' );
  }

});