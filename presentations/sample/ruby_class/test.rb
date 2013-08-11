
describe 'class `Calculator`' do | test |

  test.assert defined? Calculator, 'exists'
  
  test.attempt 'can instantiate' do
    Calculator.new.is_a? Calculator
  end

  test.attempt 'has `add` method' do
    calc = Calculator.new
    calc.respond_to? :add
  end

  test.attempt 'can use `add` with numbers' do
    calc = Calculator.new
    first = rand(1000) + 100
    second = rand(1000) + 100
    expect = first + second
    calc.add( first, second ) == expect
  end

  test.attempt 'can use `add` with strings' do
    calc = Calculator.new
    first = (0...8).map{(65+rand(26)).chr}.join
    second = (0...8).map{(65+rand(26)).chr}.join
    expect = first + second
    calc.add( first, second ) == expect
  end

end