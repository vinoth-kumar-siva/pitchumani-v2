require 'carrierwave/orm/activerecord'


CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'AKIAS6PBD3PCINQUY5GT',
    aws_secret_access_key: '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',
    region: 'us-east-1'
  }

  config.fog_directory = 'pichumani'
end