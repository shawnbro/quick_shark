class JourneysController < ApplicationController
  def show
    @journey = Journey.find(params[:id])
  end

end