class JourneysController < ApplicationController
  before_action :load_journey, only: [:show, :destroy, :journey_data]


  def show
    if session[:user_id].nil?
      render nothing: true, status: 401
    elsif session[:user_id] = current_user.id
      render(:show)      
    end

    # respond_to do |format|
    #   format.html { render (:show) }
    #   format.json { render json: @journey }
    # end
  end

  def destroy
    @journey.destroy
    redirect_to user_path(session[:user_id])
  end

  def journey_data
    render json: @journey.topics.order('created_at')
  end

  private
  def load_journey
    return @journey = Journey.find(params[:id])
  end

end