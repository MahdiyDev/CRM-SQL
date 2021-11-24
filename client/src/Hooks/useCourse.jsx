import { useEffect, useState } from "react";
import { url } from "../assets/url";

function useCourse(params) {
    const [course, setCourse] = useState([])
    const [coursePost, setCoursePost] = useState([])
    const [courseDelete, setCourseDelete] = useState([])

    useEffect(()=> {
        fetch(`${url}course`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`${url}course`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coursePost)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }, [coursePost])

    useEffect(() => {
        fetch(`${url}course`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({course_uid: courseDelete})
        })
        .catch(err => console.log(err))
    }, [courseDelete])

    if (params === 'get') {
        return course
    } 
    if (params === 'post') {
        return [setCoursePost]
    }
    if (params === 'delete') {
        return [setCourseDelete]
    }
}

export default useCourse;
