class User < ActiveRecord::Base
  has_many :journeys
  validates :email, presence: :true, uniqueness: :true 
  has_secure_password
  validates :password_digest, presence: :true
end
