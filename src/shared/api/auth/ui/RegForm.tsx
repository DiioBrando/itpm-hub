import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserStore } from '../../../storages/UserStore.ts';
import {IReg} from "../../../../entities/models/IAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../../../components/Button.tsx";


export default function RegForm() {
  const registration = useUserStore((state) => state.registration);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IReg>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IReg> = async (data): Promise<void> => {
    await registration(data.login, data.email, data.password);
    reset();
    navigate('/login');
  };

  return (
    <div className={'flex justify-center items-center w-full h-full'}>
      <div>
        <form
          method={'post'}
          className={'flex flex-col gap-5'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h1 className={'text-2xl text-center'}>Registration</h1>
          </div>
          <label className={'flex flex-col gap-1.5'}>
            <h2>Login</h2>
            <input
              type={'text'}
              placeholder={'login'}
              {...register('login', {
                required: true,
                maxLength: {
                  value: 8,
                  message: 'max length login 8 symbols',
                },
                minLength: {
                  value: 4,
                  message: 'min length login 4 symbols',
                },
              })}
              className={
                'shadow-customInner shadow-gray-200 rounded-md p-2 outline-none dark:bg-slate-900 text-white'
              }
            />
            <div>
              {errors?.login && (
                <p className={'text-red-500'}>
                  {errors?.login?.message?.toString() ||
                    'This field is required!'}
                </p>
              )}
            </div>
          </label>
          <label className={'flex flex-col gap-1.5'}>
            <h2>Email</h2>
            <input
              type="email"
              placeholder="email"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
                maxLength: {
                  value: 256,
                  message: 'max length email 256 symbols',
                },
                minLength: {
                  value: 2,
                  message: 'max length email 2 symbols',
                },
              })}
              className={
                'shadow-customInner shadow-gray-200 rounded-md p-2 outline-none dark:bg-slate-900 text-white'
              }
            />
            <div>
              {errors?.email && (
                <p className={'text-red-500'}>
                  {errors?.email?.message?.toString() ||
                    'This field is required!'}
                </p>
              )}
            </div>
          </label>
          <label className={'flex flex-col gap-1.5'}>
            <h2>Password</h2>
            <input
              type="password"
              placeholder="password"
              {...register('password', {
                required: true,
                maxLength: {
                  value: 20,
                  message: 'max length symbols 20',
                },
                minLength: {
                  value: 8,
                  message: 'min length symbols 8',
                },
              })}
              className={
                'shadow-customInner shadow-gray-200 rounded-md p-2 outline-none dark:bg-slate-900 text-white'
              }
            />
            <div>
              {errors?.password && (
                <p className="text-red-500">
                  {errors?.password?.message?.toString() ||
                    'This field is required!'}
                </p>
              )}
            </div>
          </label>
          <input
            className={
              'shadow-customInner shadow-gray-200 rounded-md p-2 outline-none' +
              ` ${!isValid ? 'bg-gray-400' : 'hover:bg-grayTransparent cursor-pointer'}`
            }
            type={'submit'}
            disabled={!isValid}
          />
        </form>
        <div className={'h-full w-full justify-center flex mt-4'}>
          <Link to={'/login'}>
            <Button
              setting={{
                buttonStyle: 'p-1 max-w-max h-fit',
                textValue: 'Sign In',
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
