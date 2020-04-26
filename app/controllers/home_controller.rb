class HomeController < ApplicationController
	skip_before_action :authenticate_user!
	skip_before_action :verify_authenticity_token
  def index
    @support = Vote.where("user_id IS NOT NULL").count
    @comments = Comment.last(3)
    @memes = Meme.last(7)
    @meme = Meme.new
  end

  def vote_now
    p '12333'
  	@user = User.find(params[:user_id])
  	@vote = @user.vote
    if @vote
      p ' avaible'
  		render :json => { message: "You have already voted!", alert: "error", status: 200}
  	else
  		@user.create_vote
  		@support = Vote.where("user_id IS NOT NULL").count
  		render :json => { message: "Your vote has been registered successfully!", alert: "success", support: @support, status: 200}
  	end
  end

  def create_meme
    if @meme = Meme.create(name: params[:meme][:name], image: params[:meme][:image], user_id: current_user.id)
      redirect_to root_path 
      # render :json => { message: "Your Meme has been created successfully!", alert: "success", support: @comments, status: 200}
    end
  end

  def like
    @comment = Comment.find(params[:comment_id])
    @comment.update(like_count: @comment.try(:like_count) ? @comment.try(:like_count)+1 : 1 )
    @comment_like_count = @comment.try(:like_count) ? @comment.try(:like_count) : 0 
    render :json => { message: "Your like added", alert: "success", like_count: @comment_like_count, status: 200}
  end

  def create_post
    @user = User.find(params[:user_id])
    Comment.create(user_id:params[:user_id], text: params[:message])
    @comments = Comment.last(5)
    render :json => { message: "Your comment has been registered successfully!", alert: "success", support: @comments, status: 200}
	end
end
