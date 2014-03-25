require 'spec_helper'

describe 'a user explores' do 
  it "clicks the random button which randomly generates a word/graph" do 
    visit root_path
    find('#randomB').click
    page.should have_css('div#viz')
  end
end