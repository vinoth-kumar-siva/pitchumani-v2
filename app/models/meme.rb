class Meme < ApplicationRecord
	mount_uploader :image, ImageUploader
end
