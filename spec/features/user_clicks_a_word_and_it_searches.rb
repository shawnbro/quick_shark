require 'spec_helper'

describe "click-search", :js => true do
  
  let!(:user) { FactoryGirl.create(:user) }

  it "initializes a secondary search when clicked, and saves a new topic, associates new topic with user journey" do 
    
    visit root_path
    click_link "Log in"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Log in!"
    click_link "New Journey"
    fill_in 'topic[topic]', with: "clown"
    find('#exploreB').click
    expect(page).to have_content("buffoon")
    expect(page).to have_content("clown")
  end
end