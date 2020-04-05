class LogCustomizationController < ApplicationController
  # Creates new log instance
  def new
    @logcustomization = LogCustomization.new
  end

# Defines what new log is and saves
  def create
    @logcustomization = LogCustomization.new(logcustomization_params)
    if @logcustomization.save
        redirect_to '/logs/index'
      else
        redirect_to '/log_customization/create'
    end
  end

  private

  # Defines params needed for product to be set up, also allows teacher_id to come through from hidden field
  def logcustomizations_params
    params.require(:logcustomization).permit(:userID, :trigger1, :trigger1Name, :trigger2, :trigger2Name,
                                :trigger3, :trigger3Name, :trigger4, :trigger4Name, :trigger5, :trigger5Name,
                                :trigger6, :trigger6Name, :trigger7, :trigger7Name, :trigger8, :trigger8Name, :trigger9,
                                :trigger9Name, :trigger10, :trigger10Name, :alcohol, :overeating, :stress, :sleep,
                                :lights, :eyestrain, :exercise, :period, :chocolate, :dehydrated, :medicine)
  end

end
