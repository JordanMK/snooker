export default function SeizoenPanel ({onClick, speeldagen}) {
    console.log('speeldagen',speeldagen);
    return (
        <>
            <h1 id='seizoenTitle'>Seizoen 24-25</h1>
            <ul id='speeldagenList'>
                {speeldagen.map((_, index) =>
                    <li key={index}>
                        <button onClick={() => onClick(index)}>
                            Speeldag {index + 1}
                        </button>
                    </li>
                )}
            </ul>
        </>
    );
}
