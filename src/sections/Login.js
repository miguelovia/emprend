import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { SignIn } from '../api/Service';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { authAxios } from '../api/config';

import { Alert } from '../utilities/Alert';
import { Logo } from './Logo';

export const Login = () => {
  let navigate = useNavigate()
  const { user, setUser, isLogged } = useContext(AuthContext);


  const onSubmit = async (data) => {
    try {
      const response = await SignIn(data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.api_token;
      navigate("/home");
    } catch (error) {
      Alert('El usuario o contraseña son incorrectos',error.response.status);
      if(error.response.status == 401){
        localStorage.clear();
        setUser({});
      }
    }
  }

  return (<div className='container-fluid'>
    <div className='section'>
      
      <div className='row d-flex justify-content-center align-items-center align-items-center h-100 login'>
      
        <div className='col-12 col-md-3  col-lg-3 col-xl-3'>  
          <Logo />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async values => {
              const data = new FormData();
              data.append("email", values.email)
              data.append("password", values.password)
              await onSubmit(data);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("El email no es válido")
                .required("Campo requerido"),
              password: Yup.string()
                .min(8, "La contraseña debe ser de mínimo 8 caracteres")
                .required("Campo requerido")
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
                <form onSubmit={handleSubmit} className=''>
                  <div>
                  <label htmlFor="email" className="d-flex justify-content-end" >
                    Usuario
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

                  <div className="d-flex flex-row-reverse">
                    <button type="submit" disabled={isSubmitting} className="btn-primary">
                      Enviar <span className="material-icons material-icons-size-sm">arrow_forward</span>
                    </button>
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
