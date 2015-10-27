module Europeana
  module Styleguide
    ##
    # A base class for Rails app view classes to sub-class
    #
    # Provides some common helpers, and default values for template variables.
    #
    # Override these methods in a template-specific view class to change the
    # data supplied to the template.
    #
    # All methods requiring parameters should be `protected` to prevent exposure
    # to the Mustache templates which can not pass parameters in variable
    # expansion.
    #
    # @todo add some class methods to register head links, etc
    class View < Stache::Mustache::View
      autoload :Translator, 'europeana/styleguide/view/translator'

      def head_meta
        [
          { meta_name: 'HandheldFriendly', content: 'True' },
          { httpequiv: 'Content-Type', content: 'text/html; charset=utf-8' },
          { meta_name: 'csrf-param', content: 'authenticity_token' },
          { meta_name: 'csrf-token', content: form_authenticity_token }
        ]
      end

      ##
      # Performs I18n lookups from within a Mustache template
      # @example Translate the "site.name" key (from within a Mustache template)
      #   {{i18n.site.name}}
      # @return [Europeana::Styleguide::View::Translator]
      def i18n
        @europeana_styleguide_view_translator ||= Translator.new(context)
      end

      ##
      # Base URL to styleguide images
      def image_root
        styleguide_url('/images/')
      end

      ##
      # Whether or not to enable debugging in Mustache templates
      #
      # Override in a sub-class to enable debugging there.
      # The overriden method should return the textual debug output.
      def debug
        false
      end

      ##
      # <link> elements to include in the HTML <head>
      def head_links
        [
          { rel: 'stylesheet', href: styleguide_url('/css/screen.css'), media: 'all', title: nil }
        ]
      end

      ##
      # JS files to include
      def js_files
        [
          {
            path: styleguide_url('/js/dist/require.js'),
            data_main: styleguide_url('/js/dist/main/main')
          }
        ]
      end

      ##
      # JS variables to output
      def js_vars
        page_name = [params[:controller], params[:action]].join('/')
        [
          {
            name: 'pageName', value: page_name
          }
        ]
      end

      protected

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
