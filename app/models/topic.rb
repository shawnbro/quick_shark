class Topic < ActiveRecord::Base
  belongs_to :journey

  def to_param
    name
  end
end
