import React, { useContext, useEffect, useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import Swal from "sweetalert2";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setForm((form) => ({
        ...form,
        rememberme: true,
        email,
      }));
    }
  }, []);

  const onChange = ({ target }) => {
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    form.rememberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");

    const { email, password } = form;
    const ok = await login(email, password);

    if (!ok) {
      Swal.fire("error", "Verifique el usuario y contraseña");
    }
    //llamar backend
  };

  const todoOk = () => {
    return form.email.length && form.password.length;
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={() => toggleCheck()}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!todoOk()}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
