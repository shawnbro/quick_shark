require 'spec_helper'

describe "a user searches" do 
  let!(:user) { FactoryGirl.create(:user) }
  
  it "logs in, enters a search term, and clicks a search button" do 
    visit root_path
    click_link "Log in"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Log in!"
    visit root_path
    fill_in 'topic[topic]', with: "Sharks"
    find("#exploreB").click
    within ('#journey') do 
      expect(page).to have_content("Sharks")
    end
    expect(page).to have_css("svg")
    expect(page).to have_content("Sharks")
    expect(page).to have_content("Description")
    expect(page).to have_content("Definitions")
    expect(page).to have_content("Reverse Definitions")
    expect(page).to have_content("Pictures")
    expect(page).to have_content("Videos")
    expect(page).to have_content("Information")
    save_and_open_page
  end
end