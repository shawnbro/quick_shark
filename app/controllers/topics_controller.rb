class TopicsController < ApplicationController
  include TopicsHelper

  def new
    @random_word = get_random_word["word"]
  end

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
    @journey = Journey.find_by(id: @topic.journey_id)  
    @word_association = get_word_associations(@topic.name.downcase!)
    @videos = get_youtube_vids(@topic.name).take(4)
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
    if @word_association[0][:word_associations].nil?
      @tree = tree_results(get_wolfram_text(@topic.name))
      render json: @tree_data
    else
      @tree = tree_results(@word_association[0])
      render json: @tree.to_json
    end
  end

  def add_topic
    @topic = Topic.create(name: params[:topic])

    if current_user
      @journey = Journey.find(params[:journey])  
      @journey.topics << @topic
      render json: @topic
    end
  end

  def ytdata
    @topic = Topic.find_by(name: params[:name] )
    @video_data = youtube_json(@topic.name)
    render json: @video_data
  end

  def update
    @topic = Topic.find(params[:id])
    @topic.counter = params[:counter]
    @topic.save
    render json: @topic
  end

  private

  def get_random_word
    randomWord = HTTParty.get("http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key="+WORDNIK_API_KEY)
  end

end
