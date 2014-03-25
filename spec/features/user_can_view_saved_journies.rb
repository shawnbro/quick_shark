require 'spec_helper'
require 'pry'

describe "a user views a journey", :js => true do 
  let!(:user){ FactoryGirl.create(:user) }

  it "views a journey" do

  journey = Journey.create(title: "sup" , user: user)
  topic1 = Topic.create(name: "hey") 
  topic1.journeys << journey
  topic2 = Topic.create(name: "yes") 
  topic2.journeys << journey
  topic3 = Topic.create(name: "you") 
  topic3.journeys << journey

    login(user)
    save_and_open_page
    click_link journey.title

    within ".starting-word" do
      expect(page).to have_content(topic1.name)
    end
    
    within ".ending-word" do
      expect(page).to have_content(topic3.name)
    end
    
    within ".tangent-number" do
      expect(page).to have_content("3")
    end

    within "#bar-chart" do
      expect(page).to have_content(topic1.name)
      expect(page).to have_content(topic2.name)
      expect(page).to have_content(topic3.name)
    end
  end


  def login(user)
    visit root_path
    click_link "Log in"
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end