import "./components.css";

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
                                <span>{wedstrijd.id}. </span>
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
            <div className="jokerContainer">
                <label htmlFor="joker">Gebruik joker?</label>
                <input type="checkbox" name="joker"/>
            </div>
            
            <div className="schiftingsContainer">
                <h4>Extra vraag:</h4>

                <label htmlFor="schiftingsvraag">Gok nummer 1 tot 10000 </label>
                <input type="number" min="0" name="schiftingsvraag" id="schiftingsvraag"/>
            </div>
            
        </>
    );
}