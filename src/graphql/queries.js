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

export const WHOAMI = gql`
  query whoami {
    whoami{
      id
      username
      sprintSet{
        id
        title
        description
        status
        createdAt
        updatedAt
        status
      }
    }
  }
`

export const ALL_SPRINT = gql`
  query allSprints {
    allSprints{
      id
      title
      description
      status
      createdAt
      updatedAt
      status
    }
  }
`

export const SPRINT = gql`
  query sprint($sprintId: Int) {
    sprint(sprintId: $sprintId){
      id
      title
      description
      status
      createdAt
      updatedAt
      status
      taskSet {
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
  }
`