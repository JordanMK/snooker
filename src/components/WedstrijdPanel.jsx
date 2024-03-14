export default function WedstrijdPanel ({speeldag}) {
    return (
        <>
            <h1>Speeldag {speeldag.speeldagNr}</h1>
            <table style={{width: "100%"}}>
                <tr>
                    <th>match</th>
                    <th>Winst ploeg 1</th>
                    <th>Gelijkspel</th>
                    <th>Winst ploeg 2</th>
                </tr>
                {speeldag.wedstrijden.map(wedstrijd =>
                        <tr key={wedstrijd.id}>
                            <td>
                                <span>{wedstrijd.thuis}</span>
                                <span> - </span>
                                <span>{wedstrijd.weg}</span>
                            </td>
                            <td>
                                <input type="checkbox"/>   
                            </td>
                            <td>
                                <input type="checkbox"/>   
                            </td>
                            <td>
                                <input type="checkbox"/>   
                            </td>
                                                      
                        </tr>
                )}
            </table>
            <span>Joker?</span><input type="checkbox"/>
            <h3>Schiftingsvraag:</h3>
            <p>Gok nummer 1 tot 10000</p>
            <input type="number" min="0"/>
        </>
    );
}