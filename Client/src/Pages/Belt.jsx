import { Component } from "react";
import CreateAndUpdateBelt from "../Component/CreateAndUpdateBelt";
const headers = {
  "Content-Type": "application/json",
};
class Belt extends Component {
  constructor() {
    super();
    this.state = {};
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
  async createBelt() {
    try {
      this.setState({ ...this.state, loading: true });
      await fetch("https://localhost:7091/api/insert/belt", {
        method: "POST",
        headers: headers,
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
  async updateBelt() {}
  componentDidMount() {
    this.getBelts().then((belts) =>
      this.setState({ ...this.state, loading: false, belts })
    );
  }
  render() {
    return (
      <>
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
              </tr>
            </thead>
            {this.state && this.state.belts
              ? this.state.belts.map((b, i) => {
                  return (
                    <tbody key={i}>
                      <tr>
                        <th scope="row">{b.type}</th>
                        <td>{b.size}</td>
                        <td
                          type="button"
                          className="btn btn-warning border-primary"
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              createOrModify: true,
                              belt: b,
                            })
                          }
                        >
                          Modificar
                        </td>
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
      </>
    );
  }
}

export default Belt;
