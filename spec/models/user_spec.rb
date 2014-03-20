require 'spec_helper'

describe User do 
before do
  FactoryGirl.create(:user, password: "test", password_confirmation: "test")
end
  it { should have_many(:journeys) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_uniqueness_of(:email) }

end
