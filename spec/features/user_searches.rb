require 'spec_helper'

describe "a user searches" do 
  let!(:user) { FactoryGirl.create(:user) }
  
  it "logs in, enters a search term, and clicks a search button" do 
    visit root_path
    click_link "Log in"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Log in!"
    fill_in 'topic[topic]', with: "Sharks"
    click_button 'Submit'
    save_and_open_page
    within ('#journey') do 
      expect(page).to have_content("Sharks")
    end

    expect(page).to have_content("Sharks")
    expect(page).to have_content("fish")

  end
end