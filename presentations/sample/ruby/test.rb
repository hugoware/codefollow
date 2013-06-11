
describe 'variable `a`' do | test |
  a = nil unless defined? a
  test.assert( ( not a.nil? ), 'exists' )
  test.assert( a.is_a?( String ), 'is a string' )
  test.assert( a == 'fred', 'equals `fred`' )
end

describe 'variable `b`' do | test |
  b = nil unless defined? b
  test.assert( ( not b.nil? ), 'exists' )
  test.assert( ( b.is_a?( TrueClass ) or b.is_a?( FalseClass ) ), 'is a boolean' )
  test.assert( b == false, 'equals `false`' )
end

describe 'variable `c`' do | test |
  c = nil unless defined? c
  test.assert( ( not c.nil? ), 'exists' )
  test.assert( c.is_a?( Integer ), 'is an integer' )
  test.assert( c == 33, 'equals `33`' )
end