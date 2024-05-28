import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './Login.css';

const schema = yup.object().shape({
  email: yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/login', data);
      localStorage.setItem('token', response.data.token);
      setErrorMessage('');
      window.location.href = '/dashboard';
    } catch (error) {
      setErrorMessage('Email ou senha inválidos');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input className="input-field" {...register('email')} />
        <p className="error-message">{errors.email?.message}</p>
      </div>
      <div>
        <label>Senha</label>
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="submit-button" type="submit">Login</button>
    </form>
  );
}

export default Login;
