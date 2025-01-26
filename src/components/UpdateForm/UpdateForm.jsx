import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextError } from "../TextError/TextError";
import { FiCheck, FiImage } from "react-icons/fi";
import {
  UploadAvatar,
  UploadImage,
} from "../../redux/actions/uploadImageActions";
import toast from "react-hot-toast";
import { updateDetails } from "../../redux/actions/authActions";
import {
  avatarOptions,
  defaultAvatar,
  defaultBio,
  defaultCover,
  defaultPortfolio,
  defaultUsername,
} from "../../config/Constants";

export const UpdateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const initialValues = {
    username: user?.username || "",
    bio: user?.bio || "",
    portfolio: user?.website || "",
    avatar: user?.avatar || "",
    cover: user?.cover || "",
  };

  const validationScheme = Yup.object({
    username: Yup.string().required("Please select a username"),
    bio: Yup.string().required("Can't be empty"),
    portfolio: Yup.string()
      .url("Please enter a valid website")
      .required("Can't be empty"),
  });

  const onSubmit = (values) => {
    const { username, bio, portfolio } = values;
    if (avatarPreview) {
      const profile = {
        username,
        bio,
        portfolio,
        avatar: avatarPreview,
        cover: coverPreview,
      };
      updateDetails(profile, token, dispatch, navigate);
    } else {
      toast.error("Please upload an avatar");
    }
  };

  const handleImage = async (file) => {
    const link =
      file && (await UploadAvatar(`users/${token}/user-avatar.jpg`, file));
    setAvatarPreview(link);
  };

  const handleCover = async (file) => {
    const link =
      file && (await UploadImage(`users/${token}/user-cover.jpg`, file));
    setCoverPreview(link);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationScheme}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="mx-auto flex h-fit w-fit flex-col items-center justify-center rounded-md px-5 pb-6">
            <h1 className="my-3 px-8 text-3xl font-bold">
              Update your profile
            </h1>
            <p className="mb-6 text-gray-500">
              Complete your profile to get verified.
            </p>
            <div className="mb-4 flex items-start gap-4">
              <div>
                <div className="group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
                  <label className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 text-gray-500 hover:border-blue-300 hover:bg-blue-50">
                    <FiImage className="text-4xl" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImage(e.target.files[0])}
                    />
                  </label>
                </div>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Upload Avatar
                </p>
              </div>
              <div>
                <div className="group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
                  <label className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 text-gray-500 hover:border-blue-300 hover:bg-blue-50">
                    <FiImage className="text-4xl" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleCover(e.target.files[0])}
                    />
                  </label>
                </div>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Upload Cover
                </p>
              </div>
            </div>
            <p className="mb-2 text-lg font-semibold text-zinc-700">
              Fill your Details
            </p>
            <div className="relative mb-2 flex h-14 w-[80%] flex-col items-center justify-center">
              <Field
                type="text"
                label="username"
                name="username"
                placeholder={
                  initialValues.username
                    ? `@${initialValues.username}`
                    : defaultUsername
                }
                className="relative flex w-[80%] rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:required:border-pink-500 focus:required:ring-pink-500"
              />
              <ErrorMessage name="username" component={TextError} />
            </div>
            <div className="relative mb-2 flex h-14 w-[80%] flex-col items-center justify-center">
              <Field
                type="text"
                label="bio"
                name="bio"
                placeholder={
                  initialValues.bio ? `${initialValues.bio}` : defaultBio
                }
                className="relative flex w-[80%] rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:required:border-pink-500 focus:required:ring-pink-500"
              />
              <ErrorMessage name="bio" component={TextError} />
            </div>
            <div className="relative mb-2 flex h-14 w-[80%] flex-col items-center justify-center">
              <Field
                type="text"
                label="portfolio"
                name="portfolio"
                placeholder={
                  initialValues.portfolio
                    ? `${initialValues.portfolio}`
                    : defaultPortfolio
                }
                className="relative flex w-[80%] rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:required:border-pink-500 focus:required:ring-pink-500"
              />
              <ErrorMessage name="portfolio" component={TextError} />
            </div>
            <button
              type="submit"
              disabled={!formik.isValid}
              className="my-3 flex w-2/3 items-center justify-center gap-3 rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 disabled:bg-slate-400"
            >
              Update Profile
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
