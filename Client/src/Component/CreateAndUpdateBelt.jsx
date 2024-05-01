/* eslint-disable react/prop-types */

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const initialState = {
  Type: "",
  Size: "",
  Quantity: "",
};
const CreateAndUpdateBelt = ({ state, setState, createBelt, updateBelt }) => {
  const [belt, setBelt] = useState({ ...initialState });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBelt({ ...belt, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.belt) updateBelt(belt);
    else createBelt(belt);
  };
  return (
    <form
      className="card border-light mb-3"
      style={{ maxWidth: "20rem" }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="card-header">Características da correia</div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        style={{ position: "absolute", right: "3px", top: "3px" }}
        onClick={() => setState({ ...state, createOrModify: false })}
      ></button>
      <div className="card-body">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="ex: AX"
            name="Type"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="floatingInput">Tipo</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="ex: 26"
            name="Size"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="floatingInput">Dimensão</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="00"
            name="Quantity"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="floatingInput">Quantidade</label>
        </div>
        <button className="btn btn-lg btn-primary" type="submit">
          {state.belt ? "Aplicar" : "Criar"}
        </button>
      </div>
    </form>
  );
};

export default CreateAndUpdateBelt;
