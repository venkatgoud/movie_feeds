defmodule MovieFeeds.UserView do
  use MovieFeeds.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, MovieFeeds.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, MovieFeeds.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, name: user.name, username: user.username, 
     user_type: user.user_type, enabled: user.enabled, 
     locked: user.locked, inserted_at: user.inserted_at, updated_at: user.updated_at}
  end
end
