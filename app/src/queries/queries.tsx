import { gql } from '@apollo/client';

const getRepoCommitInfoPaginated = gql`
query getRepoCommitInfoPaginated($from: GitTimestamp, $cursor: String) {
    repository(name: "linux", owner: "torvalds") {
        name
        url
        object(expression: "master") {
            ... on Commit {
                history(first:100, since: $from, after: $cursor) {
                    totalCount
                    pageInfo{
                        hasNextPage
                        endCursor            
                    }
                    nodes {
                        author {
                            user {
                            login
                            }
                        }
                        committedDate
                        additions
                        deletions
                    }
                }
            }
        }
    }
}
`;

export { getRepoCommitInfoPaginated }