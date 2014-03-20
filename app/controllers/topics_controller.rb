class TopicsController < ApplicationController
  include TopicsHelper
  
  def create
    @journey = Journey.create(title: params["topic"]["topic"])
    @topic = Topic.create(name: params["topic"]["topic"])
    if current_user?
      @topic << @journey
      @journey << @user
    end
    redirect_to topic_path(@topic)
  end

  def show
    binding.pry
    @topic = Topic.find_by(id: params[:id])
    @word_association = get_word_associations(@topic[:name])
  end

  
end