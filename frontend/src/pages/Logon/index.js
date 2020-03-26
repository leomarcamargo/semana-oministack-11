import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './style.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from "../../services/api";
import SweetAlert from 'sweetalert2-react';

export default function Logon() {
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });

            localStorage.setItem("ongId", id);
            localStorage.setItem("ongName", response.data.name);

            history.push("/profile");
        } catch (err) {
            console.error(err);
            setShow(true);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Heroes" />
                <form onSubmit={handleLogin}>
                    <h1>Faça sua logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"></img>
            <SweetAlert
                show={show}
                type="error"
                title="Ops!"
                text="Não foi possível realizar o login. Por favor, verifique se o seu ID está correto e tente novamente!"
                onConfirm={() => setShow(false)}
            />
        </div>
    );
}