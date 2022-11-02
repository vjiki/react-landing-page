/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
// import { Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router';
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import ErrorText from '../../components/mblog/ErrorText';
import Header from '../../components/mblog/Header';
import LoadingComponent, { Loading } from '../../components/mblog/LoadingComponent';
import Navigation from '../../components/mblog/Navigation';
import config from '../../config/config';
import UserContext from '../../contexts/user';
import IBlog from '../../interfaces/blog';
import IUser from '../../interfaces/user';
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import './bootstrap.min.css';
// import './BLOG.module.scss'
import './bootstrap.min.scss';

const MBlogPage: React.FunctionComponent<any> = () => {
    const [_id, setId] = useState<string>('');
    const [blog, setBlog] = useState<IBlog|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { user } = useContext(UserContext).userState;
    // const history = useHistory();
    const navigate = useNavigate();
    const { blogID } = useParams();
    
    useEffect(() => {
        // let _blogId = props.match.params.blogID;
        const _blogId = blogID;

        console.log(_blogId);
        
        if (_blogId) 
        {
            setId(_blogId);
        }
        else
        {
            // history.push('/');
            navigate('/mblog');
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (_id !== '')
            getBlog();
        
        // eslint-disable-next-line
    }, [_id])

    const getBlog = async () => {
        try 
        {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs/read/${_id}`,
            });

            if (response.status === (200 || 304))
            { 
                setBlog(response.data.blog);
            }
            else
            {
                setError(`Unable to retrieve blog ${_id}`);
            }
        } 
        catch (error: any) 
        {
            setError(error.message);
        }
        finally
        {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    const deleteBlog = async () => {
        setDeleting(true);

        try 
        {
            const response = await axios({
                method: 'DELETE',
                url: `${config.server.url}/blogs/${_id}`,
            });

            if (response.status === 201)
            {
                setTimeout(() => {
                    // history.push('/');
                    navigate('/mblog');
                }, 1000); 
            }
            else
            {
                setError(`Unable to retrieve blog ${_id}`);
                setDeleting(false);
            }
        } 
        catch (error: any) 
        {
            setError(error.message);
            setDeleting(false);
        }
    }    

    
    if (loading) return <LoadingComponent>Loading Blog ...</LoadingComponent>;

    if (blog)
    {
        return (
<div className='usebootstrap'>
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                        <ModalBody>
                            {deleting ?
                                <Loading />
                            :
                                "Are you sure you want to delete this blog?"   
                            }
                            <ErrorText error={error} />
                        </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={() => deleteBlog()}>Delete Permanently</Button>
                    <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Header
                    image={blog.picture || undefined}
                    headline={blog.headline}
                    title={blog.title}
                >
                    <p className="text-white">Posted by {(blog.author as IUser).name} on {new Date(blog.createdAt).toLocaleString()}</p>
                </Header>
                <Container className="mt-5">
                    {user._id === (blog.author as IUser)._id &&
                        <Container fluid className="p-0">
                            <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog._id}`}><i className="fas fa-edit mr-2"></i>Edit</Button>
                            <Button color="danger" onClick={() => setModal(true)}><i className="far fa-trash-alt mr-2"></i>Delete</Button>
                            <hr />
                        </Container>
                    }
                    <ErrorText error={error} />
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Container>
            </Container>
            </div>
        )
    }
    
        // return <Redirect to='/' />;
        return <Navigate replace to='/mblog' />;
    
}

// export default withRouter(BlogPage);
export default MBlogPage;