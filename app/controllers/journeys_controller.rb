class JourneysController < ApplicationController

  def show
    @journey = Journey.find(params[:id])
    if session[:user_id].nil?
      render nothing: true, status: 401
    elsif session[:user_id] = current_user.id
      render(:show)      
    end
  end

end