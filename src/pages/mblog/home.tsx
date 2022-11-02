/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import BlogPreview from '../../components/mblog/BlogPreview';
import ErrorText from '../../components/mblog/ErrorText';
import Header from '../../components/mblog/Header';
import LoadingComponent from '../../components/mblog/LoadingComponent';
import Navigation from '../../components/mblog/Navigation';
import config from '../../config/config';
import IBlog from '../../interfaces/blog';
import IUser from '../../interfaces/user';
// import './BLOG.module.scss'
import './bootstrap.min.scss'


const MHomePage: React.FunctionComponent<{}> = props => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('');
    
    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = async () => {
        try 
        {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs`,
            });

            if (response.status === (200 || 304))
            {
                const blogs = response.data.blogs as IBlog[];
                blogs.sort((x,y) => y.updatedAt.localeCompare(x.updatedAt));

                setBlogs(blogs);
            }
            else
            {
                setError('Unable to retrieve blogs');
            }
        } 
        catch (error: any) 
        {
            setError(error.message);
        }
        finally
        {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    if (loading) 
    {
        return <LoadingComponent>Loading blogs...</LoadingComponent>
    }

    return (
      <div className='usebootstrap'>
        <Container fluid className="p-0">
            <Navigation />
            <Header
                headline="Check out what people have to say"
                title="A Nerdy Blog Website"
            />
            <Container className="mt-5">
                {blogs.length === 0 && <p>There are no blogs yet.  You should <Link to="/edit">post</Link> one 😊.</p>}
                {blogs.map((blog, index) => {
                    return (
                        <div key={index}>
                            <BlogPreview
                                _id={blog._id}
                                author={(blog.author as IUser).name}
                                headline={blog.headline}
                                title={blog.title}
                                createdAt={blog.createdAt}
                                updatedAt={blog.updatedAt}
                            />
                            <hr />
                        </div>
                    );
                })}
                <ErrorText error={error} />
            </Container>
        </Container>
        </div>
    )
}

export default MHomePage;