require File.expand_path("../vendor/bundler/setup", __FILE__)
require "erb"
require "uglifier"
require "sproutcore"
require "compass"

LICENSE = File.read("generators/license.js")

## Some SproutCore modules expect an exports object to exist. Until bpm exists,
## just mock this out for now.

module SproutCore
  module Compiler
    class Entry
      def body
        "\n(function(exports) {\n#{@raw_body}\n})({});\n"
      end
    end
  end
end

## HELPERS ##

def strip_require(file)
  result = File.read(file)
  result.gsub!(%r{^\s*require\(['"]([^'"])*['"]\);?\s*$}, "")
  result
end

def strip_sc_assert(file)
  result = File.read(file)
  result.gsub!(%r{^(\s)+sc_assert\((.*)\).*$}, "")
  result
end

def uglify(file)
  uglified = Uglifier.compile(File.read(file))
  "#{LICENSE}\n#{uglified}"
end

def build_stylesheet_package package_name, module_name=nil
  module_name = package_name if module_name.nil?
  puts "Generating #{module_name}.css"
  base_path = "packages/#{package_name}/lib"
  engine = create_scss_engine(base_path, module_name)

  mkdir_p "dist"

  File.open("dist/#{module_name}.css", 'w') do |f|
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

# Set up the intermediate and output directories for the interim build process

SproutCore::Compiler.intermediate = "tmp/intermediate"
SproutCore::Compiler.output       = "tmp/static"

# Create a compile task for a SproutCore package. This task will compute
# dependencies and output a single JS file for a package.
def compile_package_task(package)
  js_tasks = SproutCore::Compiler::Preprocessors::JavaScriptTask.with_input "packages/#{package}/lib/**/*.js", "."
  SproutCore::Compiler::CombineTask.with_tasks js_tasks, "#{SproutCore::Compiler.intermediate}/#{package}"
end

## TASKS ##

# Create sproutcore:package tasks for each of the SproutCore packages
namespace :sproutcore do
  %w(jui).each do |package|
    task package => compile_package_task("sproutcore-#{package}")
  end
end

# Create a jquery-ui task
#task :'jquery-ui' => compile_package_task("jquery-ui")

## CSS TASKS ##

# Create a jquery-ui css task
task :'jquery-ui-css' do
  build_stylesheet_package('aristo', 'jquery-ui')
end

# Create a aristo task
task :aristo do
  build_stylesheet_package('aristo')
end

# Create a build task that depends on all of the package dependencies
task :build => ["sproutcore:jui", :'jquery-ui-css', :aristo]

# Strip out require lines from sproutcore-jui.js. For the interim, requires are
# precomputed by the compiler so they are no longer necessary at runtime.
file "dist/sproutcore-jui.js" => :build do
  puts "Generating sproutcore-jui.js"

  mkdir_p "dist"

  File.open("dist/sproutcore-jui.js", "w") do |file|
    file.puts strip_require("tmp/static/sproutcore-jui.js")
  end
end

# Minify dist/sproutcore-jui.js to dist/sproutcore-jui.min.js
file "dist/sproutcore-jui.min.js" => "dist/sproutcore-jui.js" do
  puts "Generating sproutcore-jui.min.js"

  File.open("dist/sproutcore-jui.min.js", "w") do |file|
    file.puts uglify("dist/sproutcore-jui.js")
  end
end

SC_VERSION = File.read("VERSION")

desc "bump the version to the specified version"
task :bump_version, :version do |t, args|
  File.open("VERSION", "w") { |file| file.write args[:version] }

  Dir["packages/sproutcore-*/package.json"].each do |package|
    contents = File.read(package)
    contents.gsub! %r{"version": .*$}, %{"version": "#{args[:version]}",}

    File.open(package, "w") { |file| file.write contents }
  end
end

desc "Build SproutCore JUI and SproutCore Throbber"
task :dist => ["dist/sproutcore-jui.min.js"]

desc "Clean build artifacts from previous builds"
task :clean do
  sh "rm -rf tmp && rm -rf dist"
end

task :default => :dist

