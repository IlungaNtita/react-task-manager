import {
  gql
} from "@apollo/client";

export const TASK_CREATE = gql`
    mutation TaskCreate($title:String
                    $status:String
                    $description:String
                    $user:ID
                    $hours:Int
                    $minutes:Int
                    $seconds:Int
    ) {
        taskCreate(input:{
            title:$title description: $description status: $status user: $user hours: $hours minutes:$minutes seconds:$seconds
        }) {
            task{
                id
                title
                hours
                status
                icon 
            }
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation TaskUpdate(
        $id:Int
        $title:String
        $status:String
        $description:String
        $hours:Int
        $minutes:Int
        $seconds:Int
    ) {
        taskUpdate(input:{
            title:$title description: $descriptio status: $status hours: $hours minutes:$minutes seconds:$seconds
        }) {
            task{
                id
                title
                hours
                status
                icon 
            }
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($id: Int) {
        taskDelete(id:$id) {
            ok
        }
    }
`;