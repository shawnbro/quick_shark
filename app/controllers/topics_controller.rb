class TopicsController < ApplicationController
  include TopicsHelper
  
  def create
    @topic = Topic.create(name: params["topic"]["topic"])
    redirect_to topic_path(@topic)
  end

  def show
    @topic = Topic.find_by(id: params[:id])
    @word_association = get_word_associations(@topic[:name])
    binding.pry
  end

  
end