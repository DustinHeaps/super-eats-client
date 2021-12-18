import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CategoriesResponse = {
  __typename?: 'CategoriesResponse';
  categories?: Maybe<Array<Category>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['String'];
  restaurantCount: Scalars['Int'];
  restaurants: Array<Restaurant>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CategoryInput = {
  page?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  category?: Maybe<Category>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type CreateDishInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  options?: Maybe<Array<DishOptionInputType>>;
  photo?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurantId: Scalars['Int'];
};

export type CreateDishResponse = {
  __typename?: 'CreateDishResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
  restaurantId: Scalars['Int'];
};

export type CreateOrderItemInput = {
  dishId: Scalars['Int'];
  options?: Maybe<Array<OrderItemOptionInputType>>;
};

export type CreateOrderResponse = {
  __typename?: 'CreateOrderResponse';
  message?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type CreatePaymentInput = {
  restaurantId: Scalars['Int'];
  transactionId: Scalars['String'];
};

export type CreatePaymentResponse = {
  __typename?: 'CreatePaymentResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateRestaurantInput = {
  address: Scalars['String'];
  categoryName: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type CreateRestaurantResponse = {
  __typename?: 'CreateRestaurantResponse';
  message?: Maybe<Scalars['String']>;
  restaurantId: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type DeleteDishInput = {
  dishId: Scalars['Int'];
};

export type DeleteDishResponse = {
  __typename?: 'DeleteDishResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteRestaurantInput = {
  restaurantId: Scalars['Int'];
};

export type Dish = {
  __typename?: 'Dish';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  options?: Maybe<Array<DishOption>>;
  photo?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurant?: Maybe<Restaurant>;
  updatedAt: Scalars['DateTime'];
};

export type DishChoice = {
  __typename?: 'DishChoice';
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishChoiceInputType = {
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOption = {
  __typename?: 'DishOption';
  choices?: Maybe<Array<DishChoice>>;
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOptionInputType = {
  choices?: Maybe<Array<DishChoiceInputType>>;
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type EditDishInput = {
  description?: Maybe<Scalars['String']>;
  dishId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<DishOptionInputType>>;
  price?: Maybe<Scalars['Int']>;
};

export type EditDishResponse = {
  __typename?: 'EditDishResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type EditOrderInput = {
  id: Scalars['Float'];
  status: OrderStatus;
};

export type EditOrderResponse = {
  __typename?: 'EditOrderResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type EditProfileInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type EditProfileResponse = {
  __typename?: 'EditProfileResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type GetOrderInput = {
  id: Scalars['Float'];
};

export type GetOrderResponse = {
  __typename?: 'GetOrderResponse';
  message?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  success: Scalars['Boolean'];
};

export type GetOrdersInput = {
  status?: Maybe<OrderStatus>;
};

export type GetOrdersResponse = {
  __typename?: 'GetOrdersResponse';
  message?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  success: Scalars['Boolean'];
};

export type GetPaymentsResponse = {
  __typename?: 'GetPaymentsResponse';
  message?: Maybe<Scalars['String']>;
  payments?: Maybe<Array<Payment>>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDish: CreateDishResponse;
  createOrder: CreateOrderResponse;
  createPayment: CreatePaymentResponse;
  createRestaurant: CreateRestaurantResponse;
  deleteDish: DeleteDishResponse;
  deleteRestaurant: UpdateRestaurantResponse;
  editDish: EditDishResponse;
  editOrder: EditOrderResponse;
  editProfile: EditProfileResponse;
  login: LoginResponse;
  potatoReady: Scalars['Boolean'];
  register: RegisterResponse;
  takeOrder: TakeOrderResponse;
  updateRestaurant: UpdateRestaurantResponse;
  verifyEmail: VerifyEmailResponse;
};


export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};


export type MutationDeleteRestaurantArgs = {
  input: DeleteRestaurantInput;
};


export type MutationEditDishArgs = {
  input: EditDishInput;
};


export type MutationEditOrderArgs = {
  input: EditOrderInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};


export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MyRestaurantInput = {
  id: Scalars['Float'];
};

export type MyRestaurantResponse = {
  __typename?: 'MyRestaurantResponse';
  message?: Maybe<Scalars['String']>;
  restaurant?: Maybe<Restaurant>;
  success: Scalars['Boolean'];
};

export type MyRestaurantsResponse = {
  __typename?: 'MyRestaurantsResponse';
  message?: Maybe<Scalars['String']>;
  restaurants: Array<Restaurant>;
  success: Scalars['Boolean'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  customer?: Maybe<User>;
  driver?: Maybe<User>;
  id: Scalars['Float'];
  items: Array<OrderItem>;
  restaurant?: Maybe<Restaurant>;
  status: OrderStatus;
  total?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime'];
  dish: Dish;
  id: Scalars['Float'];
  options?: Maybe<Array<OrderItemOption>>;
  updatedAt: Scalars['DateTime'];
};

export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  choice?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type OrderItemOptionInputType = {
  choice?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp'
}

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  restaurant: Restaurant;
  restaurantId: Scalars['Int'];
  transactionId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  allCategories: CategoriesResponse;
  allRestaurants: RestaurantsResponse;
  category: CategoryResponse;
  getOrder: GetOrderResponse;
  getOrders: GetOrdersResponse;
  getPayments: GetPaymentsResponse;
  me: User;
  myRestaurant: MyRestaurantResponse;
  myRestaurants: MyRestaurantsResponse;
  restaurant: RestaurantResponse;
  searchRestaurants: SearchRestaurantResponse;
  userProfile: UserProfileResponse;
};


export type QueryAllRestaurantsArgs = {
  input: RestaurantsInput;
};


export type QueryCategoryArgs = {
  input: CategoryInput;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryMyRestaurantArgs = {
  input: MyRestaurantInput;
};


export type QueryRestaurantArgs = {
  input: RestaurantInput;
};


export type QuerySearchRestaurantsArgs = {
  input: SearchRestaurantInput;
};


export type QueryUserProfileArgs = {
  input: UserProfileInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String'];
  category?: Maybe<Category>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  image: Scalars['String'];
  isPromoted: Scalars['Boolean'];
  menu?: Maybe<Array<Dish>>;
  name: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  owner: User;
  promotedUntil?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type RestaurantInput = {
  restaurantId: Scalars['Float'];
};

export type RestaurantResponse = {
  __typename?: 'RestaurantResponse';
  message?: Maybe<Scalars['String']>;
  restaurant?: Maybe<Restaurant>;
  success: Scalars['Boolean'];
};

export type RestaurantsInput = {
  page?: Maybe<Scalars['Int']>;
};

export type RestaurantsResponse = {
  __typename?: 'RestaurantsResponse';
  message?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Restaurant>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type SearchRestaurantInput = {
  page?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};

export type SearchRestaurantResponse = {
  __typename?: 'SearchRestaurantResponse';
  message?: Maybe<Scalars['String']>;
  restaurants?: Maybe<Array<Restaurant>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  cookedOrders: Order;
  orderUpdates: Order;
  pendingOrders: Order;
};


export type SubscriptionOrderUpdatesArgs = {
  input: UpdateOrderInput;
};

export type TakeOrderInput = {
  id: Scalars['Float'];
};

export type TakeOrderResponse = {
  __typename?: 'TakeOrderResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateOrderInput = {
  id: Scalars['Float'];
};

export type UpdateRestaurantInput = {
  address?: Maybe<Scalars['String']>;
  categoryName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
};

export type UpdateRestaurantResponse = {
  __typename?: 'UpdateRestaurantResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  orders: Array<Order>;
  password: Scalars['String'];
  payments: Array<Payment>;
  restaurants: Array<Restaurant>;
  rides: Array<Order>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type UserProfileInput = {
  userId: Scalars['Float'];
};

export type UserProfileResponse = {
  __typename?: 'UserProfileResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export enum UserRole {
  Client = 'Client',
  Driver = 'Driver',
  Owner = 'Owner'
}

export type VerifyEmailInput = {
  code: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RestaurantFragment = { __typename?: 'Restaurant', id: number, name: string, image: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null | undefined, menu?: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null | undefined, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null | undefined, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null | undefined }> | null | undefined }> | null | undefined }> | null | undefined, orders?: Array<{ __typename?: 'Order', id: number, createdAt: any, total?: number | null | undefined }> | null | undefined };

export type CategoryPartsFragment = { __typename?: 'Category', id: number, name: string, image: string, slug: string, restaurantCount: number };

export type DishPartsFragment = { __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null | undefined, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null | undefined, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null | undefined }> | null | undefined }> | null | undefined };

export type OrderPartsFragment = { __typename?: 'Order', id: number, createdAt: any, total?: number | null | undefined };

export type FullOrderPartsFragment = { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null | undefined, driver?: { __typename?: 'User', email: string } | null | undefined, customer?: { __typename?: 'User', email: string } | null | undefined, restaurant?: { __typename?: 'Restaurant', name: string } | null | undefined };

export type CreateDishMutationVariables = Exact<{
  input: CreateDishInput;
}>;


export type CreateDishMutation = { __typename?: 'Mutation', createDish: { __typename?: 'CreateDishResponse', success: boolean, message?: string | null | undefined } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderResponse', success: boolean, message?: string | null | undefined, orderId?: number | null | undefined } };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'CreatePaymentResponse', success: boolean, message?: string | null | undefined } };

export type CreateRestaurantMutationVariables = Exact<{
  input: CreateRestaurantInput;
}>;


export type CreateRestaurantMutation = { __typename?: 'Mutation', createRestaurant: { __typename?: 'CreateRestaurantResponse', success: boolean, message?: string | null | undefined, restaurantId: number } };

export type DeleteRestaurantMutationVariables = Exact<{
  input: DeleteRestaurantInput;
}>;


export type DeleteRestaurantMutation = { __typename?: 'Mutation', deleteRestaurant: { __typename?: 'UpdateRestaurantResponse', success: boolean, message?: string | null | undefined } };

export type EditOrderMutationVariables = Exact<{
  input: EditOrderInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', editOrder: { __typename?: 'EditOrderResponse', success: boolean, message?: string | null | undefined } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileResponse', message?: string | null | undefined, success: boolean } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token?: string | null | undefined, success: boolean, message?: string | null | undefined } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', message?: string | null | undefined, success: boolean } };

export type TakeOrderMutationVariables = Exact<{
  input: TakeOrderInput;
}>;


export type TakeOrderMutation = { __typename?: 'Mutation', takeOrder: { __typename?: 'TakeOrderResponse', success: boolean, message?: string | null | undefined } };

export type UpdateRestaurantMutationVariables = Exact<{
  input: UpdateRestaurantInput;
}>;


export type UpdateRestaurantMutation = { __typename?: 'Mutation', updateRestaurant: { __typename?: 'UpdateRestaurantResponse', success: boolean, message?: string | null | undefined } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailResponse', success: boolean, message?: string | null | undefined } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', allCategories: { __typename?: 'CategoriesResponse', success: boolean, message?: string | null | undefined, categories?: Array<{ __typename?: 'Category', slug: string, name: string, restaurantCount: number, id: number, image: string }> | null | undefined } };

export type GetCategoryQueryVariables = Exact<{
  input: CategoryInput;
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'CategoryResponse', success: boolean, message?: string | null | undefined, totalPages?: number | null | undefined, category?: { __typename?: 'Category', slug: string, name: string, id: number, restaurantCount: number, restaurants: Array<{ __typename?: 'Restaurant', id: number, name: string, image: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null | undefined, menu?: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null | undefined, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null | undefined, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null | undefined }> | null | undefined }> | null | undefined }> | null | undefined, orders?: Array<{ __typename?: 'Order', id: number, createdAt: any, total?: number | null | undefined }> | null | undefined }> } | null | undefined } };

export type GetOrderQueryVariables = Exact<{
  input: GetOrderInput;
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'GetOrderResponse', success: boolean, message?: string | null | undefined, order?: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null | undefined, driver?: { __typename?: 'User', email: string } | null | undefined, customer?: { __typename?: 'User', email: string } | null | undefined, restaurant?: { __typename?: 'Restaurant', name: string } | null | undefined } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, role: UserRole, verified: boolean } };

export type MyRestaurantQueryVariables = Exact<{
  input: MyRestaurantInput;
}>;


export type MyRestaurantQuery = { __typename?: 'Query', myRestaurant: { __typename?: 'MyRestaurantResponse', success: boolean, message?: string | null | undefined, restaurant?: { __typename?: 'Restaurant', id: number, name: string, image: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null | undefined, menu?: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null | undefined, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null | undefined, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null | undefined }> | null | undefined }> | null | undefined }> | null | undefined, orders?: Array<{ __typename?: 'Order', id: number, createdAt: any, total?: number | null | undefined }> | null | undefined } | null | undefined } };

