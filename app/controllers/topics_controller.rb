class TopicsController < ApplicationController

  def create
    @topic = Topic.create(name: params["topic"]["topic"])
    redirect_to topic_path(@topic)
  end

  def show
    @topic = Topic.find_by(id: params[:id])
  end

end