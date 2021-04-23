import {useSelector} from 'react-redux';
import {
  selectIsDriver,
  selectUserEmail,
  selectUserId,
  selectUserLastName,
  selectUserName,
  selectUserPassword,
  selectUserPhoto,
  selectUserToken,
} from 'redux-store/slices/loginSlice';

export const useUserData = () => {
  const id = useSelector(selectUserId);
  const userToken = useSelector(selectUserToken);
  const name = useSelector(selectUserName);
  const lastName = useSelector(selectUserLastName);
  const email = useSelector(selectUserEmail);
  const picture = useSelector(selectUserPhoto);
  const isDriver = useSelector(selectIsDriver);
  const password = useSelector(selectUserPassword);
  const courrier = useSelector(state => state.login.userData?.courrier);

  return {
    id,
    userToken,
    name,
    lastName,
    email,
    picture,
    isDriver,
    courrier,
    password,
  };
};
