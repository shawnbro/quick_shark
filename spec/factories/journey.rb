FactoryGirl.define do
  factory :journey do
    title { Faker::Company.bs.split(' ')[0] }
    association :user
  end
end