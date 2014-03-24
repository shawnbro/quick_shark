class Topic < ActiveRecord::Base
  has_many :tangents
  has_many :journeys, through: :tangents
  
  def to_param
    name
  end
  
end
