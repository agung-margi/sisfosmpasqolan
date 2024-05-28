import React from "react";

const IndexCardImg = () => {
  const ImageFromLocalStorage = ({ localStorageKey }) => {
    const imageData = localStorage.getItem(localStorageKey);
    if (!imageData) {
      return (
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="Gambar Default"
          className="size-56 object-cover shadow-md "
        />
      );
    }
    return (
      <img
        src={imageData}
        alt="Foto Profil"
        className="size-56 object-cover shadow-md"
      />
    );
  };
  return (
    <div>
      <ImageFromLocalStorage localStorageKey="formData" />
    </div>
  );
};

export default IndexCardImg;
