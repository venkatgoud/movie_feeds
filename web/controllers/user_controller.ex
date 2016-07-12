defmodule MovieFeeds.UserController do
  use MovieFeeds.Web, :controller

  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

  alias MovieFeeds.User

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.create_changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", user_path(conn, :show, user))
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(MovieFeeds.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end 

  # This is for regular users to change their password
  def update(conn, %{"id" => id, "old_pass" => old_pass, "new_pass" => password}) do
    user = Repo.get!(User, id)     
    cond do
      user && checkpw(old_pass, user.password_hash) ->
        changeset = User.password_changeset(user, %{"password": password})
        case Repo.update(changeset) do
          {:ok, user} ->
            render(conn, "show.json", user: user)
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(MovieFeeds.ChangesetView, "error.json", changeset: changeset)
        end
      user ->
          conn
          |> put_status(:unprocessable_entity) 
          |> render(MovieFeeds.ChangesetView, "error.json")
      true ->
        dummy_checkpw()
        {:error, :not_found, conn}  
    end
    
  end

  # This is for managers and above to update other user's passwords
  def update(conn, %{"id" => id, "new_pass" => password}) do
    user = Repo.get!(User, id)
    changeset = User.password_changeset(user, password)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(MovieFeeds.ChangesetView, "error.json", changeset: changeset)
    end
  end       

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(MovieFeeds.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end
end
