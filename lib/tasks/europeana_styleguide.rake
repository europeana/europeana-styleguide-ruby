# frozen_string_literal: true

require 'fileutils'

namespace :europeana_styleguide do
  desc 'Copy views & assets from cloned europeana/Europeana-Patternlab repo.'
  task :populate, [:patternlab_path] do |_task, args|
    gem_dir = File.expand_path('../..', __dir__)
    patternlab_dir = File.expand_path(args[:patternlab_path], Dir.pwd)

    %w(app/views app/assets/stylesheets app/assets/javascripts app/assets/images).each do |path|
      rm_dir = "#{gem_dir}/#{path}"
      print "Deleting #{rm_dir}... "
      FileUtils.remove_dir(rm_dir, true)
      puts "OK"
    end

    FileUtils.mkdir("#{gem_dir}/app/assets/images")

    {
      'source/_patterns' => 'app/views',
      'source/sass' => 'app/assets/stylesheets',
      'source/js/modules' => 'app/assets/javascripts',
      'source/images/*.png' => 'app/assets/images',
      'source/images/*.gif' => 'app/assets/images',
      'source/images/*.jpg' => 'app/assets/images',
      'source/images/*.svg' => 'app/assets/images',
      'source/images/favicons' => 'app/assets/images',
      'source/images/icons' => 'app/assets/images'
    }.each do |from, to|
      cp_src = "#{patternlab_dir}/#{from}"
      cp_dst = "#{gem_dir}/#{to}"
      print "Copying files from #{cp_src} to #{cp_dst}... "
      cp_src = Dir.glob(cp_src) if from.include?('*')
      FileUtils.cp_r(cp_src, cp_dst)
      puts "OK"
    end
  end
end
