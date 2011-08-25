# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "rasputin-jui/version"

Gem::Specification.new do |s|
  s.name        = "rasputin-jui"
  s.version     = Rasputin::JUI::VERSION
  s.authors     = ["Paul Chavard"]
  s.email       = ["paul@chavard.net"]
  s.homepage    = "http://github.com/tchak/sproutcore-jui"
  s.summary     = %q{SproutCore 2.0 jQuery UI wrapper.}
  s.description = %q{SproutCore 2.0 jQuery UI wrapper for Rails asset pipeline.}

  s.rubyforge_project = "rasputin-jui"
  s.add_runtime_dependency 'rasputin', '~> 0.8.0'

  s.files    = [
    'lib/rasputin-jui.rb',
    'lib/rasputin-jui/engine.rb',
    'lib/rasputin-jui/version.rb',
    'vendor/assets/javascripts/jquery-ui-19.js',
    'vendor/assets/javascripts/sproutcore-jui.js',
    'vendor/assets/stylesheets/jquery-ui.css',
    'vendor/assets/stylesheets/aristo.css',
    'Gemfile',
    'Rakefile',
    'README.md'
  ]

  s.require_paths = ["lib"]
end
