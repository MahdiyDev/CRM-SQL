import { useEffect, useState } from "react";
import { url } from "../assets/url";

function useTeachers(params) {
    const [teacher, setTeacher] = useState([])
    const [teacherPost, setTeacherPost] = useState([])
    const [teacherDelete, setTeacherDelete] = useState([])

    useEffect(()=> {
        fetch(`${url}teachers`)
        .then(res => res.json())
        .then(data => setTeacher(data))
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`${url}teachers`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacherPost)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }, [teacherPost])

    useEffect(() => {
        fetch(`${url}teachers`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({teacher_uid: teacherDelete})
        })
        .catch(err => console.log(err))
    }, [teacherDelete])

    if (params === 'get') {
        return teacher
    } 
    if (params === 'post') {
        return [setTeacherPost]
    } 
    if (params === 'delete') {
        return [setTeacherDelete]
    } 
}

export default useTeachers;
