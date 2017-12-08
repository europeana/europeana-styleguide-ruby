# frozen_string_literal: true
require 'mustache'
require 'stache'

module Europeana
  module Styleguide
    class Engine < Rails::Engine
      engine_name 'europeana_styleguide'
      isolate_namespace Europeana::Styleguide

      initializer 'europeana_styleguide.stache' do |_app|
        Stache.configure do |c|
          c.use :mustache
          c.template_base_path = ::Rails.root.join('app', 'views')
          c.template_base_class = '::Europeana::Styleguide::View'
        end
      end
    end
  end
end
