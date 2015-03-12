module Europeana
  module Styleguide
    class Engine < Rails::Engine
      engine_name 'europeana_styleguide'
      paths['app/views'] << 'app/templates'
    end
  end
end
