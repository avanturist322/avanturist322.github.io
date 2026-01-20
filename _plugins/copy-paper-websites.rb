# frozen_string_literal: true

require "fileutils"

Jekyll::Hooks.register :site, :post_write do |site|
  base_source_dir = File.join(site.source, "papers_websites")
  next unless Dir.exist?(base_source_dir)

  Dir.children(base_source_dir).sort.each do |entry|
    next if entry.start_with?(".")

    source_dir = File.join(base_source_dir, entry)
    next unless File.directory?(source_dir)

    dest_dir = File.join(site.dest, entry)
    FileUtils.rm_rf(dest_dir)
    FileUtils.cp_r(source_dir, dest_dir)
  end
end
