import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react'
import { IdeasWithUser } from '../api/Service'
import { AuthContext } from '../context/AuthContext';
import { authAxios } from '../api/config';
import { Alert } from 'bootstrap';

export const List = (props) => {
    const { user, setUser, isLogged } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const {ideas, setIdeas} = props
    
    const [pagination, setPagination] = useState(true);

    const formatDate = (date) => {
        if (date.length == 0) return "";
        var date = date.split(" ")
        return date[0];
    }



    useEffect(() => {
        const init = async () => {
            try {
                authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + user.api_token;
                const response = await IdeasWithUser(page);
                setIdeas(ideas.concat(response.data));
                //console.log(response.to, response.total);
                if (response.to == response.total)
                    setPagination(false);
            } catch (error) {
                Alert("ocurrió un error al ejecutar el servicio",error.response.status);
                if(error.response.status == 401){
                    localStorage.clear();
                    setUser({});
                }
            }
        }
        init();
    }, [page]);
    
    

    const loadMore = () => {
        setPage(page + 1);
    }

    return (
        <>
            <div className=''>
                <h5>Listado de opiniones</h5>
                <div className='list'>
                    {ideas.length > 0 && ideas.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className='row'>
                                    <div className='col-12 col-md-2 col-lg-2 d-flex justify-content-center'>
                                        <span className="material-icons icon">
                                            person
                                        </span>
                                    </div>
                                    <div className='col-12 col-md-10 col-lg-10 idea'>
                                        {item.body}
                                    </div>
                                </div>
                                <div className='row author'>
                                    <div className='end-text'>
                                        {formatDate(item.user.created_at)} {item.user.name}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="d-flex flex-row-reverse">
                        {pagination && <button type='button' className='btn-primary sm' onClick={() => loadMore()}>
                            Cargar más
                        </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

