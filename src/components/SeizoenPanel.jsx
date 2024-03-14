export default function SeizoenPanel ({onClick, speeldagen}) {
    return (
        <>
            <h1>Seizoen 24-25</h1>
            <ul>
                {speeldagen.map(speeldag =>
                    <li key={speeldag.speeldagNr}><button onClick={() => onClick(speeldag.speeldagNr-1)}>Speeldag {speeldag.speeldagNr}</button></li>
                    )}
            </ul>
            
        </>
    );
}