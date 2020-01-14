require 'test_helper'

class LogCustomizationControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get log_customization_controller_new_url
    assert_response :success
  end

  test "should get create" do
    get log_customization_controller_create_url
    assert_response :success
  end

end