export type MyRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRestaurantsQuery = { __typename?: 'Query', myRestaurants: { __typename?: 'MyRestaurantsResponse', success: boolean, message?: string | null | undefined, restaurants: Array<{ __typename?: 'Restaurant', image: string, name: string, id: number, category?: { __typename?: 'Category', name: string } | null | undefined }> } };

export type RestaurantQueryVariables = Exact<{
  input: RestaurantInput;
}>;


export type RestaurantQuery = { __typename?: 'Query', restaurant: { __typename?: 'RestaurantResponse', success: boolean, message?: string | null | undefined, restaurant?: { __typename?: 'Restaurant', id: number, name: string, image: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null | undefined, menu?: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null | undefined, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null | undefined, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null | undefined }> | null | undefined }> | null | undefined }> | null | undefined, orders?: Array<{ __typename?: 'Order', id: number, createdAt: any, total?: number | null | undefined }> | null | undefined } | null | undefined } };

export type AllRestaurantsQueryVariables = Exact<{
  input: RestaurantsInput;
}>;


export type AllRestaurantsQuery = { __typename?: 'Query', allRestaurants: { __typename?: 'RestaurantsResponse', success: boolean, message?: string | null | undefined, totalPages?: number | null | undefined, totalResults?: number | null | undefined, results?: Array<{ __typename?: 'Restaurant', id: number, name: string, image: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null | undefined, menu?: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null | undefined, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null | undefined, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null | undefined }> | null | undefined }> | null | undefined }> | null | undefined, orders?: Array<{ __typename?: 'Order', id: number, createdAt: any, total?: number | null | undefined }> | null | undefined }> | null | undefined } };

