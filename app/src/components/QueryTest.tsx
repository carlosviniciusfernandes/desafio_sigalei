import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { getRepoCommitInfoPaginated } from '../queries/queries'

const QueryTest = () => {
    const [concatData, setConcatData] = useState(() => {
        return []
    })
    const [dataStatus, setDataStatus] = useState(() => {
        return {loaded:false, parsed:false}
    })
    const [parsedUserData, setUsersParsedData] = useState(() => {        
        let usersCommitStats:{login:string, commits:number, additions:number, deletions:number}[] = [{
            login:'null',
            commits:0,
            additions:0,
            deletions:0
        }]
        return usersCommitStats
    })

    const { loading, error, data, fetchMore } = useQuery(getRepoCommitInfoPaginated);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.repository.object.hasOwnProperty('history')) {
        if(data.repository.object.history.pageInfo.hasNextPage && !dataStatus.loaded){
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
                    setDataStatus({loaded:true, parsed:false})
                    return setConcatData(response.data.repository.object.history.nodes)  
                }                     
            })
        }                
    }

    if(concatData.length > 0 && dataStatus.loaded && !dataStatus.parsed){
        let usersCommitStats = [...parsedUserData]
        concatData.map((commitData) => {
            const commit:{ author: {user:{login:string}}, additions:number, deletions:number} = commitData
            try{
                if(!usersCommitStats.find((user) => user.login === commit.author.user.login)){
                    usersCommitStats.push({
                        login:commit.author.user.login,
                        commits:0,
                        additions:0,
                        deletions:0
                    })                   
                }

                let index = usersCommitStats.findIndex((user) => {
                    return user.login === commit.author.user.login
                })           
                usersCommitStats[index].commits++
                usersCommitStats[index].additions+=commit.additions
                usersCommitStats[index].deletions+=commit.deletions
            }catch(e){
                usersCommitStats[0].commits++
                usersCommitStats[0].additions+=commit.additions
                usersCommitStats[0].deletions+=commit.deletions
            }
            return null
        })           
        console.log(usersCommitStats)
        setDataStatus({loaded:true, parsed:true})
        setUsersParsedData(usersCommitStats)
    }

    return (
        <div>
            just some jsx<br/>
            {parsedUserData.map((user) => {
                return  <div key={user.login}>
                            <p><b>user</b>:{user.login} <b>commits:</b>{user.commits}  <b>additons:</b>{user.additions} <b>deletions</b>:{user.deletions} </p>
                        </div>
            })}
        </div>
    );
    
}

export default QueryTest