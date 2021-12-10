import { useEffect, useState } from "react";
import { url } from "../assets/url";

function useUsers(params) {
    const [user, setUser] = useState([])
    const [userPost, setUserPost] = useState([])
    const [userUpdate, setUserUpdate] = useState([])
    const [userDelete, setUserDelete] = useState('')

    useEffect(() => {
        fetch(`${url}users`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (userPost) {
        fetch(`${url}users`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPost)
        })
        .then(res => res.json())
        .catch(err => console.log(err))    
        }
    }, [userPost])

    useEffect(() => {
        if (userUpdate) {
        fetch(`${url}users`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userUpdate)
        })
        .then(res => res.json())
        .catch(err => console.log(err))    
        }
    }, [userUpdate])

    useEffect(() => {
        if (userDelete) {
        fetch(`${url}users`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({users_uid: userDelete})
        })
        .catch(err => console.log(err))    
        }
    }, [userDelete])

    if (params === 'get') {
        return user
    } 
    if (params === 'post') {
        return [setUserPost]
    } 
    if (params === 'update') {
        return [setUserUpdate]
    } 
    if (params === 'delete') {
        return [setUserDelete]
    } 
}

export default useUsers;
