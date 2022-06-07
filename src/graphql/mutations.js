import {
  gql
} from "@apollo/client";

export const TASK_CREATE = gql`
    mutation TaskCreate($title:String
                    $status:String
                    $description:String
                    $status: String
                    $icon: String 
                    $user:ID
                    $hours:Int
                    $minutes:Int
                    $seconds:Int
    ) {
        taskCreate(input:{
            title:$title description: $description status: $status user: $user hours: $hours minutes:$minutes seconds:$seconds
            status: $status 
            icon: $icon 
        }) {
            task{
                id
                title
                description
                hours
                status
                icon 
            }
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation TaskUpdate(
        $id:ID!
        $title:String
        $icon:String
        $status:String
        $description:String
        $hours:Int
        $minutes:Int
        $seconds:Int
    ) {
        taskUpdate(
            id:$id 
            input: {
                title:$title
                description: $description 
                status: $status 
                icon: $icon 
                hours: $hours 
                minutes:$minutes 
                seconds:$seconds
            }
        ) {
            task {
                id
                title
                description
                hours
                status
                icon 
            }
        }
    }
`;

export const UPDATE_TASK_TIME = gql`
    mutation TaskUpdateTime(
        $id:ID!
        $icon:String
        $status:String
        $hours:Int
        $minutes:Int
        $seconds:Int
    ) {
        taskUpdateTime(
            id:$id 
            input: {
                status: $status
                icon: $icon 
                hours: $hours 
                minutes:$minutes 
                seconds:$seconds
            }
        ) {
            task {
                id
                title
                description
                hours
                status
                icon 
            }
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($id: ID) {
        taskDelete(id:$id) {
            ok
        }
    }
`;