# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_10_164532) do

  create_table "log_customizations", force: :cascade do |t|
    t.integer "userID"
    t.boolean "trigger1"
    t.string "trigger1Name"
    t.boolean "trigger2"
    t.string "trigger2Name"
    t.boolean "trigger3"
    t.string "trigger3Name"
    t.boolean "trigger4"
    t.string "trigger4Name"
    t.boolean "trigger5"
    t.string "trigger5Name"
    t.string "trigger6"
    t.string "boolean"
    t.string "trigger6Name"
    t.boolean "trigger7"
    t.string "trigger7Name"
    t.boolean "trigger8"
    t.string "trigger8Name"
    t.boolean "trigger9"
    t.string "trigger9Name"
    t.boolean "trigger10"
    t.string "trigger10Name"
    t.boolean "alcohol"
    t.boolean "overeating"
    t.boolean "stress"
    t.boolean "sleep"
    t.boolean "lights"
    t.boolean "eyestrain"
    t.boolean "exercise"
    t.boolean "period"
    t.boolean "chocolate"
    t.boolean "dehydrated"
    t.boolean "medicine"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "logs", force: :cascade do |t|
    t.integer "userid"
    t.datetime "date_started"
    t.datetime "date_ended"
    t.boolean "period"
    t.boolean "dehydration"
    t.boolean "exercise"
    t.boolean "eye_strain"
    t.boolean "lights"
    t.boolean "sleep"
    t.boolean "stress"
    t.boolean "overeating"
    t.string "medicine"
    t.boolean "medicine_helped"
    t.boolean "weather"
    t.boolean "alcohol"
    t.boolean "chocolate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "custom1"
    t.boolean "custom2"
    t.boolean "custom3"
    t.boolean "custom4"
    t.boolean "custom5"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
