import store from "../store";


/*
The first action creator fetch_post is responsible for starting the fetch request.
*/
export const fetch_post = () => {
  return {
    type: "FETCH_USER"
  };
};

/*
The second action creator receive_post will be called when we get back the data from github
*/

export const receive_post = post => {
  return {
    type: "FETCHED_USER",
    data: post
  };
};


/*
receive_error is an action creator that will be called only,
when we have an error in getting our data back from github's servers.
*/
export const receive_error = () => {
  return {
    type: "RECEIVE_ERROR"
  };
};

export const thunk_action_creator = username => {
    const user = username.replace(/\s/g, "");
    store.dispatch(fetch_post());
    return function(dispatch,getState)
    {
       return fetch(`https://api.github.com/users/${user}`) 
       .then(data=>data.json())
       .then(data=>{
           if(data.message==='Not Found ')
           {
               throw new Error('No Such User Found !');
           }
           else dispatch(receive_post(data));
       }) 
       .catch(err=>dispatch(receive_error()))   
    };
};
