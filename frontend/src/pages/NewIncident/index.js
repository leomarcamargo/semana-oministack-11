import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import logoImg from '../../assets/logo.svg';
import api from "../../services/api";
import SweetAlert from 'sweetalert2-react';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const [show, setShow] = useState(false);

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const ongId = localStorage.getItem("ongId");

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post("/incidesnts", data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push("/profile");
        } catch (err) {
            console.error(err);
            setShow(true);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                            Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />


                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
            <SweetAlert
                show={show}
                type="error"
                title="Ops!"
                text="Não foi possível cadastrar o caso. Tente novamente!"
                onConfirm={() => setShow(false)}
            />
        </div>
    );
}