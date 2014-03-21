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
    @topic = Topic.find_by(name: params[:id])
    @journey = Journey.find_by(id: @topic[:journey_id])  
    @word_association = get_word_associations(@topic[:name])
  end

  def description
    @description = find_topic_description(params[:name])
    render json: @description
  end

  def pictures
    @photo = find_photo(params[:name])
    render json: @photo
  end

  def stats
    @wolfram = get_wolfram_alpha(params[:name])
    render json: @wolfram
  end

  def data
    if Topic.find_by(name: params[:word] ) !=  nil
      @topic = Topic.find_by(name: params[:word] ) 
      else
      @topic = Topic.create(name: params[:word])
    end
    @word_association = get_word_associations(@topic[:name])
    array_results = @word_association[:word_associations]
    @raw_tree_data = tree_results(array_results)
    @tree_data = @raw_tree_data.to_json
    render json: @tree_data
  end

  def add_topic
    @topic = Topic.find_by(name: params[:topic]) || Topic.create(name: params[:topic])

    if current_user
      @journey = Journey.find(params[:journey])  
      @journey.topics << @topic
    end

    render json: @topic
  end


end