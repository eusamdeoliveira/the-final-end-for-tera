import React, { useState } from "react"

const roleColorMapper = {
  true: '#f5f5f5',
  false: '#78a7c8'
}

export const Signup = ({changeAuthMode, submit}) => {
  let [role, setRole] = useState(true)

  const validateForm = (event) => {
    event.preventDefault()
    const n = document.getElementById("name");
    const e = document.getElementById("email");
    const p = document.getElementById("password");
    const cp = document.getElementById("confirmPassword");

    if (cp.value !== p.value) {
      cp.setCustomValidity("As senhas não conferem");
      cp.reportValidity();
      return;
    }
    submit({
      role: role ? 1 : 2,
      name: n.value,
      username: e.value,
      password: p.value
    })
  }

  return (
  <div style={{backgroundColor: roleColorMapper[role]}} className="Auth-form-container">
    <form className="Auth-form" onSubmit={validateForm}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Cadastre-se</h3>
        <div className="text-center">
          Já é cadastrado?{" "}
          <span className="link-primary" onClick={changeAuthMode} style={{cursor:'pointer'}}>
            Entrar
          </span>
        </div>
        <div className="form-group mt-3">
          <label>
            Nome Completo
            <input
              type="text"
              id="name"
              className="form-control mt-1"
              placeholder="Ex: Samara de Oliveira"
              required
            />
          </label>
          
        </div>
        <div className="form-group mt-3">
          <label>
            E-mail
            <input
              type="email"
              id="email"
              className="form-control mt-1"
              placeholder="email@email.com"
              required
            />
          </label>
          
        </div>
        <div className="form-group mt-3">
          <label>
            Senha
            <input
              type="password"
              id="password"
              className="form-control mt-1"
              placeholder="Senha"
              minlength="6"
              required
            />
          </label>
          
        </div>
        <div className="form-group mt-3">
          <label>
            Confirmar Senha
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirmar Senha"
              id="confirmPassword"
              onChange={
                (event) => {
                  event.target.setCustomValidity("");
                  event.target.reportValidity();
                }
              }
            />
          </label>
          
        </div>
        <div className="form-group mt-3">
          <label>
            <input
              type="checkbox"
              checked={role}
              onChange={() => setRole(!role)}
              style={{marginRight: '5px'}}
            />
            {role ? 'Professor' : 'Aluno'}
          </label>
          
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  </div>
)}