module TopicsHelper
  def get_word_associations(word) 
      word_association = {
        word: word,
        definitions: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/definitions?limit=200&includeRelated=true&useCanonical=true&includeTags=false&api_key='+WORDNIK_API_KEY),
        # etymologies: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/etymologies?api_key='+WORKNIK_API_KEY),
        word_associations: HTTParty.get('http://api.wordnik.com:80/v4/word.json/'+word+'/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key='+WORDNIK_API_KEY),
        reverse_definitions: HTTParty.get('http://api.wordnik.com:80/v4/words.json/reverseDictionary?query='+word+'&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=200&api_key='+WORDNIK_API_KEY)    
      }
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
end