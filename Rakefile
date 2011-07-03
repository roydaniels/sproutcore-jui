require 'uglifier'
require 'sass'
require 'compass'

PACKAGES = {
  :core => [
    'jquery-ui/autocomplete-html',
    'jquery-ui/dialog-resizable',
    'mixins/widget',
    'mixins/target_support',
    'controls/button',
    'controls/slider',
    'controls/spinner',
    'controls/progressbar',
    'controls/menu',
    'controls/autocomplete',
    'controls/sortable',
    'controls/dialog',
    'controls/datepicker',
    'controls/resizable',
    'controls/tooltip',
    'views/select'
  ],
  :throbber => [
    'jquery-ui/throbber',
    'views/throbber'
  ]
}

VERSION = '0.1.0'
DIST_DIR = 'pkg'
NAMESPACE = 'sproutcore-jui'

task :default => 'jui:build'

namespace :jui do
  desc "Build all packages"
  task :build => ['jui:core:build', 'jui:throbber:build', 'jui:aristo:build']

  desc "Clean all packages"
  task :clean => ['jui:core:clean', 'jui:throbber:clean', 'jui:aristo:clean']

  namespace :core do
    desc "Build core"
    task :build => [:clean] do
      mkpath_if_do_not_exists "#{DIST_DIR}/jquery-ui"
      cp 'packages/jquery-ui/lib/jquery-ui.js', "#{DIST_DIR}/jquery-ui/jquery-ui.js"
      build_package :core
    end

    desc "Clean core"
    task :clean do
      rm_rf "#{DIST_DIR}/jquery-ui"
      rm_rf "#{DIST_DIR}/#{NAMESPACE}-core"
    end
  end

  namespace :throbber do
    desc "Build throbber"
    task :build => [:clean] do
      build_package :throbber
    end

    desc "Clean throbber"
    task :clean do
      rm_rf "#{DIST_DIR}/#{NAMESPACE}-throbber"
    end
  end

  namespace :aristo do

    desc "Build aristo"
    task :build => [:clean] do
      build_stylesheet_package :aristo
    end

    desc "Clean aristo"
    task :clean do
      rm_rf "#{DIST_DIR}/#{NAMESPACE}-aristo"
    end
  end

end

def build_package name
  puts "Build #{name} package..."
  content = ''
  package_name = "#{NAMESPACE}-#{name}"
  base_path = "packages/#{package_name}/lib"
  PACKAGES[name].each do |file|
    content += "(function(){\n\n"
    content += File.read(File.join(base_path, "#{file}.js")) + "\n\n"
    content += "})();\n\n"
  end

  mkpath_if_do_not_exists "#{DIST_DIR}/#{package_name}"
  File.open("#{DIST_DIR}/#{package_name}/#{package_name}-#{VERSION}.js", 'w') do |f|
    f << content
  end

  puts "Compress #{name} package..."
  File.open("#{DIST_DIR}/#{package_name}/#{package_name}.min-#{VERSION}.js", 'w') do |f|
    f << Uglifier.new.compile(content)
  end
end

def build_stylesheet_package name
  puts "Build #{name} package..."
  package_name = "#{NAMESPACE}-#{name}"
  base_path = "packages/#{package_name}/lib"
  engine = create_scss_engine(base_path, name)
  mkpath_if_do_not_exists "#{DIST_DIR}/#{package_name}"

  puts "Process #{name} package..."
  File.open("#{DIST_DIR}/#{package_name}/#{package_name}-#{VERSION}.css", 'w') do |f|
    f << engine.render
  end
end

def create_scss_engine path, filename
  Compass.configuration.images_path = File.join(path, 'images')  
  Sass::Engine.new(File.read(File.join(path, "#{filename}.scss")),
    :syntax => :scss,
    :load_paths => Compass.configuration.sass_load_paths + [File.expand_path(path)]
  )
end

def mkpath_if_do_not_exists path
  mkdir_p(path) if !File.exists?(path)
end
