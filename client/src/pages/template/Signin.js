import React from "react"

export const Signin = ({changeAuthMode, submit}) => {
  const submitForm = (event) => {
    event.preventDefault();

    submit({
      username: document.getElementById('email').value,
      password: document.getElementById('password').value,
    })
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitForm}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Entrar</h3>
          <div className="text-center">
            Ainda não se registrou?{" "}
            <span className="link-primary" onClick={changeAuthMode} style={{cursor:'pointer'}}>
              Registrar-se
            </span>
          </div>
          <div className="form-group mt-3">
            <label>
              E-mail
              <input
                type="email"
                id="email"
                className="form-control mt-1"
                placeholder="email@email.com"
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
                placeholder="Sua senha"
              />
            </label>
            
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>
          <p className="text-center mt-2">
            Esqueceu a <a href="#">senha?</a>
          </p>
        </div>
      </form>
    </div>
  )
}