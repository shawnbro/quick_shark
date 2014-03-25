require 'spec_helper'

describe "enter a search term which returns no results and have it display no response correctly" do 

  it "returns no results for a search with no results" do 
    visit root_path
    fill_in 'topic[topic]', with: "The Simpsons"
    click_button("button#exploreB")
    expect(page).to have_content("Your search returned no results.  Try hitting the arrow buttons on your keyboard to find out more or click on 'New Journey' to try again...")
    save_and_open_page
  end
end