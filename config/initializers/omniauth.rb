Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, "937993199740-47bdc8dus0btvd9ko7isu07r7da02mdv.apps.googleusercontent.com","j2VQrl40O9O9vA0WIUEP2haY", skip_jwt: true
  end