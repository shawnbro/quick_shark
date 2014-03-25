require 'spec_helper'

describe Journey do
  it { should belong_to(:user) }
  it { should have_many(:tangents) }
  it { should have_many(:topics).through(:tangents) }
end
