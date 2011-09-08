require File.expand_path("../vendor/bundler/setup", __FILE__)
require "erb"
require "uglifier"
require "sproutcore"

require 'bundler/gem_tasks'

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

# Create a build task that depends on all of the package dependencies
task :build_sc => ["sproutcore:jui"]

# Strip out require lines from sproutcore-jui.js. For the interim, requires are
# precomputed by the compiler so they are no longer necessary at runtime.
file "dist/sproutcore-jui.js" => :build_sc do
  puts "Generating sproutcore-jui.js"

  mkdir_p "dist"

  File.open("dist/sproutcore-jui.js", "w") do |file|
    file.puts strip_require("tmp/static/sproutcore-jui.js")
  end
end

# Minify dist/sproutcore-jui.js to dist/sproutcore-jui.min.js
file "dist/sproutcore-jui.min.js" => "dist/sproutcore-jui.js" do
  puts "Generating sproutcore-jui.min.js"

  File.open("dist/sproutcore-jui.prod.js", "w") do |file|
    file.puts strip_sc_assert("dist/sproutcore-jui.js")
  end

  File.open("dist/sproutcore-jui.min.js", "w") do |file|
    file.puts uglify("dist/sproutcore-jui.prod.js")
  end

  rm "dist/sproutcore-jui.prod.js"
end

# desc "bump the version to the specified version"
# task :bump_version, :version do |t, args|
#   version = args[:version]

#   File.open("VERSION", "w") { |file| file.write version }

#   contents = File.read("packages/sproutcore-jui/package.json")
#   contents.gsub! %r{"version": .*$}, %{"version": "#{version}",}
#   File.open("packages/sproutcore-jui/package.json", "w") { |file| file.write contents }

#   sh %{git add VERSION package.json packages/sproutcore-jui/package.json}
#   sh %{git commit -m "Bump version to #{version}"}
# end

desc "Build SproutCore JUI"
task :dist => ["dist/sproutcore-jui.min.js"]

desc "Clean build artifacts from previous builds"
task :clean do
  sh "rm -rf tmp && rm -rf dist"
end

task :default => :dist

