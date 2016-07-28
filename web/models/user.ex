defmodule MovieFeeds.User do
  use MovieFeeds.Web, :model   

  schema "users" do
    field :name, :string
    field :username, :string
    # roles : user, operator, manager, admin
    field :user_type, :string, default: "user"
    field :password, :string, virtual: true
    field :password_hash, :string
    field :enabled, :boolean, default: true
    field :locked, :boolean, default: false
    field :past_passwords, {:array, :string}
    field :password_last_changed, Ecto.DateTime

    timestamps()
  end

  @doc """
  Builds a changeset based on the `model` and `params`.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:name, :username,:user_type])
    |> validate_required([:name, :username])
    |> validate_length(:name, min: 4, max: 100)
    |> validate_length(:username, min: 4, max: 100)
    |> unique_constraint(:username)  
  end

  def password_changeset(model, params) do
    model     
    |> cast(params, [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_pass_hash()     
  end

  def create_changeset(model, params) do
    model
    |> changeset(params)
    |> password_changeset(params) 
  end

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        changeset
        |> put_change(:password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
        |> put_change(:password_last_changed, Ecto.DateTime.utc)
      _ ->
        changeset        
    end
  end
end
