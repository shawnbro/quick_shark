
module TopicsHelper

  def get_word_associations(word)
      word_association = {
        word: word,
        definitions: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/definitions?limit=200&includeRelated=true&useCanonical=true&includeTags=false&api_key='+WORDNIK_API_KEY),
        # etymologies: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/etymologies?api_key='+WORKNIK_API_KEY),
        word_associations: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key='+WORDNIK_API_KEY),
        reverse_definitions: HTTParty.get('http://api.wordnik.com:80/v4/words.json/reverseDictionary?query='+word+'&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=200&api_key='+WORDNIK_API_KEY)    

      word_association[:definitions].each do |definition|
        definition.delete("textProns")
        definition.delete("exampleUses")
        definition.delete("labels")
        definition.delete("attributionText")
        definition.delete("relatedWords")
        definition.delete("citations")
        definition.delete("sequence")
        definition.delete("score")
        definition.delete("partOfSpeech")
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
      mid = from_freebase["result"][0]["mid"]
      description = HTTParty.get("https://www.googleapis.com/freebase/v1/topic#{mid}?filter=/common/topic/description", :format => :json)

      return description["property"]["/common/topic/description"]["values"][0]["value"]
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
      photo_id = result[0]["id"]
      info = flickr.photos.getInfo(:photo_id => photo_id)
      url = FlickRaw.url(info)
    end

    return url
  end

end
