import { gql } from '@apollo/client';

const getRepoCommitInfoPaginated = gql`
query getRepoCommitInfoPaginated($cursor: String) {
    repository(name: "linux", owner: "torvalds") {
        name
        url
        object(expression: "master") {
            ... on Commit {
                history(first:100, since: "2020-07-01T00:00:00Z", after: $cursor) {
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