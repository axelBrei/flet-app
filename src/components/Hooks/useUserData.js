import {useSelector} from 'react-redux';
import {
  selectIsDriver,
  selectUserEmail,
  selectUserId,
  selectUserLastName,
  selectUserName,
  selectUserPhoto,
} from 'redux-store/slices/loginSlice';

export const useUserData = () => {
  const id = useSelector(selectUserId);
  const name = useSelector(selectUserName);
  const lastName = useSelector(selectUserLastName);
  const email = useSelector(selectUserEmail);
  const picture = useSelector(selectUserPhoto);
  const isDriver = useSelector(selectIsDriver);
  const courrier = useSelector((state) => state.login.userData?.courrier);

  return {
    id,
    name,
    lastName,
    email,
    picture,
    isDriver,
    courrier,
  };
};
