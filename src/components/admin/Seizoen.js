import "@/styles/style.css";
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
              query: {
                seizoenId: seizoen._id,
              },
            }}
          >
            Toon speeldagen
          </Link>
        </p>
      </div>
    </>
  );
}