class TopicsController < ApplicationController
  include TopicsHelper
  
  def create
    @topic = Topic.create(name: params["topic"]["topic"])
    if current_user
      @journey = Journey.create(title: params["topic"]["topic"], user_id: current_user[:id])
      @journey.topics << @topic
    end
    redirect_to topic_path(@topic)
  end

  def show
    @topic = Topic.find_by(id: params[:id])
    @journey = Journey.find_by(id: @topic[:journey_id])  
    @word_association = get_word_associations(@topic[:name])
    @description = find_topic_description(@topic[:name])
    @photo = find_photo(@topic[:name])
  end

  
end