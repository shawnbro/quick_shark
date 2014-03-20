require 'spec_helper'

describe "a user searches" do 
  it "enters a search term and clicks a search button" do 

    visit root_path
    fill_in 'topic[topic]', with: "Sharks"
    click_button 'Submit'
    expect(page).to have_content("Sharks")
    expect(page).to have_content("fish")

  end
end