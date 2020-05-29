class LogsController < ApplicationController
  before_action :set_log, only: [:show, :edit, :update, :destroy]
  before_action :require_user, only: [:index]
  # GET /logs
  # GET /logs.json
  def index
    if customized == 0
      redirect_to '/log_customization/create'
    else
    end
  end

  # GET /logs/1
  # GET /logs/1.json
  def show
  end

  # GET /logs/new
  def new
    @log = Log.new
  end

  # GET /logs/1/edit
  def edit
  end

  # POST /logs
  # POST /logs.json
  def create
    @log = Log.new(log_params)

    respond_to do |format|
      if @log.save
        redirect_to '/graphs/index'
        flash[:notice] = " Your log has been added successfully. Check out your updated graphs below. "
      else
        format.html { render :new }
        format.json { render json: @log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /logs/1
  # PATCH/PUT /logs/1.json
  def update
    respond_to do |format|
      if @log.update(log_params)
        format.html { redirect_to @log, notice: 'Log was successfully updated.' }
        format.json { render :show, status: :ok, location: @log }
      else
        format.html { render :edit }
        format.json { render json: @log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /logs/1
  # DELETE /logs/1.json
  def destroy
    @log.destroy
    respond_to do |format|
      format.html { redirect_to logs_url, notice: 'Log was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_log
      @log = Log.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def logs_params
      params.require(:logs).permit(:userid, :date_started, :date_ended, :period, :dehydration,
                                  :exercise, :eye_strain, :lights, :sleep, :stress, :overeating,
                                  :medicine, :medicine_helped, :weather, :alcohol, :chocolate, :custom1, :custom2, :custom3, :custom4, :custom5)
    end
end
