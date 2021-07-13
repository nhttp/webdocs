import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import "./sign.style.css";
import { e_base_api } from './../../../constant';

export default function TodoFaunaSign() {
    const { siteConfig } = useDocusaurusContext();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const onSign = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(e_base_api + "/todo-fauna/todo-sign", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                throw new Error("Please valid email and password nhttp");
            }
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Layout
            title={`${siteConfig.title} Todo fauna Sign`}
            description="Description will go into a meta tag in <head />">
            <div className="container">
                <div className="sign-layout">
                    <h1>Sign</h1>
                    <form onSubmit={onSign}>
                        <label>Email: </label>
                        <input
                            onChange={handleEmail}
                            // type="email"
                            placeholder="name@example.com"
                            className="my-input"
                            required
                        />
                        <div style={{ margin: 10 }}></div>
                        <label>Password: </label>
                        <input
                            onChange={handlePassword}
                            type="password"
                            placeholder="nhttp"
                            className="my-input"
                            required
                        />
                        <div style={{ margin: 15 }}></div>
                        <button type="submit" className="button button--primary button--block">Sign</button>
                    </form>
                    <div style={{ marginTop: 30 }}>
                        <span>email: youremail@domain.com</span><br />
                        <span>password: nhttp</span>
                    </div>
                </div>
            </div>
        </Layout>
    );
}