import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import Swal from "sweetalert2";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
  });

  const onChange = ({ target }) => {
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, nombre } = form;
    const ok = await register(nombre, email, password);

    if (!ok) {
      Swal.fire("error", "Verifique el usuario y contraseña", "error");
    }

    Swal.fire("success", "Cuenta creada correctamente", "success");
  };

  const todoOk = () => {
    return form.email.length && form.password.length && form.nombre.length;
  };
  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Nombre"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn" disabled={!todoOk()}>
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
