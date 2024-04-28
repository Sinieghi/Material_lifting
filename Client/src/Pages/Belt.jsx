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
  componentDidMount() {
    this.getBelts().then((belt) =>
      this.setState({ ...this.state, loading: false, belt })
    );
  }
  render() {
    return this.state.createOrModify ? (
      <CreateAndUpdateBelt />
    ) : (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Tipo</th>
              <th scope="col">Dimensão</th>
            </tr>
          </thead>
          <tbody>
            {this.state && this.state.belt
              ? this.state.belt.map((b, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{b.type}</th>
                      <td>{b.size}</td>
                      <button type="button" className="btn btn-warning">
                        Modificar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          this.deleteBelt(b.Id).then((r) => {
                            this.setState({
                              ...this.state,
                              loading: false,
                              belt: r,
                            });
                          });
                        }}
                      >
                        Remover
                      </button>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Belt;
