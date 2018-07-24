import React from "react"

export default ({ msg }) => (
  <h1 className="text-center fixed-middle">
    <i className="fas fa-circle-notch fa-spin mr-2" /> {msg || "Caricamento"}
  </h1>
)
