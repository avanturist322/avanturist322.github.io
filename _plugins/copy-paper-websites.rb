# frozen_string_literal: true

require "fileutils"

Jekyll::Hooks.register :site, :post_write do |site|
  source_dir = File.join(site.source, "papers_websites", "KAGEBench")
  next unless Dir.exist?(source_dir)

  dest_dir = File.join(site.dest, "KAGEBench")
  FileUtils.rm_rf(dest_dir)
  FileUtils.cp_r(source_dir, dest_dir)
end

