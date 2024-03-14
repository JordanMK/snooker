import BaseLayout from "@/layout/BaseLayout";
import "../../css/style.css";

// Define the Users component separately
const Users = ({ users }) => {
  return (
    <div className="users">
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.userid}>
          {user.users.map((u) => (
            <div
              key={u.plaats}
              style={{ backgroundColor: u.betaald ? "green" : "red" }}
              className="user"
            >
              <p>
                {u.naam} Score: {u.score}
                <span className="checkbox">
                  <input
                    type="checkbox"
                    name={user.userid}
                    defaultChecked={u.betaald}
                  />
                  <label for="user.userid">Betaald</label>
                </span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function UsersPage() {
  return (
    <BaseLayout>
      <Users users={user} />
    </BaseLayout>
  );
}
