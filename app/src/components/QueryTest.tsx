import React from 'react'

import { useQuery } from '@apollo/client'
import { getRepoCommitInfoPaginated } from '../queries/queries'

const QueryTest = () => {

    const { loading, error, data, fetchMore } = useQuery(getRepoCommitInfoPaginated);
    
    console.log('data', data)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.repository.object.hasOwnProperty('history')) {
        if(data.repository.object.history.pageInfo.hasNextPage){
            fetchMore({
                variables: {
                  cursor: data.repository.object.history.pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const pageInfo = fetchMoreResult.repository.object.history.pageInfo
                    let result = {
                        ...fetchMoreResult
                    }
                    result.repository.object.history.nodes = [
                        ...fetchMoreResult.repository.object.history.nodes,
                        ...previousResult.repository.object.history.nodes
                    ]
                    return pageInfo.hasNextPage
                        ? result: previousResult;
                }
            }).then((response)=>{
                if(!response.data.repository.object.history.pageInfo.hasNextPage){
                    console.log('finished')
                } 
                    
            })
        }
                
    }

    return (
        <div>
            just some jsx
        </div>
    );
    
}

export default QueryTest