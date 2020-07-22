import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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


 const MaterialTableDemo = (props:{users:UserData[], dataStatus:any, titleDate:string}) => {
  const [loaded, setLoaded] = React.useState(() => { return false })

  const tableTitle = props.titleDate.split('T')[0]

  const theme = createMuiTheme({
    overrides: {
      MuiTableSortLabel: {
        root: {
          color: '#fff',
          '&:hover': {
            color: '#bbdefb',
          },
          '&$active': {
            color: '#bbdefb',
            '&& $icon': {
              opacity: 1,
              color: '#bbdefb'
            },
          },
        },
      },
    },
  });

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
        return user.login !== 'null'
      })      
      return state    
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        title={"Contributors to Linux Kernel since "+tableTitle}
        columns={state.columns}
        data={state.data}
        isLoading={!loaded}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#ffffff',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default MaterialTableDemo
