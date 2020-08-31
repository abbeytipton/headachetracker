class LogCustomizationController < ApplicationController

  before_action :require_user, only: [:new]

  def index
    if customized == 1
      redirect_to '/logs/index'
    else
    end
  end

  def show
  end

  def edit
      @logcustomization = LogCustomization.find(params[:id])
  end

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
        redirect_to '/graphs/index'
    end
  end

  def update
    @logcustomization = LogCustomization.find(params[:id])
    if params[:log_customization][:trigger1] == "1" && params[:log_customization][:trigger1Name].blank?
      || params[:log_customization][:trigger2] == "1" && params[:log_customization][:trigger2Name].blank?
    || params[:log_customization][:trigger3] == "1" && params[:log_customization][:trigger3Name].blank?
    || params[:log_customization][:trigger4] == "1" && params[:log_customization][:trigger4Name].blank?
    || params[:log_customization][:trigger5] == "1" && params[:log_customization][:trigger5Name].blank?
    redirect_to '/graphs/index'
    flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
  else
    if @logcustomization.update(logcustomization_params)
      redirect_to '/graphs/index'
      flash[:notice] = " Log customizations updated successfully! "
    else
      redirect_to '/graphs/index'


end
      end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @logcustomization.destroy
    respond_to do |format|
      redirect_to '/logs/index'
    end
  end

  private

  # Defines params needed for product to be set up, also allows teacher_id to come through from hidden field
  def logcustomization_params
    params.require(:log_customization).permit(:userID, :trigger1, :trigger1Name, :trigger2, :trigger2Name,
                                :trigger3, :trigger3Name, :trigger4, :trigger4Name, :trigger5, :trigger5Name,
                                :trigger6, :trigger6Name, :trigger7, :trigger7Name, :trigger8, :trigger8Name, :trigger9,
                                :trigger9Name, :trigger10, :trigger10Name, :alcohol, :overeating, :stress, :sleep,
                                :lights, :eyestrain, :exercise, :period, :chocolate, :dehydrated, :medicine, :boolean)
  end

end
