import BaseLayout from "@/layout/BaseLayout";
import "../../css/style.css";
import Link from "next/link";

export default function Speeldagen() {
  let seizoen = {
    speeldagen: [
      {
        speeldagNr: 1,
        wedstrijden: [
          { id: 1, thuis: "ploeg a", weg: "ploeg b" },
          { id: 2, thuis: "ploeg a", weg: "ploeg c" },
          { id: 3, thuis: "ploeg b", weg: "ploeg d" },
          { id: 4, thuis: "ploeg a", weg: "ploeg b" },
        ],
      },
      {
        speeldagNr: 2,
        wedstrijden: [
          { id: 1, thuis: "ploeg b", weg: "ploeg a" },
          { id: 2, thuis: "ploeg c", weg: "ploeg a" },
          { id: 3, thuis: "ploeg d", weg: "ploeg b" },
          { id: 4, thuis: "ploeg b", weg: "ploeg a" },
        ],
      },
      {
        speeldagNr: 3,
        wedstrijden: [
          { id: 1, thuis: "ploeg a", weg: "ploeg b" },
          { id: 2, thuis: "ploeg a", weg: "ploeg c" },
          { id: 3, thuis: "ploeg b", weg: "ploeg d" },
          { id: 4, thuis: "ploeg a", weg: "ploeg b" },
        ],
      },
      {
        speeldagNr: 4,
        wedstrijden: [
          { id: 1, thuis: "ploeg a", weg: "ploeg b" },
          { id: 2, thuis: "ploeg a", weg: "ploeg c" },
          { id: 3, thuis: "ploeg b", weg: "ploeg d" },
          { id: 4, thuis: "ploeg a", weg: "ploeg b" },
        ],
      },
      {
        speeldagNr: 5,
        wedstrijden: [
          { id: 1, thuis: "ploeg a", weg: "ploeg b" },
          { id: 2, thuis: "ploeg a", weg: "ploeg c" },
          { id: 3, thuis: "ploeg b", weg: "ploeg d" },
          { id: 4, thuis: "ploeg a", weg: "ploeg b" },
        ],
      },
      {
        speeldagNr: 6,
        wedstrijden: [
          { id: 1, thuis: "ploeg a", weg: "ploeg b" },
          { id: 2, thuis: "ploeg a", weg: "ploeg c" },
          { id: 3, thuis: "ploeg b", weg: "ploeg d" },
          { id: 4, thuis: "ploeg a", weg: "ploeg b" },
        ],
      },
    ],
  };
  return (
    <BaseLayout>
      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <div className="speeldag">
        <ul>
          {seizoen.speeldagen.map((speeldag) => (
            <li key={speeldag.speeldagNr}>
              <h2>Speeldag {speeldag.speeldagNr}</h2>
              <Link
                href={{
                  pathname: "admin/speeldagen",
                }}
              >
                Pas aan
              </Link>
              <ul>
                {speeldag.wedstrijden.map((wedstrijd) => (
                  <li key={wedstrijd.id}>
                    Thuis: {wedstrijd.thuis} - Uit: {wedstrijd.weg}
                    <Link
                      href={{
                        pathname: "admin/speeldagen",
                      }}
                    >
                      Pas aan
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
}
