Dir.chdir Dir.pwd

# used to capture user console messages
require 'stringio'

# the test helper
class TestHelper__999999

  # each area being tests
  @@messages = nil
  @@current = nil
  @@tests = { }

  # starts 
  def TestHelper__999999.begin

  end

  # runs the user code
  def TestHelper__999999.execute &block
    original = $stdout
    $stdout = capture = StringIO.new
    begin
      yield
    ensure
      $stdout = original
    end
    @@messages = capture.string
  end

  # send out results
  def TestHelper__999999.end
    puts '== BEGIN =='

    # write each title and result
    @@tests.each do | key, value |
      puts key
      value.each do | result |
        puts "\t#{result[0]}\t#{result[1]?1:0}\t1"
      end
    end

    puts '== SUMMARY =='

    # write each message
    if @@messages.is_a? String
      @@messages.lines.each do | message |
        puts "message\t#{message}"
      end
    end

    puts '== END =='
  end

  # tests a section
  def TestHelper__999999.test category, &group
    @@current = [ ]
    @@tests[ category ] = @@current
    group.call TestHelper__999999
  end

  # simple assertion test
  def TestHelper__999999.assert condition, message
    @@current.push [ message, condition ]
  end

end

# grab all console messages
TestHelper__999999.execute do 
  TestHelper__999999.begin

  # evaluate user input
  begin
    proc = Proc.new { }

    ##{ USER_INPUT }##

    # simple testing pattern 
    def describe category, &group
      TestHelper__999999.test category, &group
    end

    # execute the tests
    ##{ EXECUTE }##

  # handle any errors
  rescue Exception => e
    puts "Error: #{e}"
  end
  
end

# stop the text
TestHelper__999999.end