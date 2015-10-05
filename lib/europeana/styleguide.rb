require 'europeana/styleguide/version'

module Europeana
  module Styleguide
    require 'europeana/styleguide/engine' if defined?(Rails)

    autoload :View, 'europeana/styleguide/view'

    extend ActiveSupport::Concern

    # @todo allow specification of asset host URL in engine config via initializer
    ASSET_HOST = 'http://styleguide.europeana.eu'

    included do
      if respond_to?(:prepend_view_path)
        prepend_view_path(File.expand_path('../../../app/views', __FILE__))
        prepend_view_path('app/views')
      end

      if respond_to?(:layout)
        layout false
      end
    end
  end
end
