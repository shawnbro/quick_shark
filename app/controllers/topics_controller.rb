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
  end

  def data
    @topic = Topic.find_by(name: params[:name])
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

end