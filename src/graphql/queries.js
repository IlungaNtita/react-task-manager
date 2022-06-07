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
      icon
    }
  }
`;

export const TASK = gql`
  query Task($taskId:Int) {
    task(taskId: $taskId) {
      id
      title
      description
      status
      hours
      minutes
      seconds
      icon
    }
  }
`;

