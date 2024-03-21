import "./components.css";

export default function WedstrijdPanel ({speeldag}) {
    return (
        <>
            <p className="speeldagTitel">Speeldag {speeldag.speeldagNr}</p>
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
            <div className="jokerContainer checkbox-wrapper-13">
                <label htmlFor="c1-13">Gebruik joker?</label>
                <input type="checkbox" name="joker" id="c1-13"/>
                
            </div>
            
            <div className="schiftingsContainer">
                <h4>Schiftingsvraag:</h4>

                <label htmlFor="schiftingsvraag">Gok nummer 1 tot 500: </label>
                <input type="number" min="1" max="500" name="schiftingsvraag" id="schiftingsvraag"/>
            </div>
            
        </>
    );
}