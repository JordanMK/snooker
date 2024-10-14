"use client"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { createSeizoen } from "@/src/api_calls"
import { useRouter } from "next/navigation"

export default function CreateSeason() {
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const name = formData.get("name")
    //const bevriesKlassement = formData.get("bevriesKlassement")
    const startdatum = formData.get("startDatum")
    //const startTime = formData.get("startTijd")
    const eindDatum = formData.get("eindDatum")
    //const endTime = formData.get("eindTijd")
    // TODO: aantalJokers field
    // FIXME: einddatum is not being passed
    const season = { name, startdatum, /*eindDatum*/ }
    
    // TODO: handle duplicate seasons (needs support from api)
    createSeizoen(season)
      .then(router.back)
      .catch(console.error)
  }

  // TODO: client side validation

  return (
    <>
      <div className="container d-flex">
        <div className="form- w-50 justify-content-center">
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Naam:</label>
            <input type="text" name="name" className="form-control" min="5" max="255" required />
            <br />
            {/*

            <label htmlFor="bevriesKlassement">Bevries Klassement:</label>
            <input
              type="date"
              name="bevriesKlassement"
              className="form-control"
              required
            />
            <br />
            */}
            <label htmlFor="startDatum">Start Datum:</label>
            <input
              type="date"
              name="startDatum"
              className="form-control"
              required
            />
            <br />
            {/*

            <label htmlFor="startTijd">Start Tijd:</label>
            <input
              type="time"
              name="startTijd"
              className="form-control"
              required
            />
            <br />
            */}
            <label htmlFor="eindDatum">Eind Datum:</label>
            <input
              type="date"
              name="eindDatum"
              className="form-control"
              required
            />
            <br />
            {/*
            <label htmlFor="eindTijd">Eind Tijd:</label>
            <input
              type="time"
              name="eindTijd"
              className="form-control"
              required
            />
            <br />
            */}
            <button type="submit" className="btn btn-primary">Opslaan</button>
          </form>
        </div>
      </div>
    </>
  )
}
