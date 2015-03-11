require 'stache'

Stache.configure do |c|
  c.template_base_path = File.expand_path('../../../app/templates', __FILE__)

  c.use :mustache
end
