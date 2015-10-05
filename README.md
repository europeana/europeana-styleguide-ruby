# Europeana::Styleguide

Europeana::Styleguide contains [Mustache](https://github.com/mustache/mustache)
templates for a consistent front-end design across Europeana's Ruby on Rails web
applications.

Templates in this repository are automatically updated from commits to
[Europeana-Patternlab's](https://github.com/europeana/Europeana-Patternlab)
`source/_patterns` directory.

## Installation

Add these lines to your application's Gemfile:

```ruby
gem 'europeana-styleguide', github: 'europeana/europeana-styleguide-ruby'
gem 'stache', github: 'europeana/stache', branch: 'europeana-styleguide' # until upstream merges our pull requests
```

And then execute:

    $ bundle

## Usage

### Controllers

The gem's Mustache templates are in its
[app/views directory](app/views/). To make these available as views in your
application, include the module `Europeana::Styleguide` in the relevant
controller:

```ruby
class StyledController < ApplicationController
  include Europeana::Styleguide
end
```

Include the module in `ApplicationController` to make the styleguide templates
available to all controllers.

### View templates

Styleguide templates do not following Rails's view naming conventions. You
will need to:

1. Create a view template in your app/views directory named after the controller
  action, as usual
2. In that view template, include the page-specific styleguide template, along
  with the styleguide header and footer

See "complete example", below, for a demonstration.

#### Customising templates

Individual Mustache templates can be overriden locally by creating a file of the
same name in your application's app/views directory. For example, to
override the gem's `app/views/templates/Search/Search-results-list.mustache`
template, copy it to `$RAILS_ROOT/app/views/templates/Search/Search-results-list.mustache`
and edit as required.

### View classes

Data is supplied to the Mustache templates for variable placeholder expansion via
[Stache](https://github.com/agoragames/stache) view classes named after the
controller action, and stored under app/views alongside the Mustache templates.
These view classes should sub-class `Europeana::Styleguide::View`.

For example, given a controller action `SearchController#index`, with a view
template `app/views/search/index.html.mustache`, provide data to it via a view
class named `Search::Index`.

Any *public* methods of a view class will be available for the expansion of
variable placeholders in the Mustache template. All such methods must be
parameterless. For example:

*app/views/search/index.html.mustache:*
```mustache
<p>{{result_count}}</p>
```

*app/views/templates/search/search_results_list.rb:*
```ruby
module Search
  class Index < Europeana::Styleguide::View
    def result_count
      @response.total
    end
  end
end
```

View classes will have access to any instance variables set on your controller,
and any view helper methods.

To support nested variable placeholders separated by ".", have your methods
return a Ruby `Hash` with keys like the placeholder's sub-keys, or an object
responding to methods like the placeholder's sub-keys.

### Layouts

**Rails layouts will not work,** because expansion of variable placeholders
from the Mustache templates is not performed within the layout.

### I18n

Europeana::Styleguide contains a helper to allow you to perform Rails i18n
lookups from within Mustache templates. Prefix a variable placeholder in the
template with "i18n." and its expansion will be translated from the
application's available locales.

*app/views/welcome/index.html.mustache:*
```mustache
<p>{{i18n.welcome.index.hello}}</p>
```

*config/locales/en.yml:*
```yaml
en:
  welcome:
    index:
      hello: Hello World
```

## Complete example

### Controller

*app/controllers/search_controller.rb:*
```ruby
class SearchController < ApplicationController
  include Europeana::Styleguide

  def index
    # search logic
    @results = ['result 1', 'result 2']
  end
end
```

### View class
*app/views/search/index.rb:*
```ruby
module Search
  class Index < Europeana::Styleguide::View
    def page_title
      t('search.index.page_title')
    end

    def result_count
      @results.size
    end
  end
end
```

### View template
*app/views/search/index.html.mustache:*
```mustache
{{>atoms/meta/_head}}
{{>templates/Search/Search-results-list}}
{{>atoms/meta/_foot}}
```
