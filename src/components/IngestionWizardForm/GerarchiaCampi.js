import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
require('react-sortable-tree/style.css');

class GerarchiaCampi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData:[]
        };
        this.handleChangeTreeData = this.handleChangeTreeData.bind(this)

        const {fields}= this.props
        for(var i=0;i<fields.length;i++){
            var field = fields.get(i)
            var parent = new Object()
            parent.title=field.nome
            this.state.treeData.push(parent)
        }
    }

    handleChangeTreeData = (treeData) => {
        console.log(treeData)
        const { changeTreeData} = this.props
        this.setState({ treeData })
        changeTreeData(treeData)
    }
    
    render() {
        return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gerarchia Campi</h5>
                    <div style={{ height: 400 }}>
                        <SortableTree
                        treeData={this.state.treeData}
                        onChange={treeData => this.handleChangeTreeData(treeData)}
                        />
                    </div>
                </div>
            </div>
        );
      }
}
export default GerarchiaCampi