export type SearchRestaurantsQueryVariables = Exact<{
  input: SearchRestaurantInput;
}>;


export type SearchRestaurantsQuery = { __typename?: 'Query', searchRestaurants: { __typename?: 'SearchRestaurantResponse', message?: string | null | undefined, success: boolean, totalPages?: number | null | undefined, totalResults?: number | null | undefined, restaurants?: Array<{ __typename?: 'Restaurant', name: string, id: number, image: string }> | null | undefined } };

export type CookedOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CookedOrdersSubscription = { __typename?: 'Subscription', cookedOrders: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null | undefined, driver?: { __typename?: 'User', email: string } | null | undefined, customer?: { __typename?: 'User', email: string } | null | undefined, restaurant?: { __typename?: 'Restaurant', name: string } | null | undefined } };

export type OrderUpdatesSubscriptionVariables = Exact<{
  input: UpdateOrderInput;
}>;


export type OrderUpdatesSubscription = { __typename?: 'Subscription', orderUpdates: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null | undefined, driver?: { __typename?: 'User', email: string } | null | undefined, customer?: { __typename?: 'User', email: string } | null | undefined, restaurant?: { __typename?: 'Restaurant', name: string } | null | undefined } };

export const DishPartsFragmentDoc = gql`
    fragment DishParts on Dish {
  id
  name
  price
  photo
  description
  options {
    name
    extra
    choices {
      name
      extra
    }
  }
}
    `;
