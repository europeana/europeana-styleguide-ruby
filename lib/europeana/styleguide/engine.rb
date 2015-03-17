module Europeana
  module Styleguide
    class Engine < Rails::Engine
      engine_name 'europeana_styleguide'

      paths['app/views'] << 'app/ui-components'

      require 'mustache'
      require 'stache'

      initializer 'europeana_styleguide.stache' do |_app|
        Stache.configure do |c|
          c.use :mustache
          c.template_base_path = 'app/ui-components'
        end
      end

      initializer 'europeana_styleguide.action_controller_view_path' do |_app|
        ActionController::Base.prepend_view_path('app/ui-components')
      end
    end
  end
end
