import { useEffect, useState } from "react";
import { url } from "../assets/url";

function useGroups(params) {
    const [groups, setGroups] = useState([])
    const [groupsPost, setGroupsPost] = useState([])

    useEffect(()=> {
        fetch(`${url}groups`)
        .then(res => res.json())
        .then(data => setGroups(data))
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`${url}groups`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupsPost)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }, [groupsPost])

    if (params === 'get') {
        return groups
    } 
    if (params === 'post') {
        return [setGroupsPost]
    } 
}

export default useGroups;
