export const initialState = {
    cart: [],
    filters: {
      min: null,
      max: null,
      name: null
    },
    loading: true,
    error: '',
    postsList: [ 
      {
        "name": "Anna"
      }
    ]
};
  
export const filterPosts = (state, action) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          loading: false,
          postsList: action.payload,
          error: ''
        };
      case "FETCH_ERROR":
        return {
          loading: false,
          postsList: action.payload,
          error: 'Ops, algo deu errado...'
        };
      default:
        return state;
    }
  };
  