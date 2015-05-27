# Europeana::Styleguide

Europeana::Styleguide contains Mustache templates for a consistent front-end
design across Europeana's Ruby web applications.

Templates in this repository are automatically updated from commits to
[Europeana-Patternlab's](https://github.com/europeana/Europeana-Patternlab)
`source/_patterns` directory.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'europeana-styleguide',
  git: 'https://github.com/europeana/europeana-styleguide-ruby'
```

And then execute:

    $ bundle

## Usage

The gem's Mustache templates are in its
[app/ui-components directory](app/ui-components/). To make these available to
as views in your application, include the module `Europeana::Styleguide` in
the relevant controller:

```ruby
class StyledController < ApplicationController
  include Europeana::Styleguide
end
```

You can just include the module in `ApplicationController` to make the
styleguide templates available to all controllers.

Styleguide templates do not following Rails's view naming conventions, so you
will need to explicitly instruct your controller actions to render each
template:

```ruby
class MySearchController < ApplicationController
  include Europeana::Styleguide

  def index
    # search logic
    # ...
    render 'templates/Search/Search-results-list'
  end
end
```

Individual Mustache templates can be overriden locally by creating a file of the
same name in your application's app/ui-components directory. For example, to
override the gem's `app/ui-components/templates/Search/Search-results-list.mustache`
template, copy it to `$RAILS_ROOT/app/ui-components/templates/Search/Search-results-list.mustache`
and edit as required.

Data is provided to Mustache templates for populating its variables via Stache
view classes, named after the template file name, and stored under app/views.
For example, given a template named `templates/Search/Search-results-list.mustache`
(within app/ui-components), provide data to it via a view class named `Templates::Search::SearchResultsList`,
which should sub-class `Stache::Mustache::View`.

Any methods of that view class will be available for the expansion of variables
in the Mustache template. For example:

*app/ui-components/templates/Search/Search-results-list.mustache:*
```mustache
<p>{{result_count}}</p>
```

*app/views/templates/search/search_results_list.rb:*
```ruby
module Templates
  module Search
    class SearchResultsList < Stache::Mustache::View
      def result_count
        @response.total
      end
    end
  end
end
```

To support nested variables separated by ".", have your methods return a Ruby
Hash with keys like the variable's sub-keys, or an object responding to methods
like the variable's sub-keys.

The view class will also have access to any instance variables set on your
controller, and any view helper methods.

## Contributing

1. Fork it ( https://github.com/[my-github-username]/europeana-styleguide/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
