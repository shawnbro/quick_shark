require 'spec_helper'

describe Topic do
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
  it { should have_many(:tangents) }
  it { should have_many(:journeys).through(:tangents) }
end
