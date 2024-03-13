import "../app/css/Klassement.css"
export default function KlassementPannel({ use }) {
    // Check if user.users is an array
    if (!Array.isArray(use.users)) {
      return <div>Error: user.users is not an array</div>;
    }
  
    return (
      <>
        <h1>Klassement Speeldag {use.userid}</h1>
        <table>
          <thead>
            <tr>
              <th>Plaats</th>
              <th>Naam</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {use.users.map((user) => (
              <tr key={use.userid}>
                <td>{user.plaats}</td>
                <td>{user.naam}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <a className="a" href="">Show more</a>
        <hr />
        <h1>Klassement Seizoen </h1>
        <table>
          <thead>
            <tr>
              <th>Plaats</th>
              <th>Naam</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {use.users.map((user) => (
              <tr key={use.userid}>
                <td>{user.plaats}</td>
                <td>{user.naam}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <a className="a" href="">Show more</a>
      </>
    );
    
  }
