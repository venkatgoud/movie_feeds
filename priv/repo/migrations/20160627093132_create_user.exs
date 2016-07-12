defmodule MovieFeeds.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :username, :string, null: false
      # roles : user, operator, manager, admin
      add :user_type, :string, default: "user", null: false
      add :password_hash, :string, null: false
      add :enabled, :boolean, default: false, null: false
      add :locked, :boolean, default: false, null: false
      add :past_passwords, {:array, :string}
      add :password_last_changed, :datetime, null: false

      timestamps()
    end

    create unique_index(:users, [:username])

  end
end
