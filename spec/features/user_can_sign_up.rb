require 'spec_helper'

describe "a user can sign up" do
  let(:user) { FactoryGirl.build(:user) }

  it "will sign up a user" do
    visit root_path
    click_link "Create Account"
    fill_in "user_first_name", with: user.first_name
    fill_in "user_last_name", with: user.last_name
    fill_in "user_email", with: user.email 
    fill_in "user_password", with: user.password
    fill_in "user_password_confirmation", with: user.password
    click_button "Join"

    expect(page).to have_content "#{user.first_name}"
  end
  
end