# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :movie_feeds,
  ecto_repos: [MovieFeeds.Repo]

# Configures the endpoint
config :movie_feeds, MovieFeeds.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "tdXiFjWxMKLO3jtzR+Znc9TWF+8a/2FhqdLqAXopGI3w+5u3CKeinP6QqA3bsJq/",
  render_errors: [view: MovieFeeds.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MovieFeeds.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
