import React from "react";
import { useForm } from "react-hook-form";
import userApi from "../../api/userApi";
import queryString from "query-string";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const datad = await userApi.login(data);
    window.localStorage.setItem("auth-token", datad.token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} />
      {errors.username && <span>This field is required</span>}

      <input {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Login;
