require 'spec_helper'

describe "a user searches" do 
  it "enters a search term and clicks a search button" do 

    visit root_path
    save_and_open_page
    fill_in 'search[search]', with: "Sharks"
    click_button 'Search'

    expect(page).to have_content("Sharks")

  end
end