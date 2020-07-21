import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { getRepoCommitInfoPaginated } from '../queries/queries'

const QueryTest = () => {
    const [concatData, setConcatData] = useState(() => {
        return []
    })

    const { loading, error, data, fetchMore } = useQuery(getRepoCommitInfoPaginated);
    // console.log(data)
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.repository.object.hasOwnProperty('history')) {
        if(data.repository.object.history.pageInfo.hasNextPage){
            fetchMore({
                variables: {
                  cursor: data.repository.object.history.pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    /** Workaround to prevent ocasional cached data been duplicated in the final data array **/
                    if(fetchMoreResult.repository.object.history.nodes.length > 100) return previousResult
                    
                    const pageInfo = fetchMoreResult.repository.object.history.pageInfo
                    let result = {
                        ...fetchMoreResult
                    }
                    result.repository.object.history.nodes = [
                        ...previousResult.repository.object.history.nodes,
                        ...fetchMoreResult.repository.object.history.nodes
                    ]
                    return pageInfo.hasNextPage
                        ? result: previousResult;
                }
            }).then((response)=>{
                if(!response.data.repository.object.history.pageInfo.hasNextPage){
                    return setConcatData(response.data.repository.object.history.nodes)  
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