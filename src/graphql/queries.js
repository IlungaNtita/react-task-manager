import {
  gql
} from "@apollo/client";

export const ALL_TASKS = gql`
  query AllTasks {
    allTasks {
      id
      title
      description
      status
      hours
      minutes
      seconds
    }
  }
`;

