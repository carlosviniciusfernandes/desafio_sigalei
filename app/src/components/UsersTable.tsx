import React from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  login:string,
  commits:number,
  additions:number,
  deletions:number
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

type UserData = {
  login:string,
  commits:number,
  additions:number,
  deletions:number
} 

 const MaterialTableDemo = (props:{users:UserData[], dataStatus:any}) => {
  // const x = [...users]
  const [loaded, setLoaded] = React.useState(() => { return false })

  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'User', field: 'login', type: 'string' },
      { title: 'N° commits', field: 'commits', type: 'numeric' },
      { title: '++Addtitions', field: 'additions', type: 'numeric' },
      { title: '--Deletions', field: 'deletions', type: 'numeric' },
    ],
    data: [],
  });
  
  if(props.dataStatus.loaded && props.dataStatus.parsed && !loaded){
    setLoaded(true)
    setState(prev => {
      let state = Object.assign({}, prev)
      state.data = props.users.filter(user => {
        return user.login != 'null'
      })      
      return state    
    })
  }

  return (
    <MaterialTable
      title="Contributors to Linux Kernel since 2020-07-01"
      columns={state.columns}
      data={state.data}
    />
  );
}

export default MaterialTableDemo
