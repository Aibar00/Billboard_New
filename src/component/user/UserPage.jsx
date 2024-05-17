import styles from "../buyNow/styles/buyNowPage.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

const UserPage = () =>{
    
    const [username, setUsername] = useState("")
    const [item, setItem] = useState("")

    useEffect(() => {
        setItem(localStorage.getItem("token"))
        fetchContent()
    }, [])

    async function fetchContent() {
        const res = await fetch("http://localhost:8080/secured/user",{
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json", 
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        console.log("Bearer " + localStorage.getItem("token"));
        console.log("Form was submitted")
        // if(res.ok) {
        //     const json = await res.text()
        //     setUsername(json)
        // } else{
        //     setUsername("Not working ishak")
        // }
    }

    return (
        <>
            <main className={styles.container}>
                <div className={styles.content} data-testid="signed">
                    {/* {
                        item !== null ?
                        <p>Signed in as {username}</p> :
                        <p>UNAUTHORIZED</p>
                    } */}
                    
               </div>
            </main>
        </>
    )
}

export {UserPage}