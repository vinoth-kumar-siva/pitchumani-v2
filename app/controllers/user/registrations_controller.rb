# frozen_string_literal: true

class User::RegistrationsController < Devise::RegistrationsController
  before_action :authenticate_user!, except: :create
  #Methods starts here
  def create
    user = User.create(sign_up_params)
    if user.save
      sign_in(user)
      redirect_to after_sign_in_path_for(user)
      # user = current_user
      # redirect_to ('/')
      # @message = "signed up successfully"
    else
      @message = user.errors.full_messages 
    end  
  end
  
  private
  def sign_up_params
    params.require(:user).permit(:mobile_number, :password, :password_confirmation)
  end
end