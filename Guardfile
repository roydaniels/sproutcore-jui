
guard 'shell' do
  watch(%r{^packages/sproutcore-jui/lib/.+\.js}) { `bundle exec rake dist` }
  watch(%r{^packages/sproutcore-throbber/lib/.+\.js}) { `bundle exec rake dist` }
  watch(%r{^packages/aristo/lib/.+\.scss}) { `bundle exec rake dist` }
end
