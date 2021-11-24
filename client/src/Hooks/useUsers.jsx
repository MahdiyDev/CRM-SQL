import { useEffect, useState } from "react";
import { url } from "../assets/url";

function useUsers(params) {
    const [user, setUser] = useState([])
    const [userPost, setUserPost] = useState([])
    const [userDelete, setUserDelete] = useState([])

    useEffect(() => {
        fetch(`${url}users`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch(`${url}users`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPost)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }, [userPost])

    useEffect(() => {
        fetch(`${url}users`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({users_uid: userDelete})
        })
        .catch(err => console.log(err))
    }, [userDelete])

    if (params === 'get') {
        return user
    } 
    if (params === 'post') {
        return [setUserPost]
    } 
    if (params === 'delete') {
        return [setUserDelete]
    } 
}

export default useUsers;
