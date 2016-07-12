defmodule MovieFeeds.UserTest do
  use MovieFeeds.ModelCase

  alias MovieFeeds.User

  @valid_attrs %{enabled: true, locked: true, name: "some content", password_hash: "some content", password_last_changed: %{day: 17, month: 4, year: 2010}, past_passwords: [], username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
