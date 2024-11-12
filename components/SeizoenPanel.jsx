import { getSeizoenen, getSpeeldagenBySeizoenId } from "@/src/api_calls";
import React, { useEffect, useState } from "react";

export default function SeizoenPanel({ onClick, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [matchDays, setMatchDays] = useState(null);

  // Fetch seasons and set default season
  useEffect(() => {
    getSeizoenen()
      .then((data) => {
        const reversedSeasons = data.reverse();
        setSeasons(reversedSeasons);

        const filterSeasons = reversedSeasons.filter((season) => season.isOnline);
        if (filterSeasons.length === 1) {
          // Only one online season, set as selected season
          const defaultSeasonId = filterSeasons[0]._id;
          setSelectedSeason(defaultSeasonId);
          onSelect(defaultSeasonId);

          // Fetch match days for the single available season
          getSpeeldagenBySeizoenId(defaultSeasonId)
            .then((matchDaysData) => {
              console.log("Match days for default season:", matchDaysData);
              setMatchDays(matchDaysData);
            })
            .catch((error) => console.error("Error fetching match days:", error));
        } else if (filterSeasons.length > 1) {
          // Multiple seasons available, set first one as default
          const defaultSeasonId = filterSeasons[0]._id;
          setSelectedSeason(defaultSeasonId);
          onSelect(defaultSeasonId);

          // Fetch match days for the default season
          getSpeeldagenBySeizoenId(defaultSeasonId)
            .then((matchDaysData) => {
              console.log("Match days for default season:", matchDaysData);
              setMatchDays(matchDaysData);
            })
            .catch((error) => console.error("Error fetching match days:", error));
        }
      })
      .catch((error) => console.error("Error fetching seasons:", error));
  }, []);

  // Fetch match days when selected season changes
  useEffect(() => {
    if (selectedSeason != null && seasons != null) {
      getSpeeldagenBySeizoenId(selectedSeason)
        .then((data) => {
          console.log("Match days for season", selectedSeason, ":", data);
          setMatchDays(data);
        })
        .catch((error) => console.error("Error fetching match days:", error));
    }
  }, [selectedSeason]);

  const handleSeasonChange = (event) => {
    const newSeasonId = event.target.value;
    setSelectedSeason(newSeasonId);
    onSelect(newSeasonId);
    setSelectedIndex(null);  // Reset selected index on season change
  };

  const handleMatchDayClick = (index, id) => {
    onClick(id);
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const ShowSeasons = () => {
    if (!seasons) return <p>Laden...</p>;
    if (seasons.length === 0) return <p>Er zijn geen seizoenen beschikbaar</p>;

    const filterSeasons = seasons.filter(season => season.isOnline);
    if (filterSeasons.length === 1) {
      return <p id="seizoenTitle">{filterSeasons[0].name}</p>;
    }
    return (
      <select
        id="seizoenTitle"
        value={selectedSeason || ""}
        onChange={handleSeasonChange}
      >
        {filterSeasons.map((season) => (
          <option key={season._id} value={season._id}>
            {season.name}
          </option>
        ))}
      </select>
    );
  };

  const ShowMatchDays = () => {
    if (!matchDays) return <p>Laden...</p>;
    if (matchDays.length === 0) return <p>Er zijn geen speeldagen voor dit seizoen</p>;

    return (
      <ul id="speeldagenList">
        {matchDays
          .filter(m => m.isOnline)
          .map((speeldag, index) => (
            <li key={speeldag._id}>
              <button
                data-id={speeldag._id}
                onClick={() => handleMatchDayClick(index, speeldag._id)}
                style={selectedIndex === index ? { backgroundColor: "green" } : null}
              >
                Speeldag {index + 1}
              </button>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div>
      <ShowSeasons />
      <ShowMatchDays />
    </div>
  );
}
