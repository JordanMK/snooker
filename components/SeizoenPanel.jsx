import { getSeizoenen, getSpeeldagenBySeizoenId } from "@/src/api_calls";
import React, { useEffect, useState } from "react";

export default function SeizoenPanel({ onClick, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [matchDays, setMatchDays] = useState(null);

  const onMount = async () => {
    try {
      const seasons = await getSeizoenen()
      const reversedSeasons = seasons.reverse()
      setSeasons(reversedSeasons)

      const onlineSeasons = reversedSeasons.filter(s => s.isOnline)
      if (onlineSeasons.length === 0) return

      const defaultSeasonId = onlineSeasons[0]._id
      setSelectedSeason(defaultSeasonId)
      onSelect(defaultSeasonId)

      const matchDays = await getSpeeldagenBySeizoenId(defaultSeasonId)
      setMatchDays(matchDays)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { onMount() }, [])

  useEffect(() => {
    if (selectedSeason != null && seasons != null) {
      getSpeeldagenBySeizoenId(selectedSeason)
        .then(setMatchDays)
        .catch((error) => console.error("Error fetching match days:", error));
    }
  }, [selectedSeason]);

  const handleSeasonChange = (event) => {
    const newSeasonId = event.target.value;
    setSelectedSeason(newSeasonId);
    onSelect(newSeasonId);
    setSelectedIndex(null);
  };

  const handleMatchDayClick = (index, id) => {
    onClick(id);
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const ShowSeasons = () => {
    if (!seasons) return <p>Laden...</p>;
    if (seasons.length === 0) return <p>Er zijn geen seizoenen beschikbaar</p>;

    const filterSeasons = seasons.filter((season) => season.isOnline);
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
    if (matchDays.length === 0)
      return <p>Er zijn geen speeldagen voor dit seizoen</p>;

    return (
      <ul id="speeldagenList">
        {matchDays
          .filter((m) => m.isOnline)
          .reverse()
          .map((speeldag, index) => {
            const reverseIndex = matchDays.length - index;
            return (
              <li key={speeldag._id}>
                <button
                  data-id={speeldag._id}
                  onClick={() => handleMatchDayClick(index, speeldag._id)}
                  style={
                    selectedIndex === index
                      ? { backgroundColor: "green" }
                      : null
                  }
                >
                  Speeldag {reverseIndex}
                </button>
              </li>
            );
          })}
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
