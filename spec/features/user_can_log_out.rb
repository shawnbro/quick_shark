require 'spec_helper'

describe "a user can log out" do
  let(:user) { FactoryGirl.create(:user) }

  it "logs out" do
    login(user)
    click_link "Log out"
    expect(page).to have_content("Log in")
  end

  def login(user)
    visit root_path
    click_link "Log in"
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end