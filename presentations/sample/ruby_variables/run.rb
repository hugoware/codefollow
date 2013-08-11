Dir.chdir Dir.pwd

# used to capture user console messages
require 'stringio'

# the test helper
class TestHelper__8334872305659757

  # each area being tests
  @@messages = nil
  @@current = nil
  @@tests = { }

  # starts 
  def TestHelper__8334872305659757.begin

  end

  # runs the user code
  def TestHelper__8334872305659757.execute &block
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
  def TestHelper__8334872305659757.end
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
  def TestHelper__8334872305659757.test category, &group
    @@current = [ ]
    @@tests[ category ] = @@current
    group.call TestHelper__8334872305659757
  end

  # simple assertion test
  def TestHelper__8334872305659757.assert condition, message
    @@current.push [ message, condition ]
  end

  # simple assertion test
  def TestHelper__8334872305659757.attempt message, &block
    begin
      @@current.push [ message, !!block.call ]
    rescue
      @@current.push [ message, false ]
    end
  end

end

# grab all console messages
TestHelper__8334872305659757.execute do 
  TestHelper__8334872305659757.begin

  # evaluate user input
  begin
    proc = Proc.new { }
    puts 'bbb'

    eval((<<8334872305659757

a = 'fred'

8334872305659757
), proc.binding )

    # simple testing pattern 
    def describe category, &group
      TestHelper__8334872305659757.test category, &group
    end

    # execute the tests
    eval( File.read('./test.rb'), proc.binding, './test.rb')

  # handle any errors
  rescue Exception => e
    puts "Error: #{e}"
  end
  
end

# stop the text
TestHelper__8334872305659757.end