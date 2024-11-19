import { getSeizoenen, getSpeeldagenBySeizoenId, getJokers } from "@/src/api_calls";
import React, { useEffect, useState } from "react";

export default function SeizoenPanel({ onClick, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [matchDays, setMatchDays] = useState(null);
  const [jokersData, setJokersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onMount = async () => {
    try {
      const seasons = await getSeizoenen();
      const reversedSeasons = seasons.reverse();
      setSeasons(reversedSeasons);

      const onlineSeasons = reversedSeasons.filter((s) => s.isOnline);
      if (onlineSeasons.length === 0) return;

      const defaultSeasonId = onlineSeasons[0]._id;
      setSelectedSeason(defaultSeasonId);
      onSelect(defaultSeasonId);

      const [matchDays, jokersData] = await Promise.all([
        getSpeeldagenBySeizoenId(defaultSeasonId),
        getJokers(defaultSeasonId),
      ]);

      setMatchDays(matchDays);
      setJokersData(jokersData);
    } catch (error) {
      console.error(error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  useEffect(() => {
    if (selectedSeason != null && seasons != null) {
      getSpeeldagenBySeizoenId(selectedSeason)
        .then(setMatchDays)
        .catch((error) => {
          console.error("Error fetching match days:", error);
          setError("Failed to load match days");
        });
    }
  }, [selectedSeason]);

  const handleSeasonChange = (event) => {
    const newSeasonId = event.target.value;
    setSelectedSeason(newSeasonId);
    onSelect(newSeasonId);
    setSelectedIndex(null);

    getJokers(newSeasonId).then(setJokersData).catch((error) => {
      console.error("Error fetching jokers:", error);
      setError("Failed to load jokers");
    });
  };

  const handleMatchDayClick = (index, id) => {
    onClick(id);
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const ShowJokers = () => {
    if (loading) return <p>Laden...</p>;
    if (error) return <p>{error}</p>;
    if (!jokersData) return <p>Er zijn geen jokers beschikbaar</p>;

    return (
      <div id="jokersList">
        <div>
          <span>Jokers dit seizoen: {jokersData.seizoenJokers}</span>
		  <br />
          <span>Jokers Resterend: {jokersData.jokersLeft}</span>
        </div>
      </div>
    );
  };

  const ShowSeasons = () => {
    if (loading) return <p>Laden...</p>;
    if (error) return <p>{error}</p>;
    if (!seasons) return <p>Er zijn geen seizoenen beschikbaar</p>;

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
    if (loading) return <p>Laden...</p>;
    if (error) return <p>{error}</p>;
    if (!matchDays) return <p>Er zijn geen speeldagen voor dit seizoen</p>;

    const onlineMatchDays = matchDays.filter((m) => m.isOnline).reverse();

    return (
      <ul id="speeldagenList">
        {onlineMatchDays.map((speeldag, index) => (
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
              Speeldag {matchDays.length - index}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <ShowJokers />
      <ShowSeasons />
      <ShowMatchDays />
    </div>
  );
}