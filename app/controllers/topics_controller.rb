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
    @journey = @topic.journey  
    @word_association = get_word_associations(@topic[:name])
    @description = find_topic_description(@topic[:name])
    @photo = find_photo(@topic[:name])
    @wolfram = get_wolfram_alpha(@topic[:name])
  end

  def data
    @topic = Topic.find_by(name: params[:word] )
    @word_association = get_word_associations(@topic[:name])
    array_results = @word_association[:word_associations]
    @raw_tree_data = tree_results(array_results)
    @tree_data = @raw_tree_data.to_json
    render json: @tree_data
  end

private 

  def tree_results(array_results)
    tree_data = {"name"=> (@topic[:name]), "info" => "tst", "children" => [
      ]}
    array_results.each do |results|
      tree_data["children"].push({"name" => results["relationshipType"], "children" => 
        (results["words"].map do |word|
           Hash["name", word]
        end)
      })
    end
    return tree_data
  end

  def get_random_word
    randomWord = HTTParty.get("http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key="+WORDNIK_API_KEY)
  end

end