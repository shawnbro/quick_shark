FactoryGirl.define do
  factory :topic do
    name { Faker::Company.bs.split(' ')[0] }
    association :journey
  end
end