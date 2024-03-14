'use client'
import BaseLayout from "@/layout/BaseLayout";
import AdminPopup from '@/components/Popup'
import "../../css/style.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import 'reactjs-popup/dist/index.css';
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
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
  const router = useRouter();
    const maakSpeeldagClick = () =>{
        console.log('maakSpeeldagClick')
        router.push('/admin/speeldagen/CreateSpeeldag');
    }
  return (
    <BaseLayout>
      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <AdminPopup popupContent={SpeelDagForm()} triggerButtonName="nieuw Speeldag" />
      <div className="speeldag">
        <ul>
          {seizoen.speeldagen.map((speeldag) => (
            <li key={speeldag.speeldagNr}>
              <div className="speeldagHead">
                <h2>Speeldag {speeldag.speeldagNr}</h2>
                <AdminPopup popupContent={SpeelDagForm({schiftingsvraag:"vraag",schiftingsantwoord:"antwoord"})} triggerButtonName="pas aan" />
              </div>

              <ul>
                {speeldag.wedstrijden.map((wedstrijd) => (
                  <li key={wedstrijd.id}>
                    Thuis: {wedstrijd.thuis} - Uit: {wedstrijd.weg}
                    <Link
                      href={{
                        pathname: "",
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
