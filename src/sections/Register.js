import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { SignUp } from '../api/Service';
import { render } from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Logo } from './Logo';
import { Alert } from '../utilities/Alert';
import { authAxios } from '../api/config';

export const Register = () => {
  let navigate = useNavigate()
  const { user, setUser, isLogged } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await SignUp(data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.api_token;
      navigate("/home");
      Alert("Datos guardados correctamente",200);
    } catch (error) {
      Alert("Ocurrió un error al intentar guardar usuario",error.response.status);
      if(error.response.status == 401){
        localStorage.clear();
        setUser({});
      }
    }
  }


  return (
    <div className='container-fluid'>
      <div className='section'>
        <div className='row d-flex justify-content-center align-items-center h-100 register'>
          <div className='col-12 col-md-3  col-lg-3 col-xl-3'>
          <Logo />
            <Formik
              initialValues={{ name: "", email: "", password: "", password_confirmation: "" }}
              onSubmit={async values => {
                await onSubmit(values);
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                .required("Campo requerido"),
                email: Yup.string()
                  .email("El email no es válido")
                  .required("Campo requerido"),
                password: Yup.string()
                  .min(8, "El password debe ser mínimo de 8 caracteres")
                  .required("Campo requerido"),
                  password_confirmation: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales'),
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset
                } = props;
                return (
                  <form onSubmit={handleSubmit} >
                    <div>
                      <label htmlFor="name" className="d-flex justify-content-end">
                        Nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"

                      />
                      {errors.name && touched.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="d-flex justify-content-end">
                        Email
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                      {errors.email && touched.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="d-flex justify-content-end">
                        Contraseña
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                      {errors.password && touched.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password_confirmation" className="d-flex justify-content-end">
                        Confirmar contraseña
                      </label>
                      <input
                        id="password_confirmation"
                        type="password"
                        value={values.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                      />
                      {errors.password_confirmation && touched.password_confirmation && (
                        <div className="text-danger">{errors.password_confirmation}</div>
                      )}
                    </div>
                    <div>
                      <div className="d-flex flex-row-reverse">
                        <button type="submit" disabled={isSubmitting} className="btn-primary">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
