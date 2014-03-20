require 'spec_helper'

describe "a user can log in" do
  let(:user) { FactoryGirl.create(:user) }

  it "logs in" do
    login(user)
    expect(page).to have_content "#{user.first_name}"
  end

  def login(user)
    visit root_path
    click_link "Log in"
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end