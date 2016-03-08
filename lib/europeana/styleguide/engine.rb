module Europeana
  module Styleguide
    class Engine < Rails::Engine
      engine_name 'europeana_styleguide'

      require 'mustache'
      require 'stache'

      paths['config/locales'] << 'config/locales/global'
      paths['config/locales'] << 'config/locales/portal'

      initializer 'europeana_styleguide.stache' do |_app|
        Stache.configure do |c|
          c.use :mustache
          c.template_base_path = 'app/views'
        end
      end
    end
  end
end
