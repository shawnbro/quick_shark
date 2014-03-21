require 'spec_helper'

describe "wolfram alpha results" do 
  it "shows wolfram alpha search results" do 
    visit root_path
    fill_in 'topic[topic]', with: "pikachu"
    click_button 'Submit'
    save_and_open_page
    within '#wolfram' do 
      expect(page).to have_content("clown is a rude and vulgar fool")
    end
  end
end
