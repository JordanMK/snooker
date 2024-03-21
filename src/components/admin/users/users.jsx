export default function Users() {
  let usersData = {
    users: [
      {
        userid: 1,
        users: [
          { plaats: 1, naam: "Mateo Gheeraert", score: 320, betaald: true },
          { plaats: 2, naam: "Dirk Hostens", score: 250, betaald: false },
          { plaats: 3, naam: "Joshua Madd", score: 245, betaald: false },
          { plaats: 4, naam: "Tom Dhoine", score: 230, betaald: true },
          { plaats: 5, naam: "Thijs Geeraert", score: 200, betaald: false },
          { plaats: 6, naam: "Cedric Depré", score: 186, betaald: false },
          { plaats: 7, naam: "Abdu Tchop", score: 162, betaald: true },
          { plaats: 8, naam: "Robin Vandenbroucke", score: 143, betaald: true },
          { plaats: 9, naam: "Noah Van Steenlandt", score: 127, betaald: true },
          { plaats: 10, naam: "Justas Valutis", score: 109, betaald: true },
          { plaats: 11, naam: "Daniil Samsonov", score: 108, betaald: true },
          { plaats: 12, naam: "Jelle Gemin", score: 105, betaald: true },
        ],
      },
    ],
  };
  return (
    <>
      <div className="users">
        <h2>Users</h2>
        {usersData.users.map((user) => (
          <div key={user.userid}>
            {user.users.map((u) => (
              <div
                key={u.plaats}
                style={{ backgroundColor: u.betaald ? "lightgreen" : "red" }}
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
                    <label htmlFor="user.userid">Betaald</label>
                  </span>
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
