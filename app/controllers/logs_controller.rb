class LogsController < ApplicationController
  def index
  end

  # Creates new log instance
  def new
    @logs = Logs.new
  end

# Defines what new log is and saves
  def create
    @logs = Logs.new(logs_params)
    if @logs.save
        redirect_to '/logs/index'
        flash[:notice] = " Log added successfully! "
      else
        redirect_to '/logs/index'
    end
  end

# Deletes a product
  def destroy
    Logs.find(params[:id]).destroy
    flash[:delete] = " Log deleted successfully! "
    redirect_to '/logs/index'
  end

# Edits a product
  def edit
    @logs = Logs.find(params[:id])
  end

# Updates a product based on user input
  def update
    @logs = Logs.find(params[:id])
    if @logs.update(logs_params)
      redirect_to '/logs/index'
      flash[:notice] = " Log updated successfully! "
    else
      redirect_to '/logs/index'
    end
  end

  private

  # Defines params needed for product to be set up, also allows teacher_id to come through from hidden field
  def logs_params
    params.require(:logs).permit(:userid, :date_started, :date_ended, :period, :dehydration,
                                :exercise, :eye_strain, :lights, :sleep, :stress, :overeating,
                                :medicine, :medicine_helped, :weather, :alcohol, :chocolate)
  end

end
