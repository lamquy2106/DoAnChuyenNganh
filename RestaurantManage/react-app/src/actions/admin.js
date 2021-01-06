import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formateData = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
});

export const fetchAll = () => (dispatch) => {
  api
    .admin()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const create = (data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .admin()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const update = (Id, data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .admin()
    .update(Id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { Id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const Delete = (Id, onSuccess) => (dispatch) => {
  api
    .admin()
    .delete(Id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: Id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
