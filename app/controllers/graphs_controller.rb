class GraphsController < ApplicationController

# Require user login before these pages can be viewed #
before_action :require_user, only: [:index]

  def index
  end

  def editlogs
  end

  def show
  end

end
