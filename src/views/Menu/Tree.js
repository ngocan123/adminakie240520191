import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import axioApi from './../../config/axioConfig'
import configUrl from './../../config/configUrl'
const alertNodeInfo = ({ node, path, treeIndex }) => {
  const objectString = Object.keys(node)
    .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    .join(',\n   ');
  console.log(objectString)
  // global.alert(
  //   'Info passed to the button generator:\n\n' +
  //     `node: {\n   ${objectString}\n},\n` +
  //     `path: [${path.join(', ')}],\n` +
  //     `treeIndex: ${treeIndex}`
  // );
};

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
      listitems: []
    };
  }
  componentDidMount(){
    this.setState({
      treeData: [{ title: 'Chicken', subtitle: 'sub', id: 'jkhjjhh7h7hr78e78', children: [{ title: 'Egg',children: [{ title: 'Chicken' }] }] }]
    })
    this.getListMenu();
  }
  getListMenu(){
    axioApi.get('/api/menu/listmenu').then((res) => {
      console.log(res.data)
      this.setState({
        listitems: res.data.posts
      })
    });
  }
  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={rowInfo => ({
            buttons: [
              <button
                className="btn btn-outline-success"
                style={{
                  verticalAlign: 'middle',
                }}
                onClick={() => alertNodeInfo(rowInfo)}
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>,
              <button
                className="btn btn-outline-danger"
                style={{
                  verticalAlign: 'middle',
                }}
                onClick={() => alertNodeInfo(rowInfo)}
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            ],
          })}
        />
      </div>
    );
  }
}