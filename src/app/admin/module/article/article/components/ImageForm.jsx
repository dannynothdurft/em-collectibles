/* 
  Datei: ImageForm.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: In dieser Komponente werden die Bilder verwaltet.
*/

"use client";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { incrementData } from "../reducers/activeArticel";
import { incrementProducts } from "../reducers/allProducts";

function ImageForm() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.activeArticle);
  const { products } = useSelector((state) => state.allProducts);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  const changePreviewImage = (i) => {
    setPreview(data.images[i]);
  };

  useEffect(() => {
    if (typeof data === "object") {
      if (data.images.length > 0) {
        setPreview(data.images[0]);
      } else {
        setPreview(null);
      }
    }
  }, [data]);

  const handleImages = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    setFilesToBase(fileArray);
  };

  const setFilesToBase = (files) => {
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        setImages((prevImgUrls) => [...prevImgUrls, ...base64Images]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const imageSave = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/article/article/api/updateImage`,
        {
          img: images,
          folder: "pokemon",
          article: data,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateImages = products.map((product) => {
          if (product._id === data._id) {
            const updateProduct = {
              ...data,
              images: response.data.data,
            };
            dispatch(incrementData(updateProduct));
            return updateProduct;
          }
          return product;
        });
        dispatch(incrementProducts(updateImages));
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Upss.. Etwas ist schief gelaufen");
    }
  };

  const deleteImage = async (img) => {
    toast.loading("Loading...");
    const filename = img.substring(
      img.lastIndexOf("/") + 1,
      img.lastIndexOf(".")
    );
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/article/article/api/deleteImage`,
        {
          public_id: filename,
          folder: "pokemon",
          article: data,
          img: img,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateImages = products.map((product) => {
          if (product._id === data._id) {
            const updateProduct = {
              ...data,
              images: response.data.data,
            };
            dispatch(incrementData(updateProduct));
            return updateProduct;
          }
          return product;
        });
        dispatch(incrementProducts(updateImages));
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Upss.. Etwas ist schief gelaufen");
    }
  };

  return (
    <>
      {data !== undefined ? (
        <div className="image--upload--container">
          <div className="image--preview">
            <Image
              src={preview != null ? preview : "/logo192.png"}
              width={398}
              height={298}
              alt="placeholder"
            />
          </div>
          <div className="image--upload--view">
            <input type="file" multiple onChange={handleImages} />
            <div className="all--image">
              {data.images.map((img, index) => {
                return (
                  <div className="image--entry" key={img}>
                    <div className="entry--info">
                      <Image
                        src={img}
                        width={30}
                        height={30}
                        alt="placeholder"
                        onClick={() => changePreviewImage(index)}
                      />
                      <p onClick={() => changePreviewImage(index)}>{img}</p>
                    </div>
                    <div className="entry--delete">
                      <button onClick={() => deleteImage(img)}>
                        <MdDelete className="delete--icon" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="image--upload--button--save" onClick={imageSave}>
            Speichern
          </button>
        </div>
      ) : null}
    </>
  );
}

export default ImageForm;
