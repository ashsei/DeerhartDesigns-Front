import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser'

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '', 
        password: '',
        error: false,
        success: false
    })

    const {token} = isAuthenticated()
    const {name, email, password, error, success} = values

    const init = (userId) => {
        console.log(userId)
        read(userId, token).then(data => {
            if (data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    }, [])

    return (
        <Layout title="Deerhart Designs" description="Kangaroo Deerhart's Art" className="container-fluid">
            <h2>Update your profile</h2>
            {JSON.stringify(values)}
        </Layout>
    )
}

export default Profile;