export const OrderPartsFragmentDoc = gql`
    fragment OrderParts on Order {
  id
  createdAt
  total
}
    `;
export const RestaurantFragmentDoc = gql`
    fragment Restaurant on Restaurant {
  id
  name
  image
  category {
    name
  }
  address
  isPromoted
  menu {
    ...DishParts
  }
  orders {
    ...OrderParts
  }
}
    ${DishPartsFragmentDoc}
${OrderPartsFragmentDoc}`;
export const CategoryPartsFragmentDoc = gql`
    fragment CategoryParts on Category {
  id
  name
  image
  slug
  restaurantCount
}
    `;
export const FullOrderPartsFragmentDoc = gql`
    fragment FullOrderParts on Order {
  id
  status
  total
  driver {
    email
  }
  customer {
    email
  }
  restaurant {
    name
  }
}
    `;
export const CreateDishDocument = gql`
    mutation createDish($input: CreateDishInput!) {
  createDish(input: $input) {
    success
    message
  }
}
    `;
export type CreateDishMutationFn = Apollo.MutationFunction<CreateDishMutation, CreateDishMutationVariables>;

/**
 * __useCreateDishMutation__
 *
 * To run a mutation, you first call `useCreateDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDishMutation, { data, loading, error }] = useCreateDishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDishMutation(baseOptions?: Apollo.MutationHookOptions<CreateDishMutation, CreateDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDishMutation, CreateDishMutationVariables>(CreateDishDocument, options);
      }
export type CreateDishMutationHookResult = ReturnType<typeof useCreateDishMutation>;
export type CreateDishMutationResult = Apollo.MutationResult<CreateDishMutation>;
export type CreateDishMutationOptions = Apollo.BaseMutationOptions<CreateDishMutation, CreateDishMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    success
    message
    orderId
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreatePaymentDocument = gql`
    mutation createPayment($input: CreatePaymentInput!) {
  createPayment(input: $input) {
    success
    message
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const CreateRestaurantDocument = gql`
    mutation createRestaurant($input: CreateRestaurantInput!) {
  createRestaurant(input: $input) {
    success
    message
    restaurantId
  }
}
    `;
export type CreateRestaurantMutationFn = Apollo.MutationFunction<CreateRestaurantMutation, CreateRestaurantMutationVariables>;

/**
 * __useCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRestaurantMutation, { data, loading, error }] = useCreateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CreateRestaurantDocument, options);
      }
export type CreateRestaurantMutationHookResult = ReturnType<typeof useCreateRestaurantMutation>;
export type CreateRestaurantMutationResult = Apollo.MutationResult<CreateRestaurantMutation>;
export type CreateRestaurantMutationOptions = Apollo.BaseMutationOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>;
export const DeleteRestaurantDocument = gql`
    mutation deleteRestaurant($input: DeleteRestaurantInput!) {
  deleteRestaurant(input: $input) {
    success
    message
  }
}
    `;
export type DeleteRestaurantMutationFn = Apollo.MutationFunction<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;

/**
 * __useDeleteRestaurantMutation__
 *
 * To run a mutation, you first call `useDeleteRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRestaurantMutation, { data, loading, error }] = useDeleteRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>(DeleteRestaurantDocument, options);
      }
export type DeleteRestaurantMutationHookResult = ReturnType<typeof useDeleteRestaurantMutation>;
export type DeleteRestaurantMutationResult = Apollo.MutationResult<DeleteRestaurantMutation>;
export type DeleteRestaurantMutationOptions = Apollo.BaseMutationOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export const EditOrderDocument = gql`
    mutation editOrder($input: EditOrderInput!) {
  editOrder(input: $input) {
    success
    message
  }
}
    `;
export type EditOrderMutationFn = Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>;

/**
 * __useEditOrderMutation__
 *
 * To run a mutation, you first call `useEditOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderMutation, { data, loading, error }] = useEditOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderMutation, EditOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderMutation, EditOrderMutationVariables>(EditOrderDocument, options);
      }
export type EditOrderMutationHookResult = ReturnType<typeof useEditOrderMutation>;
export type EditOrderMutationResult = Apollo.MutationResult<EditOrderMutation>;
export type EditOrderMutationOptions = Apollo.BaseMutationOptions<EditOrderMutation, EditOrderMutationVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    message
    success
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token
    success
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    message
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TakeOrderDocument = gql`
    mutation takeOrder($input: TakeOrderInput!) {
  takeOrder(input: $input) {
    success
    message
  }
}
    `;
export type TakeOrderMutationFn = Apollo.MutationFunction<TakeOrderMutation, TakeOrderMutationVariables>;

/**
 * __useTakeOrderMutation__
 *
 * To run a mutation, you first call `useTakeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeOrderMutation, { data, loading, error }] = useTakeOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTakeOrderMutation(baseOptions?: Apollo.MutationHookOptions<TakeOrderMutation, TakeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TakeOrderMutation, TakeOrderMutationVariables>(TakeOrderDocument, options);
      }
export type TakeOrderMutationHookResult = ReturnType<typeof useTakeOrderMutation>;
export type TakeOrderMutationResult = Apollo.MutationResult<TakeOrderMutation>;
export type TakeOrderMutationOptions = Apollo.BaseMutationOptions<TakeOrderMutation, TakeOrderMutationVariables>;
export const UpdateRestaurantDocument = gql`
    mutation updateRestaurant($input: UpdateRestaurantInput!) {
  updateRestaurant(input: $input) {
    success
    message
  }
}
    `;
export type UpdateRestaurantMutationFn = Apollo.MutationFunction<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;

/**
 * __useUpdateRestaurantMutation__
 *
 * To run a mutation, you first call `useUpdateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRestaurantMutation, { data, loading, error }] = useUpdateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>(UpdateRestaurantDocument, options);
      }
export type UpdateRestaurantMutationHookResult = ReturnType<typeof useUpdateRestaurantMutation>;
export type UpdateRestaurantMutationResult = Apollo.MutationResult<UpdateRestaurantMutation>;
export type UpdateRestaurantMutationOptions = Apollo.BaseMutationOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    success
    message
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const CategoriesDocument = gql`
    query categories {
  allCategories {
    categories {
      slug
      name
      restaurantCount
      id
      image
    }
    success
    message
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const GetCategoryDocument = gql`
    query getCategory($input: CategoryInput!) {
  category(input: $input) {
    category {
      slug
      name
      id
      restaurantCount
      restaurants {
        ...Restaurant
      }
    }
    success
    message
    totalPages
  }
}
    ${RestaurantFragmentDoc}`;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetOrderDocument = gql`
    query getOrder($input: GetOrderInput!) {
  getOrder(input: $input) {
    success
    message
    order {
      ...FullOrderParts
    }
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    role
    verified
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyRestaurantDocument = gql`
    query myRestaurant($input: MyRestaurantInput!) {
  myRestaurant(input: $input) {
    restaurant {
      ...Restaurant
    }
    success
    message
  }
}
    ${RestaurantFragmentDoc}`;

/**
 * __useMyRestaurantQuery__
 *
 * To run a query within a React component, call `useMyRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyRestaurantQuery(baseOptions: Apollo.QueryHookOptions<MyRestaurantQuery, MyRestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(MyRestaurantDocument, options);
      }
export function useMyRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRestaurantQuery, MyRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(MyRestaurantDocument, options);
        }
export type MyRestaurantQueryHookResult = ReturnType<typeof useMyRestaurantQuery>;
export type MyRestaurantLazyQueryHookResult = ReturnType<typeof useMyRestaurantLazyQuery>;
export type MyRestaurantQueryResult = Apollo.QueryResult<MyRestaurantQuery, MyRestaurantQueryVariables>;
export const MyRestaurantsDocument = gql`
    query myRestaurants {
  myRestaurants {
    success
    message
    restaurants {
      image
      name
      id
      category {
        name
      }
    }
  }
}
    `;

/**
 * __useMyRestaurantsQuery__
 *
 * To run a query within a React component, call `useMyRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
      }
export function useMyRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
        }
export type MyRestaurantsQueryHookResult = ReturnType<typeof useMyRestaurantsQuery>;
export type MyRestaurantsLazyQueryHookResult = ReturnType<typeof useMyRestaurantsLazyQuery>;
export type MyRestaurantsQueryResult = Apollo.QueryResult<MyRestaurantsQuery, MyRestaurantsQueryVariables>;
export const RestaurantDocument = gql`
    query restaurant($input: RestaurantInput!) {
  restaurant(input: $input) {
    success
    message
    restaurant {
      image
      name
      id
    }
  }
}
    ${RestaurantFragmentDoc}`;

/**
 * __useRestaurantQuery__
 *
 * To run a query within a React component, call `useRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestaurantQuery(baseOptions: Apollo.QueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
      }
export function useRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export type RestaurantQueryHookResult = ReturnType<typeof useRestaurantQuery>;
export type RestaurantLazyQueryHookResult = ReturnType<typeof useRestaurantLazyQuery>;
export type RestaurantQueryResult = Apollo.QueryResult<RestaurantQuery, RestaurantQueryVariables>;
export const AllRestaurantsDocument = gql`
    query allRestaurants($input: RestaurantsInput!) {
  allRestaurants(input: $input) {
    results {
      ...Restaurant
    }
    success
    message
    totalPages
    totalResults
  }
}
    ${RestaurantFragmentDoc}`;

/**
 * __useAllRestaurantsQuery__
 *
 * To run a query within a React component, call `useAllRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllRestaurantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAllRestaurantsQuery(baseOptions: Apollo.QueryHookOptions<AllRestaurantsQuery, AllRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllRestaurantsQuery, AllRestaurantsQueryVariables>(AllRestaurantsDocument, options);
      }
export function useAllRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllRestaurantsQuery, AllRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllRestaurantsQuery, AllRestaurantsQueryVariables>(AllRestaurantsDocument, options);
        }
export type AllRestaurantsQueryHookResult = ReturnType<typeof useAllRestaurantsQuery>;
export type AllRestaurantsLazyQueryHookResult = ReturnType<typeof useAllRestaurantsLazyQuery>;
export type AllRestaurantsQueryResult = Apollo.QueryResult<AllRestaurantsQuery, AllRestaurantsQueryVariables>;
export const SearchRestaurantsDocument = gql`
    query searchRestaurants($input: SearchRestaurantInput!) {
  searchRestaurants(input: $input) {
    message
    success
    restaurants {
      name
      id
      image
    }
    totalPages
    totalResults
  }
}
    `;

/**
 * __useSearchRestaurantsQuery__
 *
 * To run a query within a React component, call `useSearchRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRestaurantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchRestaurantsQuery(baseOptions: Apollo.QueryHookOptions<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>(SearchRestaurantsDocument, options);
      }
export function useSearchRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>(SearchRestaurantsDocument, options);
        }
export type SearchRestaurantsQueryHookResult = ReturnType<typeof useSearchRestaurantsQuery>;
export type SearchRestaurantsLazyQueryHookResult = ReturnType<typeof useSearchRestaurantsLazyQuery>;
export type SearchRestaurantsQueryResult = Apollo.QueryResult<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>;
export const CookedOrdersDocument = gql`
    subscription cookedOrders {
  cookedOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useCookedOrdersSubscription__
 *
 * To run a query within a React component, call `useCookedOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCookedOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCookedOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCookedOrdersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>(CookedOrdersDocument, options);
      }
export type CookedOrdersSubscriptionHookResult = ReturnType<typeof useCookedOrdersSubscription>;
export type CookedOrdersSubscriptionResult = Apollo.SubscriptionResult<CookedOrdersSubscription>;
export const OrderUpdatesDocument = gql`
    subscription orderUpdates($input: UpdateOrderInput!) {
  orderUpdates(input: $input) {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useOrderUpdatesSubscription__
 *
 * To run a query within a React component, call `useOrderUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderUpdatesSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>(OrderUpdatesDocument, options);
      }
export type OrderUpdatesSubscriptionHookResult = ReturnType<typeof useOrderUpdatesSubscription>;
export type OrderUpdatesSubscriptionResult = Apollo.SubscriptionResult<OrderUpdatesSubscription>;