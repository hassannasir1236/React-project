import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
export default function GithubProfile(){
    
    const { username } = useParams();
    // const [data, setData] = useState([]);
    const data = useLoaderData()
    // useEffect(() => {
    //     fetch(`https://api.github.com/users/${username}`)
    //     .then((response) => response.json())
    //     .then((data) => setData(data));
    // }, [username]);
    

    return(
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src={data.avatar_url}
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                    
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            GitHub Profile ({data.name})
                        </h2>
                        <p className="mt-6 text-gray-600">
                            {data.bio}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const githubProfileLoader = async ({ params }) => {
  const response = await fetch(`https://api.github.com/users/${params.username}`);
  return response.json();
};
