# frozen_string_literal: true
module Europeana
  module Styleguide
    module UrlHelper
      ##
      # @param asset [String] Path to required styleguide asset
      # @return [String] Full URL to asset, or to asset host root if no asset
      def styleguide_url(asset = nil)
        styleguide_asset_host + asset.to_s
      end

      def styleguide_asset_host
        ENV['EUROPEANA_STYLEGUIDE_ASSET_HOST'] || 'https://styleguide.europeana.eu'
      end
    end
  end
end
