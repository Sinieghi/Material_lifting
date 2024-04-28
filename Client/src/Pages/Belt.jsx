import { Component } from "react";

class Belt extends Component {
  async getBelts() {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch("");
      this.beltList = await res.json();
    } catch (error) {
      this.setState({ ...this.state, loading: false });
    }
  }
  componentDidMount() {
    this.getBelts().then(() =>
      this.setState({ ...this.state, loading: false })
    );
  }
  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Default</th>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Belt;
