require 'spec_helper'

describe 'user sees nav options around perimeter when looking at a topic', :js => true do 

  it 'sees nav options' do 
    visit root_path
    fill_in 'topic[topic]', with: "clarity"
    find("#exploreB").click
    within("div#side-instructions") do 
      expect( page ).to have_content("Click on a word...Push the arrow keys...Click and drag...Scroll to zoom.")
    end
  end
end