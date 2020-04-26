class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :url
      t.string :type
      t.integer :like_count
      t.integer :download_count

      t.timestamps
    end
  end
end
