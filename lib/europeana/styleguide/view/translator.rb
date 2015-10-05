require 'i18n'

module Europeana
  module Styleguide
    class View
      ##
      # Performs i18n lookups for Mustache template variables starting "i18n."
      #
      # Used by {Europeana::Styleguide::View#i18n}
      class Translator
        def initialize(scope, data = {}, parent_keys = [])
          @scope = scope
          @data = data
          @parent_keys = parent_keys
        end

        def [](key)
          translation = @data.present? ? @data[key] : I18n.translate(key, raise: true)
          if translation.nil?
            fail I18n::MissingTranslationData.new(I18n.locale, @parent_keys.join('.'), {}).to_exception
          elsif translation.is_a?(String)
            I18n.interpolate_hash(translation, @scope)
          else
            self.class.new(@scope, translation, @parent_keys + [key])
          end
        rescue I18n::MissingTranslationData => e
          missing_msg(I18n.normalize_keys(e.locale, e.key, e.options[:scope]))
        end

        def to_hash
          self
        end

        def to_s
          missing_msg(@parent_keys)
        end

        def key?(key)
          I18n.exists?(key)
        end
        alias_method :has_key?, :key?

        def fetch(key, default = nil)
          self[key] || default
        end

        def missing_msg(keys)
          "translation missing: #{keys.join('.')}"
        end
      end
    end
  end
end
