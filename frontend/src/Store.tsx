import { ReactNode, createContext, useReducer, useContext } from 'react';
import ProductType from './types/ProductType';
import ActionEnum from './enums/Action';

// Define types and interfaces
interface CartItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  shippingAddress: any;
  paymentMethod?: string;
}

interface UserState {
  name: string;
  email: string;
  token?: string;
}

interface AppState {
  cart: CartState;
  userInfo: UserState | null;
}

interface Action {
  type: ActionEnum;
  payload?: any;
}

// Create the context
interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const Store = createContext<StoreContextType | undefined>(undefined);

const initialState: AppState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.stringify(localStorage.getItem('paymentMethod'))
      : '',
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActionEnum.CART_ADD_ITEM: {
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: ProductType) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: ProductType) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ActionEnum.CART_REMOVE_ITEM: {
      const itemToBeRemoved = action.payload;

      const cartItems = state.cart.cartItems.filter(
        (item: ProductType) => item._id !== itemToBeRemoved._id
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ActionEnum.CART_CLEAR: {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }
    case ActionEnum.USER_SIGN_IN: {
      return { ...state, userInfo: action.payload };
    }
    case ActionEnum.USER_SIGN_OUT: {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    }
    case ActionEnum.SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }
    case ActionEnum.SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

// Create the StoreProvider component
interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

// Create a custom hook to access the context
export function useStore() {
  const context = useContext(Store);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
