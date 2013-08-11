describe('method `sortBy`', function() {
  it( 'should be called', function() {  expect( __sort_by_used ).toBe( true ); });
  it( 'using `fruits`', function() {  expect( __sort_by_using_fruit ).toBe( true ); });
  it( 'sort each item `count`', function() {  expect( __sort_by_fruit_by_count ).toBe( true ); });
});

describe('method `forEach`', function() {
  it( 'should be called', function() { expect( __for_each_used ).toBe( true ); });
  it( 'with a function argument', function() { expect( __for_each_provided_function ).toBe( true ); });
  it( 'using sorted result', function() { expect( __for_each_with_sorted_collection ).toBe( true ); });
});

describe('method `assign`', function() {
  it( 'should expect templated string', function() { expect( __assign_correct_template ).toBe( true ); });
  it( 'be called once per item in `fruits`', function() { expect( __assign_used_correct_count ).toBe( true ); });
  it( 'each assigned the correct message', function() { expect( __assign_correct_results ).toBe( true ); });
});

describe('method `console.log`', function() {
  it( 'should be called for each message', function() { expect( __console_log_used ).toBe( true ); });
  it( 'should be provided the correct message', function() { expect( __console_log_correct_results ).toBe( true ); });
});