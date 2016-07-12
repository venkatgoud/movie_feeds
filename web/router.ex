defmodule MovieFeeds.Router do
  use MovieFeeds.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  scope "/api", MovieFeeds do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]  
  end

  scope "/", MovieFeeds do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/*path", PageController, :index
  end
  
end
