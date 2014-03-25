
module TopicsHelper

  def get_wolfram_alpha(word)
    # Initial API call, results passed into an array of a hash
    wolfram = []
    stuff = HTTParty.get('http://api.wolframalpha.com/v2/query?input='+word.gsub(" ", "%20").downcase+'&appid='+WOLFRAM_ALPHA_API_KEY)
    stuff["queryresult"]["pod"].each do |subpod|
      unless subpod["subpod"].class == Array
        wolfram.push(Hash["plaintext", subpod["subpod"]["plaintext"], "image", subpod["subpod"]["img"]])
      end
    end
    wolfram
  end

  def get_word_associations(word)
    # Initial API call, results passed into an array of a hash
    word_association = [{
      word: word,
      # HTTP get returns JSON objects then pushed into arrays
      definitions: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word.gsub(" ", "%20").downcase+'/definitions?limit=200&includeRelated=true&useCanonical=true&includeTags=false&api_key='+WORDNIK_API_KEY).map,
      word_associations: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word.gsub(" ", "%20").downcase+'/relatedWords?limit=2&useCanonical=true&limitPerRelationshipType=10&api_key='+WORDNIK_API_KEY).map,
      reverse_definitions: HTTParty.get('http://api.wordnik.com:80/v4/words.json/reverseDictionary?query='+word.gsub(" ", "%20").downcase+'&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=5&api_key='+WORDNIK_API_KEY)
      }]
    # Setting definitions as word parameters for word tree
    word_association[0][:definitions].each do |definition|
      definition["word"] = "definition"
    end
  word_association
  end

  def find_topic_description(description)
    # Initial API call
    url = Addressable::URI.parse('https://www.googleapis.com/freebase/v1/search')

    # Set the parameters of the API call
    url.query_values = {
      query: description,
      type: "/common/topic"
    }

    # Call again to return a JSON object for the selected query
    from_freebase = HTTParty.get(url, :format => :json)
    # fallback logic
    if from_freebase["result"].length == 0
      return "No description available"
    else
      # Parsing out the description of the query
      wordTree = []
      mid = from_freebase["result"][0]["mid"]
      description = HTTParty.get("https://www.googleapis.com/freebase/v1/topic#{mid}?filter=/common/topic/description", :format => :json)
      description = description["property"]["/common/topic/description"]["values"][0]["value"]
    end
  end

  def find_photo(tags)
    # Inital Flickr API call, "tags" is the search query
    result = flickr.photos.search(
      :tags => tags,
      # Parameter that returns Gettyimages.com quality pictues
      :is_getty => true
      )
    # If there are no pictues, you get an "error" image
    if result.length == 0
      url = []
      4.times do
        url = url.push("http://www.yiyinglu.com/failwhale/images/Homer_the_New_Fail_Whale_by_edwheeler.jpg")
      end
    else
      # pick 4 random photo id's
      photo_array = []
      4.times do
        photo_array = photo_array.push(result[rand(result.length)]["id"])
      end
      # plug 4 random id's in to get info back
      info_array = photo_array.map do |id|
       flickr.photos.getInfo(:photo_id => id)
      end
      # plug info into FlickRaw to extract url
      url = info_array.map do |info|
        FlickRaw.url(info)
      end
    end
    return url
  end

# formatting the incoming results from wordnik to the proper nested format
  def tree_results(word_data)
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
    if word_data[:reverse_definitions]["results"].nil? 
      tree_data["children"][3]["children"] << nil
    else
      word_data[:reverse_definitions]["results"].each do |result| 
        tree_data["children"][3]["children"] << Hash["name", result["text"]]
      end
    end
    i = 0
    word_data[:word_associations].each do |text|
      text["words"].each do |word|
        tree_data["children"][2]["children"][i]["children"] << Hash["name", word]
      end
      i+=1
    end
    #reduce duplicates in word_association hash
    tree_data["children"][3]["children"].uniq!
    tree_data["children"][2]["children"].uniq!
    return tree_data
  end

  def get_youtube_vids(query)
    video_results = []
    # Get results from Youtube API in JSON format
    full_results = HTTParty.get(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=#{query.gsub(" ", "%20")}&maxResults=10&key="+YOUTUBE_API_KEY
      )
    # Push the video ID and title of each vide in an array of arrays
    full_results["items"].each do |result|
      video_results.push([result["id"]["videoId"], result["snippet"]["title"]])
    end
    return video_results
  end

  # Same method as above, except leaving the JSON object as is
  # Used to create an API to access the data later
  def youtube_json(query)
    full_results = HTTParty.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=#{query.gsub(" ", "%20")}&maxResults=50&key="+YOUTUBE_API_KEY)
    return full_results
  end
end
