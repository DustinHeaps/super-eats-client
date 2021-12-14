import { Helmet } from 'react-helmet-async';
import { useForm, useFormState } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { useRegisterMutation, UserRole } from '../generated/graphql';
import logo from '../images/logo.svg';

interface RegisterForm {
  email: string;
  password: string;
  role: UserRole;
}

export const Register = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    mode: 'onBlur',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const [registerUser, { data, loading }] = useRegisterMutation();
  const onSubmit = async (data: RegisterForm) => {
    console.log(data);
    const res = await registerUser({
      variables: {
        input: {
          email: data.email,
          password: data.password,
          role: data.role,
        },
      },
    });
    if (res.data?.register.success) {
      <Redirect to='/' />;
    }
  };
  const onError = () => {};
  return (
    <div className='h-screen flex items-center flex-col mt-10 lg:mt-28'>
      <Helmet>
        <title>Register | Super Eats</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col px-5 items-center'>
        <img src={logo} className='w-52 mb-5 ' alt='' />
        <h4 className='w-full text-3xl font-medium'>Let's Get Started</h4>
        <div className='bg-white w-full max-w-lg pt-5 pb-8 rounded-lg text-center'>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col mt-5 w-full'>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              name='email'
              placeholder='Email'
              className='input'
              type='text'
              required
            />
            {errors.email?.message && <FormError errorMessage={errors.email.message} />}
            {errors.email?.type && <FormError errorMessage={'Please enter valid email address'} />}
            <input
              {...register('password', { required: 'Password is required' })}
              name='password'
              placeholder='password'
              className='input'
              type='text'
              required
            />

            <select {...register('role', { required: true })} className='input' name='role' required>
              {Object.keys(UserRole).map((role, i) => {
                return (
                  <option key={i} value={role}>
                    {role}
                  </option>
                );
              })}
            </select>
            <Button isValid={isValid} loading={loading} actionText={'Create Account'} />
            {errors.password?.message && <FormError errorMessage={errors.password.message} />}
            {data?.register.message && <FormError errorMessage={data.register.message} />}
            <div className='mt-3'>
              Already have an account?{' '}
              <Link to='/' className='text-lime-600 hover:underline'>
                Login now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};