class TopicsController < ApplicationController
  include TopicsHelper

  def new
    @random_word = get_random_word["word"]
  end

  def create
    unless params[:topic]["topic"].empty?
      @topic = Topic.find_by(name: params["topic"]["topic"]) || Topic.create(name: params["topic"]["topic"])

      if current_user
        @journey = Journey.create(title: params["topic"]["topic"], user_id: current_user[:id])
        @journey.topics << @topic
      end

      redirect_to topic_path( @topic, journey_id: @journey.try(:id) )

    else
      redirect_to root_path
    end
  end

  def show
    @topic = Topic.find_by(name: params[:id])

    if current_user && params[:journey_id]
      @journey = Journey.find_by(id: params[:journey_id])
    end

    @word_association = get_word_associations(@topic.name)
    @videos = get_youtube_vids(@topic.name).take(4)
  end

  def description
    @description = find_topic_description(params[:name])
    render json: @description
  end

  def definition
    @definition = get_word_associations(params[:name])
    render json: @definition
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
      if @tree["children"][2]["children"] != []
        render json: @tree.to_json
      else
        render json: {"name" => "No Results"}
      end
    end
  end

  def add_topic
    @topic =  Topic.find_by(name: params[:topic]) || Topic.create(name: params[:topic])

    if current_user
      @journey = Journey.find(params[:journey])
      @journey.topics << @topic
      render json: @topic
    end
  end

  def ytdata
    # Set topic name
    @topic = Topic.find_by(name: params[:name] )
    # Find Youtube JSON object by topic name
    @video_data = youtube_json(@topic.name)
    # Render JSON object to /ytdata route for access later
    render json: @video_data
  end

  def update
    @topic = Topic.find(params[:id])
    @topic.save
    render json: @topic
  end

  private

  def get_random_word
    randomWord = HTTParty.get("http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key="+WORDNIK_API_KEY)
  end

end
