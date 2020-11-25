class LogCustomizationController < ApplicationController

# Requires user login before allowing access to these pages #
  before_action :require_user, only: [:new]

# If the user has already customized their logs, then they need to be redirected to the logs index page #
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

  # Creates new log customization instance
  def new
    @logcustomization = LogCustomization.new
  end

  # Defines what new log customization is and saves
  def create
    @logcustomization = LogCustomization.new(logcustomization_params)
    @logcustomization = LogCustomization.find(params[:id])
    # Check that the user didn't check any boxes for custom triggers and then not enter a name for them #
    if
      params[:log_customization][:trigger1] == "1" && params[:log_customization][:trigger1Name].blank?
      redirect_to '/logs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger2] == "1" && params[:log_customization][:trigger2Name].blank?
      redirect_to '/logs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger3] == "1" && params[:log_customization][:trigger3Name].blank?
      redirect_to '/logs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger4] == "1" && params[:log_customization][:trigger4Name].blank?
      redirect_to '/logs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger5] == "1" && params[:log_customization][:trigger5Name].blank?
      redirect_to '/logs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    else
      if @logcustomization.save
        redirect_to '/logs/index'
      else
        redirect_to '/logs/index'
      end
    end
  end

# Update customizations #
  def update
    @logcustomization = LogCustomization.find(params[:id])
    # Check that the user didn't check any boxes for custom triggers and then not enter a name for them #
    if
      params[:log_customization][:trigger1] == "1" && params[:log_customization][:trigger1Name].blank?
      redirect_to '/graphs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger2] == "1" && params[:log_customization][:trigger2Name].blank?
      redirect_to '/graphs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger3] == "1" && params[:log_customization][:trigger3Name].blank?
      redirect_to '/graphs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger4] == "1" && params[:log_customization][:trigger4Name].blank?
      redirect_to '/graphs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    elsif
      params[:log_customization][:trigger5] == "1" && params[:log_customization][:trigger5Name].blank?
      redirect_to '/graphs/index'
      flash[:notice] = "You checked a box for a custom trigger but did not name it. Your changes have not been saved. Please try again."
      return
    else
      if @logcustomization.update(logcustomization_params)
        redirect_to '/graphs/index'
        flash[:notice] = " Log customizations updated successfully! "
      else
        redirect_to '/graphs/index'
      end
    end
  end

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
