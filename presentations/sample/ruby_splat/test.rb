
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

    # randomly create arguments
    args = [ ]
    expect = 0
    (0...(rand(25)+10)).each do | i |
      value = rand(50) + 10
      expect += value
      args.push value 
    end

    calc.add( *args ) == expect
  end

  test.attempt 'can use `add` with strings' do
    calc = Calculator.new

    # randomly create arguments
    args = [ ]
    expect = 0
    (0...(rand(25)+10)).each do | i |
      value = (0...4).map{(65+rand(26)).chr}.join
      expect += value
      args.push value 
    end

    calc.add( *args ) == expect
  end


end