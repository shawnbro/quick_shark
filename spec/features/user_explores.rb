require 'spec_helper'

describe 'a user explores' do 
  it "clicks the explore button which randomly generates a word/graph" do 
    visit root_path
    click_button "Explore"
    page.should have_css('div#viz')
  end
end