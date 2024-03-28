export default function SeizoenPanel ({onClick, speeldagen}) {
    console.log('speeldagen',speeldagen);
    return (
        <>
            <h1 id='seizoenTitle'>Seizoen 24-25</h1>
            <ul id='speeldagenList'>
                {speeldagen.map(speeldag =>
                    <li key={speeldag.speeldagNr}><button onClick={() => onClick(speeldag.speeldagNr-1)}>Speeldag {speeldag.speeldagNr}</button></li>
                    )}
            </ul>
        </>
    );
}