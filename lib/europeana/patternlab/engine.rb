module Europeana
  module Patternlab
    class Engine < Rails::Engine
      engine_name 'europeana_patternlab'
      paths['app/views'] << 'app/templates'
    end
  end
end
