export interface Category {
  _id: string;
  title: string;
  description: string | null;
}

export interface Product {
  _id: string;
  category: {
    _id: string;
    title: string;
  };
  title: string;
  description: string;
  price: number;
  image: string | null;
}

export interface ProductMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
