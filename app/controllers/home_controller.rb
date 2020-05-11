class HomeController < ApplicationController
	skip_before_action :authenticate_user!
	skip_before_action :verify_authenticity_token
  def index
    @support = Vote.count
    @comments_count = Comment.count
    @comments = Comment.last(20).reverse
    @memes = Meme.last(7)
    @meme = Meme.new
  end

  def vote_now
    @vote = Vote.create
    if @vote.save
      @support = Vote.count
      render :json => { message: "Thankyou your honour! Thankyou!", alert: "success", support: @support, status: 200}
    else
  		render :json => { message: @vote.errors['message'], alert: "error", status: 200}
    end
  end

  def create_meme
    if @meme = Meme.create(name: params[:meme][:name], image: params[:meme][:image])
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
    Comment.create(name:params[:name], text: params[:message])
    @comments = Comment.last(20).reverse
    render :json => { message: "Thankyou your honour! Thankyou!", alert: "success", support: @comments, status: 200}
	end
end
