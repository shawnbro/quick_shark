require 'spec_helper'

describe 'user sees nav options around perimeter when looking at a topic', :js => true do 

  it 'sees nav options' do 
    visit root_path
    fill_in 'topic[topic]', with: "clarity"
    find("#exploreB").click

  end
end