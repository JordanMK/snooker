import "../../app/css/style.css";
import Link from "next/link";

export default function Seizoen( { seizoen }) {
  return (
    <>
      <div className="seizoen">
        <p>
          {seizoen.name}
          <Link
            href={{
              pathname: "admin/speeldagen",
            }}
          >
            Toon speeldagen
          </Link>
        </p>
      </div>
    </>
  );
}
