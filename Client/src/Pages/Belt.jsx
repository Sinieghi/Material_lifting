import { Component } from "react";
import CreateAndUpdateBelt from "../Component/CreateAndUpdateBelt";
import { findOne } from "../utils/FindOne";
const headers = {
  "Content-Type": "application/json",
};
class Belt extends Component {
  constructor() {
    super();
    this.state = {};
    this.timer;
  }
  async getBelts() {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch("https://localhost:7091/api/belt", {
        method: "GET",
        headers: headers,
      });
      return await res.json();
    } catch (error) {
      this.setState({ ...this.state, loading: false });
    }
  }
  async deleteBelt(id) {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch(`https://localhost:7091/api/delete/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      return await res.json();
    } catch (error) {
      this.setState({ ...this.state, loading: false });
    }
  }
  async createBelt(belt) {
    try {
      this.setState({ ...this.state, loading: true });
      await fetch("https://localhost:7091/api/insert/belt", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(belt),
      });
      this.setState({
        ...this.state,
        belts: await this.getBelts(),
        loading: false,
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false });
    }
  }

  async updateBelt(belt) {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch("https://localhost:7091/api/belt/update", {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(belt),
      });
      res.json().then((belRes) => {
        let belts = findOne({ arr: this.state.belts }, belRes);
        console.log(belts);
        this.setState({
          ...this.state,
          belts,
          loading: false,
        });
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false });
    }
  }

  onChangeHandler(e) {
    if (this.timer) clearTimeout(this.timer);
    const name = e.target.name;
    const val = e.target.value;
    let belts = this.state.belts;
    let belt;
    for (let i = 0; i < belts.length; i++) {
      if (belts[i].showInput) {
        belts[i][name] = val;
        this.setState({
          ...this.state,
          belts,
        });
        belt = belts[i];
      }
    }
    this.timer = setTimeout(() => {
      this.updateBelt(belt);
    }, 500);
  }

  componentDidMount() {
    this.getBelts().then((belts) =>
      this.setState({ ...this.state, loading: false, belts })
    );
  }
  render() {
    return (
      <main>
        {this.state.createOrModify && (
          <div
            style={{ position: "fixed", left: "40%", top: "20px" }}
            className="bg-body-tertiary"
          >
            <CreateAndUpdateBelt
              setState={this.setState.bind(this)}
              state={this.state}
              createBelt={this.createBelt.bind(this)}
              updateBelt={this.updateBelt.bind(this)}
            />
          </div>
        )}
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Dimensão</th>
                <th scope="col">Quantidade</th>
              </tr>
            </thead>
            {this.state && this.state.belts
              ? this.state.belts.map((b, i) => {
                  return (
                    <tbody key={i}>
                      <tr>
                        <th scope="row">
                          {!b.showInput ? (
                            b.type
                          ) : (
                            <input
                              type="text"
                              value={b.type}
                              name="Type"
                              onChange={(e) => {
                                this.onChangeHandler(e);
                                b.type = e.target.value;
                              }}
                            />
                          )}
                        </th>
                        <td>
                          {!b.showInput ? (
                            b.size
                          ) : (
                            <input
                              type="number"
                              value={b.size}
                              name="Size"
                              onChange={(e) => {
                                this.onChangeHandler(e);
                                b.size++;
                              }}
                            />
                          )}
                        </td>
                        <td>
                          {!b.showInput ? (
                            b.quantity
                          ) : (
                            <input
                              type="number"
                              value={b.quantity}
                              name="Quantity"
                              onChange={(e) => {
                                this.onChangeHandler(e);
                                b.quantity++;
                              }}
                            />
                          )}
                        </td>
                        {b.showInput ? (
                          <td
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            onClick={() => {
                              let belts = this.state.belts;
                              belts[i].showInput = null;
                              this.setState({
                                ...this.state,
                                belts,
                              });
                            }}
                          >
                            Cancelar
                          </td>
                        ) : (
                          <td
                            type="button"
                            className="btn btn-warning border-primary"
                            onClick={() => {
                              let belts = this.state.belts;
                              belts[i].showInput = true;
                              this.setState({
                                ...this.state,
                                belts,
                              });
                            }}
                          >
                            Modificar
                          </td>
                        )}
                        <td
                          type="button"
                          className="btn btn-danger border-primary"
                          onClick={() => {
                            this.deleteBelt(b.Id).then((r) => {
                              this.setState({
                                ...this.state,
                                loading: false,
                                belts: r,
                              });
                            });
                          }}
                        >
                          Remover
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : null}
          </table>
          <button
            type="button"
            className="btn btn-primary"
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() =>
              this.setState({
                ...this.state,
                createOrModify: true,
              })
            }
          >
            Adicionar correia
          </button>
        </div>
      </main>
    );
  }
}

export default Belt;
