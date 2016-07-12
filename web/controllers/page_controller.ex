defmodule MovieFeeds.PageController do
  use MovieFeeds.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
