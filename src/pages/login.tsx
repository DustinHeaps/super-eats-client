import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { isLoggedInVar, jwtToken } from '../apollo';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { useLoginMutation } from '../generated/graphql';


interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const [login, { data, loading }] = useLoginMutation();
  const onSubmit = async (data: LoginForm) => {
    const res = await login({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    });

    if (res.data?.login.success && res.data?.login.token) {
      const { token } = res.data?.login;
      localStorage.setItem('token', token);
      jwtToken(token);
      isLoggedInVar(true);
    }
  };

  return (
    <div className='h-screen flex items-center flex-col mt-10 lg:mt-28'>
      <Helmet>
        <title>Login | Super Eats</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col px-5 items-center'>
        <p className='text-5xl mb-5'>Super <span className='text-lime-600 font-medium'>Eats</span></p> 

        <h4 className='w-full text-3xl font-medium'>Welcome back</h4>
        <div className='bg-white w-full max-w-screen-sm pt-5 pb-8 rounded-lg text-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-5 w-full'>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              type='email'
              placeholder='Email'
              className='input'
              required
            />

            {errors.email?.message && <FormError errorMessage={errors.email?.message} />}

            {errors.email?.type === 'pattern' && <FormError errorMessage={'Please enter a valid email address'} />}

            <input
              {...register('password', { required: 'Password is required' })}
              name='password'
              placeholder='password'
              className='input'
              type='text'
              required
            />

            <Button isValid={isValid} loading={loading} isSubmitting={isSubmitting} actionText={'Log in'} />
            {/* <button role='button'>submit</button> */}
            {errors.password?.message && <FormError errorMessage={errors.password.message} />}
            {data?.login.message && <FormError errorMessage={data.login.message} />}
            <div className='mt-3'>
              New to Super Eats?{' '}
              <Link to='/register' className='text-lime-600 hover:underline'>
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
