import React from 'react';

type ProfileProps = {
  name: string;
  email: string;
  picture: string;
  token: object;
};
const Profile: React.FC<ProfileProps> = ({ name, email, picture }) => (
  <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
    <div className="relative h-40">
      <img
        className="absolute h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        alt=""
      />
    </div>
    <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
      <img className="object-cover w-full h-full" src={picture} alt="" />
    </div>
    <div className="mt-16">
      <h1 className="text-lg text-center font-semibold">{name}</h1>
      <p className="text-sm text-gray-600 text-center">{email}</p>
    </div>
  </div>
);

export default Profile;
