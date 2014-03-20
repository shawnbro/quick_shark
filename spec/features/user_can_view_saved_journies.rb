require 'spec_helper'
require 'pry'

describe "a user views a journey" do 
  it "views a journey" do

  journey = FactoryGirl.create(:journey)
  topic1 = FactoryGirl.create(:topic, journey: journey)
  topic2 = FactoryGirl.create(:topic, journey: journey)
  topic3 = FactoryGirl.create(:topic, journey: journey)


    visit journey_path(journey.id)
    within ".starting-word" do
      expect(page).to have_content(topic1.name)
    end
    within ".ending-word" do
      expect(page).to have_content(topic3.name)
    end
    within ".tangent-number" do
      expect(page).to have_content("3")

    end
  end
end