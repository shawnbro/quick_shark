require 'spec_helper'

describe Tangent do
  it { should belong_to(:topic) }
  it { should belong_to(:journey) }
  it { should validate_presence_of(:topic) }
  it { should validate_presence_of(:journey) }
  it { should validate_presence_of(:counter).on(:update) }
end