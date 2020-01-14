require 'test_helper'

class LogCustomizationControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get log_customization_new_url
    assert_response :success
  end

  test "should get create" do
    get log_customization_create_url
    assert_response :success
  end

end
