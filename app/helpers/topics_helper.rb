
module TopicsHelper

  def get_wolfram_alpha(word)
    wolfram = []
    stuff = HTTParty.get('http://api.wolframalpha.com/v2/query?input='+word.gsub(" ", "%20").downcase+'&appid='+WOLFRAM_ALPHA_API_KEY)
    stuff["queryresult"]["pod"].each do |subpod|
      unless subpod["subpod"].class == Array
        wolfram.push(Hash["plaintext", subpod["subpod"]["plaintext"], "image", subpod["subpod"]["img"]])
      end
    end
    wolfram
  end

  # def get_wolfram_text(word)
  #   wolfram = []
  #   stuff = HTTParty.get('http://api.wolframalpha.com/v2/query?input='+word.gsub(" ", "%20").downcase+'&appid='+WOLFRAM_ALPHA_API_KEY)
  #   stuff["queryresult"]["pod"].each do |subpod|
  #     unless subpod["subpod"].class == Array
  #       wolfram.push(Hash["plaintext", subpod["subpod"]["plaintext"]])
  #     end
  #   end
  #   wolfram
  # end

  def get_word_associations(word)
      word_association = [{
        word: word,
        definitions: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word.gsub(" ", "%20").downcase+'/definitions?limit=200&includeRelated=true&useCanonical=true&includeTags=false&api_key='+WORDNIK_API_KEY).map,
        # etymologies: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/etymologies?api_key='+WORKNIK_API_KEY),
        word_associations: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word.gsub(" ", "%20").downcase+'/relatedWords?limit=2&useCanonical=true&limitPerRelationshipType=10&api_key='+WORDNIK_API_KEY).map,
        reverse_definitions: HTTParty.get('http://api.wordnik.com:80/v4/words.json/reverseDictionary?query='+word.gsub(" ", "%20").downcase+'&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=5&api_key='+WORDNIK_API_KEY)    
        }]
      word_association[0][:definitions].each do |definition|
        definition["word"] = "definition"
      end
    word_association
  end

  def find_topic_description(description)
    url = Addressable::URI.parse('https://www.googleapis.com/freebase/v1/search')
    url.query_values = {
      query: description,
      type: "/common/topic"
    }
    from_freebase = HTTParty.get(url, :format => :json)
    # fallback logic
    if from_freebase["result"].length == 0
      return "No description available"
    else
      wordTree = []
      mid = from_freebase["result"][0]["mid"]
      description = HTTParty.get("https://www.googleapis.com/freebase/v1/topic#{mid}?filter=/common/topic/description", :format => :json)
      description = description["property"]["/common/topic/description"]["values"][0]["value"]
    end
  end

  def find_photo(tags)
    result = flickr.photos.search(
      :tags => tags,
      :is_getty => true
      )
    # fallback logic
    if result.length == 0
      url = "http://www.yiyinglu.com/failwhale/images/Homer_the_New_Fail_Whale_by_edwheeler.jpg"
    else
      photo_id = result[rand(result.length)]["id"]
      photo_id_2 = result[rand(result.length)]["id"]
      photo_id_3 = result[rand(result.length)]["id"]
      photo_id_4 = result[rand(result.length)]["id"]
      info = flickr.photos.getInfo(:photo_id => photo_id)
      info2 = flickr.photos.getInfo(:photo_id => photo_id_2) 
      info3 = flickr.photos.getInfo(:photo_id => photo_id_3) 
      info4 = flickr.photos.getInfo(:photo_id => photo_id_4) 
      url = FlickRaw.url(info)
      url2 = FlickRaw.url(info2) 
      url3 = FlickRaw.url(info3) 
      url4 = FlickRaw.url(info4)
    end
    return url, url2, url3, url4
  end

# formatting the incoming results from wordnik to the proper nested format
  def tree_results(word_data)
    if word_data.include?("plaintext")
      tree_data = {"name"=> (word_data[0]["plaintext"]), "info" => "tst", "children" => []}
      word_data.each do |results|
        unless results["plaintext"].nil?
         tree_data["children"].push({"name" => results["plaintext"].split(" | ")[0], "children" => 
           (results["plaintext"].split("|").map do |word|
              Hash["name", word.split("|")]
           end)
         })
        end
      end
    else
      #get the data ready for d3 view
      tree_data = {"name"=> (@topic.name), "info" => "tst", "children" => []}
      
      word_data.each do |text, v|
        tree_data["children"].push({"name" => text.to_s, "children" => []})
      end
      
      tree_data["children"][0]["children"] << Hash["name", word_data[:word]]
      
      word_data[:definitions].each do |text|
        tree_data["children"][1]["children"] << Hash["name", text["text"]]
      end
      
      word_data[:word_associations].each do |text|
        tree_data["children"][2]["children"] << Hash["name", text["relationshipType"], "children", []]
      end     
      
      word_data[:reverse_definitions]["results"].each do |result| 
        tree_data["children"][3]["children"] << Hash["name", result["text"]]
      end

      i = 0
      word_data[:word_associations].each do |text|
        text["words"].each do |word|
          tree_data["children"][2]["children"][i]["children"] << Hash["name", word]
        end
        i+=1
      end
    end
    #reduce duplicates in word_association hash
    tree_data["children"][3]["children"].uniq!
    tree_data["children"][2]["children"].uniq!
    return tree_data
  end

  def get_youtube_vids(query)
    video_results = []
    full_results = HTTParty.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=#{query.gsub(" ", "%20")}&maxResults=10&key="+YOUTUBE_API_KEY)
    full_results["items"].each do |result|
      video_results.push([result["id"]["videoId"], result["snippet"]["title"]])
    end
    return video_results
  end

  def youtube_json(query)
    full_results = HTTParty.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=#{query.gsub(" ", "%20")}&maxResults=50&key="+YOUTUBE_API_KEY)
    return full_results
  end
end
