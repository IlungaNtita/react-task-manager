import {
  gql
} from "@apollo/client";

export const TASK_CREATE = gql`
    mutation TaskCreate($title:String,
                    $description:String,
                    $status: String,
                    $icon: String ,
                    $user:ID,
                    $hours:Int,
                    $minutes:Int,
                    $seconds:Int,
    ) {
        taskCreate(input:{
            title:$title description: $description status: $status user: $user hours: $hours minutes:$minutes seconds:$seconds
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
        $id:ID!,
        $title:String,
        $icon:String,
        $status:String,
        $description:String,
        $hours:Int,
        $minutes:Int,
        $seconds:Int,
    ) {
        taskUpdate(
            id:$id 
            input: {
                title:$title,
                description: $description ,
                status: $status ,
                icon: $icon ,
                hours: $hours ,
                minutes:$minutes ,
                seconds:$seconds,
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
        $id:ID!,
        $icon:String,
        $status:String,
        $hours:Int,
        $minutes:Int,
        $seconds:Int,
    ) {
        taskUpdateTime(
            id:$id 
            input: {
                status: $status,
                icon: $icon ,
                hours: $hours ,
                minutes:$minutes ,
                seconds:$seconds,
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

export const CREATE_USER = gql`
    mutation createUser(
        $username:String,
        $password:String,
        $email:String,
        ) {
        createUser(username: $username, password: $password, email: $email) {
            refreshToken
            token
            user {
                username
            }
            profile {
                role
            }
        }
    }
`;

export const VERIFY_TOKEN = gql`
    mutation verifyToken($token:String) {
        verifyToken(token: $token) {
            payload
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation refreshToken($refreshToken:String) {
        refreshToken(refreshToken: "<refresh_token>") {
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($username:String, $password:String) {
        tokenAuth(username: $username, password: $password) {
            token
            refreshToken
            payload
        }
    }
`;
