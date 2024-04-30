import styles from "./styles/login.module.css";
import {Link, useNavigate} from "react-router-dom";
import mainSDU from "../../assets/main_SDU.png"
import mainAmazon from "../../assets/main_amazon.png"
import mainBillboard from "../../assets/main_LOGO.png"
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import { useState } from "react";

const LoginPage = () =>{

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState, [name]:  value,
        }));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        localStorage.clear();
        try {
            const res = await fetch("http://localhost:8080/auth/signin",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        })
            console.log("Form was submitted")
            if(res.ok) {
                const json = await res.text()
                console.log(json)
                localStorage.setItem("token", json)
                navigate("/billboard")
            }
            else {
                console.error('HTTP Error:', res.status); 
                alert("Signup failed: " + (await res.text()));
            }
        }
        catch (error) {
            console.error('Network or other error:', error); 
            alert("Signup failed: " + error.message);
        }
    }

    return(
        <>
            <Header />
            
            <main>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.login}>
                            <img src={mainBillboard} alt="logo"/>
                            <form className={styles.loginForm} onSubmit={handleSubmit}>
                                <input className={styles.inputWithIcon1} onChange={handleChange} type="text" name="username" value={formData.username} placeholder="Username"/>
                                <input className={styles.inputWithIcon2} onChange={handleChange} type="password" name="password" value={formData.password} placeholder="Password"/>
                                <button className={`${styles.btn} ${styles.btn1}`} type="submit">sign in</button>
                                <div className={styles.content} style={{marginTop:'15px'}}>
                                    <Link className={styles.link}>Forgot password?</Link>
                                    <Link className={styles.link} to="/registration">Sign Up</Link>
                                </div>
                            </form>
                        </div>

                        <div className={styles.login}>
                            <img src={mainSDU} alt="SDU"/>
                            <img src={mainAmazon} alt="AMAZON"/>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export {LoginPage}