require 'spec_helper'

describe Topic do
  it { should belong_to(:journey) }

end
