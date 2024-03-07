import "../../app/css/style.css";
import Link from "next/link";

export default function Seizoen() {
  return (
    <>
      <div className="seizoen">
        <p>
          Seizoen 23-24{" "}
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
