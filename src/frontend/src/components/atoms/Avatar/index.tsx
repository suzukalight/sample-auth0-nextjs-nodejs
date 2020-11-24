import React from 'react';

type InitialAvatarProps = {
  initial: string;
};
export const InitialAvatar: React.FC<InitialAvatarProps> = ({ initial }) => (
  <div className="flex relative w-12 h-12 bg-green-500 justify-center items-center text-xl rounded-full text-white">
    {initial.substr(0, 2)}
  </div>
);

type ImageAvatarProps = {
  src: string;
};
export const ImageAvatar: React.FC<ImageAvatarProps> = ({ src }) => (
  <div className="w-12 h-12">
    <img className="w-full h-full rounded-full" src={src} alt="" />
  </div>
);

type AvatarProps = {
  src?: string;
  initial?: string;
};
export const Avatar: React.FC<AvatarProps> = ({ src, initial }) => {
  if (src) return <ImageAvatar src={src} />;
  if (initial) return <InitialAvatar initial={initial} />;

  return null;
};
