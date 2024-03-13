import "../app/css/Klassement.css"

export default function KlassementPannel({user}) {
    return (
        <>
            <h1>Klassement</h1>
            <table>
                <th>Plaats</th>
                <th>Naam</th>
                <th>Score</th>
                {user.userse.map(users =>
                    <td>{users}</td>
                )}
            </table>
        </>
    );
}