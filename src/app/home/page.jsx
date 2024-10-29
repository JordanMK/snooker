'use client';
import React, { useEffect, useState } from 'react';

import KlassementPanel from '@/components/KlassementPanel';
import KlassementSeizoenPannel from '@/components/KlassementSeizoenPannel';
import SeizoenPanel from '@/components/SeizoenPanel';
import WedstrijdPanel from '@/components/WedstrijdPanel';
import '@/styles/Home.css';
import { getSpeeldagen } from '@/src/api_calls';

export default function Home() {
  const [leftPanelSelected, setLeftPanelSelected] = useState(true);
  const [selectedSpeeldag, setSelectedSpeeldag] = useState(null);
  const [showklassementSeizoenPanel, setShowKlassementSeizoenPanel] =
    useState(true);
  const [speeldagen, setSpeeldagen] = useState([]);

  const onSelectSpeeldag = (itemIdx) => {
    if (selectedSpeeldag === itemIdx) {
      setShowKlassementSeizoenPanel(true);
      setSelectedSpeeldag(null);
    } else {
      setShowKlassementSeizoenPanel(false);
      setSelectedSpeeldag(itemIdx);
    }
  };

  useEffect(() => {
    getSpeeldagen()
      .then(setSpeeldagen)
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <div className='pageContainer'>
      <div className='smallColumn'>
        <SeizoenPanel onClick={onSelectSpeeldag} speeldagen={speeldagen} />
      </div>
      <div className='column flexColumn'>
        <div className='panelNav'>
          <button
            onClick={() => setLeftPanelSelected(true)}
            style={{
              backgroundColor: leftPanelSelected ? '#bc6c25' : '#dda15e',
            }}
          >
            Klassement
          </button>
          <button
            onClick={() =>
              selectedSpeeldag !== null && setLeftPanelSelected(false)
            }
            style={{
              backgroundColor:
                !leftPanelSelected && selectedSpeeldag !== null
                  ? '#bc6c25'
                  : '#dda15e',
              cursor: selectedSpeeldag === null ? 'not-allowed' : 'pointer',
            }}
            disabled={selectedSpeeldag === null}
          >
            Wedstrijd
          </button>
        </div>
        <div>
          {showklassementSeizoenPanel ? (
            <KlassementSeizoenPannel seizoen_id={speeldagen.seizoenID} />
          ) : (
            <>
              {leftPanelSelected ? (
                <KlassementPanel
                  speeldag_id={speeldagen[selectedSpeeldag]?._id}
                />
              ) : (
                selectedSpeeldag !== null && (
                  <WedstrijdPanel
                    speeldag_id={speeldagen[selectedSpeeldag]?._id}
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
