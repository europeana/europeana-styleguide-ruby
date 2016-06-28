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
        @europeana_styleguide_view_asset_host ||= begin
          host = ENV['EUROPEANA_STYLEGUIDE_ASSET_HOST']
          host ||= Europeana::Styleguide::ASSET_HOST
        end
      end
    end
  end
end
