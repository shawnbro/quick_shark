require 'spec_helper'

describe "click-search" do 
  
  let!(:user) { FactoryGirl.create(:user) }

  it "initializes a secondary search when clicked, and saves a new topic, associates new topic with user journey" do 
    
    
    visit root_path
    click_link "Log in"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Log in!"
    fill_in 'topic[topic]', with: "clown"
    click_button 'Submit'
    expect(page).to have_content("buffoon")
    within '#journey-topics' do 
      expect(page).to have_content("clown")
    end
    click_link("buffoon")


  end
end