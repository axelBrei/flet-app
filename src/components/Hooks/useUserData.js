import {useSelector} from 'react-redux';
import {
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

  return {
    id,
    name,
    lastName,
    email,
    picture,
  };
};
