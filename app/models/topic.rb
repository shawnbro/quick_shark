class Topic < ActiveRecord::Base
  has_many :tangents
  has_many :journeys, through: :tangents
  validates :name, presence: true, uniqueness: true
  
  def to_param
    name
  end
  
end
