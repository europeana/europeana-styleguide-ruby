# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'europeana/patternlab/version'

Gem::Specification.new do |spec|
  spec.name          = 'europeana-patternlab'
  spec.version       = Europeana::Patternlab::VERSION
  spec.authors       = ['Richard Doe']
  spec.email         = ['richard.doe@rwdit.net']
  spec.summary       = %q{Europeana Pattern Lab styleguide for Ruby.}
  spec.homepage      = 'https://github.com/rwd/Europeana-Patternlab-ruby'
  spec.license       = 'EUPL 1.1'

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_dependency 'mustache', '~> 0.99.8' # stache is incompatible with mustache >= 1.0.0
  spec.add_dependency 'stache', '~> 1.1.0'

  spec.add_development_dependency 'bundler', '~> 1.7'
  spec.add_development_dependency 'rake', '~> 10.0'
end
