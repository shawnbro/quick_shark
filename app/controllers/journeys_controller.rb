class JourneysController < ApplicationController
  before_action :load_journey


  def show
    respond_to do |format|
      format.html { render (:show) }
      format.json { render json: journey_json }
    end
  end

  def destroy
    @journey.destroy
    redirect_to user_path(session[:user_id])
  end

  def update
    @journey.touch
    render json: @journey
  end

  private

  def load_journey
    return @journey = Journey.find(params[:id])
  end

  def journey_json
    @journey.tangents.order('created_at').map do |t|
      { name: t.topic.name, counter: t.duration, id: t.id }
    end
  end

end