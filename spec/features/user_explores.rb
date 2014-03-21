require 'spec_helper'

describe 'a user explores' do 
  it "clicks the explore button which randomly generates a word/graph" do 
    visit root_path
    save_and_open_page
    click_button "Explore"
    expect(page).to have_content('div#viz')
  end
end