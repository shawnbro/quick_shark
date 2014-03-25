require 'spec_helper'

describe "enter a search term which returns no results and have it display no response correctly" do 

  it "returns no results for a search with no results", :js => true do 
    visit root_path
    fill_in 'topic[topic]', with: "The Simpsons"
    find("#exploreB").click
    Capybara.current_driver = :webkit
    within("p#no-results") do 
      expect(page).to have_content("Your search returned no results.  Try hitting the arrow buttons () on your keyboard to find out more or click on 'New Journey' to try again...")
    end
  end
end
