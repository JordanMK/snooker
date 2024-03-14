export default function WedstrijdPanel ({speeldag}) {
    return (
        <>
            <h1>Speeldag {speeldag.speeldagNr}</h1>
            <ul>
                {speeldag.wedstrijden.map(wedstrijd =>
                        <li key={wedstrijd.id}>
                            <span>{wedstrijd.thuis}</span>
                            <span> VS </span>
                            <span>{wedstrijd.weg}</span>
                            <span> --- </span>
                            <input type="checkbox"/>
                            <span> VS </span>
                            <input type="checkbox"/>
                        </li>
                )}
            </ul>
            <span>Joker?</span><input type="checkbox"/>
            <h3>Schiftingsvraag:</h3>
            <p>Gok nummer 1 tot 10000</p>
            <input type="number" min="0"/>
        </>
    );
}