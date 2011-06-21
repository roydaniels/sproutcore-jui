
guard 'shell' do
  watch(%r{^packages/sproutcore-jui-core/lib/.+\.js}) { `rake jui:core:build` }
  watch(%r{^packages/sproutcore-jui-aristo/lib/.+\.scss}) { `rake jui:aristo:build` }
  watch(%r{^packages/sproutcore-jui-views/lib/.+\.js}) { `rake jui:views:build` }
  watch(%r{^packages/sproutcore-jui-throbber/lib/.+\.js}) { `rake jui:throbber:build` }
end
