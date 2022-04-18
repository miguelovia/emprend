import { Formik, yupToFormErrors } from 'formik';
import React, { useContext } from 'react'
import * as Yup from "yup";
import { NewIdea } from '../api/Service';
import { AuthContext } from '../context/AuthContext';
import { Alert } from '../utilities/Alert';
import { useNavigate } from "react-router-dom";

export const Idea = (props) => {
    const {user,setUser} = useContext(AuthContext);
    let navigate = useNavigate()
    

    const onSubmit = async(data) =>{
        try {
            let response = await NewIdea(data);
            console.log(response);
            Alert('Datos guardados correctamente',200);

        }
        catch (error) {
            Alert('Ocurrió un error al guardar idea',error.response.status);
            if(error.response.status == 401){
                localStorage.clear();
                setUser({});
            }
        }
    }

    return ( <div className='container'>
    <div className='section'>
        <div className='form-idea'>
            <Formik
            initialValues={{idea:""}}
            onSubmit={async (values,{resetForm}) => {
                const data = new FormData();
                data.append("body", values.idea);
                data.append("id", user.id);
                await onSubmit(data);
                resetForm({values:''});
            }}
            validationSchema={Yup.object().shape({
                idea:Yup.string()
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
                    <form onSubmit={handleSubmit}>
                        <h5>
                            COMPARTE TU IDEA
                        </h5>
                        <textarea
                            id="idea"
                            placeholder='Idea'
                            type="text"
                            value={values.idea}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                            rows="10"
                        />
                        {errors.idea && touched.idea && (
                            <div className="text-danger">{errors.idea}</div>
                        )}

                        <div className="d-flex flex-row-reverse">
                        <button type="submit" disabled={isSubmitting} className="btn-primary mt-1">
                            Compartir <span className="material-icons material-icons-size-sm">arrow_forward</span>
                        </button>
                        </div>
                    </form>
                   
                    
                );
            }}       
            </Formik>
            </div>
            </div>
        </div>
    )
}
