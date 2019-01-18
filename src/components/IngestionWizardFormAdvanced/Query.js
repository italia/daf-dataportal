import React, {Component} from 'react';
import QueryBuild from '../../components/Widgets/QueryBuild'

class Query extends Component {
  constructor(props){
    super(props)
    this.state = { }
  }

  render() {
    const { onDropFunction, setQuery, fields } = this.props;
    return (
      <div>
        
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Query</label>
          <div className="col-sm-10 col-form-label">
            <QueryBuild onDropFunction={onDropFunction} fields={fields} onSubmit={setQuery} className=" " limit={400} blockEmpty={true}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Query